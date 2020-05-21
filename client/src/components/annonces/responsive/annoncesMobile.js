import React, { Component } from "react";

import MenuContainer from "../../../HOC/menuContainer";
import Footer from "../../../HOC/footer";
import axios from "axios";

import {
  Grid,
  Popup,
  Header,
  Segment,
  Icon,
  Button,
  Responsive,
  Accordion,
  Transition,
} from "semantic-ui-react";

import Filtre from "../filtre/filtre";

import Annonce from "../annonce/annonce";

import { Link } from "react-router-dom";

import { AMOUNT_OF_CARS_PER_LOAD } from "../../../config";

const getWidth = () => {
  const isSSR = typeof window === "undefined";
  return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth;
};

class AnnoncesMobile extends Component {
  state = {
    annonces: [],
    limit: AMOUNT_OF_CARS_PER_LOAD,
    activeIndex: 1,
  };

  componentWillMount() {
    axios.post(`/api/getAnnonces?order=desc`).then((response) => {
      this.setState({
        annonces: response.data,
      });
    });
  }

  setFiltre = (request) => {
    axios.post(`/api/getAnnonces?order=desc`, request).then((response) => {
      if (response.data.length < AMOUNT_OF_CARS_PER_LOAD)
        this.setState({ annonces: response.data, limit: response.data.length });
      else
        this.setState({
          annonces: response.data,
          limit: AMOUNT_OF_CARS_PER_LOAD,
        });
    });
  };

  loadMoreOnClick = () => {
    if (
      this.state.annonces.length >=
      this.state.limit + AMOUNT_OF_CARS_PER_LOAD
    )
      this.setState({ limit: this.state.limit + AMOUNT_OF_CARS_PER_LOAD });
    else this.setState({ limit: this.state.annonces.length });
  };

  renderAnnonces = () => {
    let temp = [];

    if (this.state.annonces.length !== 0) {
      let boundary =
        this.state.annonces.length < this.state.limit
          ? this.state.annonces.length
          : this.state.limit;
      for (let i = 0; i < boundary; i++) {
        temp.push(
          <Popup
            key={this.state.annonces[i]._id}
            inverted
            position="left center"
            content="cliquer sur l'annonce pour l'ouvrir dans un autre onglet "
            trigger={
              <Segment color="violet">
                <Link to={`/annonce/${this.state.annonces[i]._id}`}>
                  <Annonce
                    marque={this.state.annonces[i].marque}
                    modele={this.state.annonces[i].modele}
                    titre={this.state.annonces[i].titre}
                    prix={this.state.annonces[i].prix}
                    image={this.state.annonces[i].images[0]}
                    annee={this.state.annonces[i].annee}
                    puissance={this.state.annonces[i].puissance}
                    energie={this.state.annonces[i].energie}
                    boite={this.state.annonces[i].boite}
                    kms={this.state.annonces[i].kms}
                    description={this.state.annonces[i].description}
                  />
                </Link>
              </Segment>
            }
          />
        );
      }
      return temp;
    }
  };

  handleAccordionClick = (e, titleProps) => {
    const { index } = titleProps;
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;

    this.setState({ activeIndex: newIndex });
  };

  render() {
    return (
      <Responsive getWidth={getWidth} maxWidth={Responsive.onlyMobile.maxWidth}>
        <MenuContainer active="annonces">
          <Accordion fluid styled>
            <Accordion.Title
              active={this.state.activeIndex === 0}
              index={0}
              onClick={this.handleAccordionClick}
            >
              <Header as="h1" textAlign="center">
                Filtre
              </Header>
            </Accordion.Title>
            <Transition
              visible={this.state.activeIndex === 0}
              animation="scale"
              duration={500}
            >
              <Accordion.Content active={this.state.activeIndex === 0}>
                <Filtre setFiltre={this.setFiltre} />
              </Accordion.Content>
            </Transition>
          </Accordion>
          {this.renderAnnonces()}
          <Button
            style={{
              marginBottom: "1em",
            }}
            size="big"
            animated="fade"
            color="blue"
            fluid
            onClick={this.loadMoreOnClick}
          >
            <Button.Content visible>Afficher plus </Button.Content>
            <Button.Content hidden>
              <Icon name="sort amount down" />
            </Button.Content>
          </Button>
        </MenuContainer>

        <Footer />
      </Responsive>
    );
  }
}

export default AnnoncesMobile;
