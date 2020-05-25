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
} from "semantic-ui-react";

import Filtre from "../filtre/filtre";

import Annonce from "../annonce/annonce";

import { Link } from "react-router-dom";

import { AMOUNT_OF_CARS_PER_LOAD } from "../../../config";

const getWidth = () => {
  const isSSR = typeof window === "undefined";
  return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth;
};

class AnnoncesDesktop extends Component {
  state = {
    annonces: [],
    limit: AMOUNT_OF_CARS_PER_LOAD,
  };

  componentWillMount() {
    axios.post(`/api/getAnnonces?order=desc`).then((response) => {
      this.setState({
        annonces: response.data,
      });
    });
  }

  setFiltre = (request) => {
    if (request.$and.length > 0) {
      axios.post(`/api/getAnnonces?order=desc`, request).then((response) => {
        if (response.data.length < AMOUNT_OF_CARS_PER_LOAD)
          this.setState({ annonces: response.data, limit: response.data.length });
        else
          this.setState({
            annonces: response.data,
            limit: AMOUNT_OF_CARS_PER_LOAD,
          });
      });
    }
    else {
      axios.post(`/api/getAnnonces?order=desc`).then((response) => {
        this.setState({
          limit: AMOUNT_OF_CARS_PER_LOAD,
          annonces: response.data,
        });
      });
    }
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
    else {
      return (
        <Segment>
          <Header textAlign="center" as='h1' icon>
            <Icon name='remove circle' />
              Désolé... :(
            <Header.Subheader>
              Ces caracteristiques ne correspondent à aucune de nos voitures
            </Header.Subheader>
          </Header>
        </Segment>
      )
    }
  };

  render() {
    return (
      <Responsive getWidth={getWidth} minWidth={Responsive.onlyTablet.minWidth}>
        <MenuContainer active="annonces">
          <Grid>
            <Grid.Column width={5}>
              <Segment>
                <Header as="h1">Filtre</Header>
                <Filtre setFiltre={this.setFiltre} />
              </Segment>
            </Grid.Column>
            <Grid.Column width={11}>{this.renderAnnonces()}</Grid.Column>

            {this.state.annonces.length > 0 ?
              <Button
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
              : null}
          </Grid>
        </MenuContainer>

        <Footer />
      </Responsive>
    );
  }
}

export default AnnoncesDesktop;
