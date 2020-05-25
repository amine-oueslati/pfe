import React, { Component } from "react";

import MenuContainer from "../../HOC/menuContainer";
import Footer from "../../HOC/footer";

import {
  Grid,
  Segment,
  Container,
  Image,
  Header,
  Icon,
  Button,
  Divider,
} from "semantic-ui-react";

import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import LocalGasStationIcon from "@material-ui/icons/LocalGasStation";
import SettingsIcon from "@material-ui/icons/Settings";
import EventIcon from "@material-ui/icons/Event";

import axios from "axios";

class Comparateur extends Component {
  state = {
    annonces: [],
  };

  componentWillMount = () => {
    let limit = 0;
    if (this.props.screen === "desktop") {
      limit = 5
    }
    else if (this.props.screen === "mobile") {
      limit = 3
    }

    for (let i = 1; i < limit; i++) {
      if (localStorage.getItem(`annonce${i}`)) {
        axios
          .get(`/api/getAnnonce?id=${localStorage.getItem(`annonce${i}`)}`)
          .then((response) => {
            this.setState({
              annonces: [response.data, ...this.state.annonces],
            });
          });
      }
    }
  };

  renderTitres = () => {
    let temp = null;
    temp = this.state.annonces.map((annonce) => (
      <Grid.Column key={annonce._id}>
        <Segment inverted>
          <Container fluid>
            <Header as="h3" textAlign="center" style={{ color: "#eee" }}>
              {annonce.titre}
            </Header>
          </Container>
        </Segment>
      </Grid.Column>
    ));
    return temp;
  };

  renderImages = () => {
    let temp = null;
    temp = this.state.annonces.map((annonce) => (
      <Grid.Column key={annonce._id}>
        <Image
          verticalAlign="middle"
          rounded
          fluid
          centered
          src={annonce.images[0]}
        />
      </Grid.Column>
    ));
    return temp;
  };

  renderMarques = () => {
    let temp = null;
    temp = this.state.annonces.map((annonce) => (
      <Grid.Column key={annonce._id}>
        <Header as="h4" block textAlign="center">
          {annonce.marque} - {annonce.modele}
        </Header>
      </Grid.Column>
    ));
    return temp;
  };

  renderCaracteristiques = () => {
    let temp = null;
    temp = this.state.annonces.map((annonce) => (
      <Grid.Column key={annonce._id}>
        <Segment.Group raised>
          <Segment>
            <Grid>
              <Grid.Row>
                <Grid.Column width={2}>
                  <MonetizationOnIcon />
                </Grid.Column>
                <Grid.Column width={12}>Prix : {annonce.prix}</Grid.Column>
              </Grid.Row>
            </Grid>
          </Segment>
          <Segment>
            <Grid>
              <Grid.Row>
                <Grid.Column width={2}>
                  <EventIcon />
                </Grid.Column>
                <Grid.Column width={12}>Année : {annonce.annee}</Grid.Column>
              </Grid.Row>
            </Grid>
          </Segment>
          <Segment>
            <Grid>
              <Grid.Row>
                <Grid.Column width={2}>
                  <Icon name="chess knight" />
                </Grid.Column>
                <Grid.Column width={12}>
                  Puissance : {annonce.puissance}
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Segment>
          <Segment>
            <Grid>
              <Grid.Row>
                <Grid.Column width={2}>
                  <LocalGasStationIcon />
                </Grid.Column>
                <Grid.Column width={12}>
                  Energie : {annonce.energie}
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Segment>
          <Segment>
            <Grid>
              <Grid.Row>
                <Grid.Column width={2}>
                  <SettingsIcon />
                </Grid.Column>
                <Grid.Column width={12}>Boite : {annonce.boite}</Grid.Column>
              </Grid.Row>
            </Grid>
          </Segment>
          <Segment>
            <Grid>
              <Grid.Row>
                <Grid.Column width={2}>
                  <Icon name="road" />
                </Grid.Column>
                <Grid.Column width={12}>
                  Kilomètrage : {annonce.kms}
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Segment>
        </Segment.Group>
      </Grid.Column>
    ));
    return temp;
  };

  suppAnnonce = (id) => {
    for (let i = 1; i < 5; i++) {
      if (localStorage.getItem(`annonce${i}`) === id) {
        localStorage.removeItem(`annonce${i}`);
        this.setState({ annonces: [] });
        for (let i = 1; i < 5; i++) {
          if (localStorage.getItem(`annonce${i}`)) {
            axios
              .get(`/api/getAnnonce?id=${localStorage.getItem(`annonce${i}`)}`)
              .then((response) => {
                this.setState({
                  annonces: [response.data, ...this.state.annonces],
                });
              });
          }
        }
      }
    }
  };

  renderSuppButtons = () => {
    let temp = null;
    temp = this.state.annonces.map((annonce) => (
      <Grid.Column key={annonce._id}>
        <Button
          negative
          fluid
          animated="fade"
          onClick={() => {
            this.suppAnnonce(annonce._id);
          }}
        >
          <Button.Content visible>Supprimer du comparateur</Button.Content>
          <Button.Content hidden>
            <Icon name="trash alternate" />
          </Button.Content>
        </Button>
      </Grid.Column>
    ));
    return temp;
  };

  clearComparateur = () => {
    localStorage.clear();
    this.setState({ annonces: [] });
  };

  render() {
    return (
      <div>
        <MenuContainer active="comparateur">
          {this.state.annonces.length === 0 ? (
            <Segment>
              <Header style={{ padding: "4em" }}
                as="h1"
                block
                textAlign="center" icon>
                <Icon name="balance scale" />
                Le comparateur est vide
                <Header.Subheader>
                  Il faut jouter des annonces au comparateur
                </Header.Subheader>
              </Header>

            </Segment>
          ) : (
              <Segment>
                <Grid columns={this.state.annonces.length} divided>
                  <Grid.Row>{this.renderTitres()}</Grid.Row>
                  <Grid.Row>{this.renderImages()}</Grid.Row>
                  <Grid.Row>{this.renderMarques()}</Grid.Row>
                  <Grid.Row>{this.renderCaracteristiques()}</Grid.Row>
                  <Grid.Row>{this.renderSuppButtons()}</Grid.Row>
                </Grid>
                <Divider horizontal style={{ margin: "2em" }}>
                  Ou Bien
              </Divider>
                <Button
                  color="green"
                  fluid
                  style={{ marginTop: "1em" }}
                  animated="vertical"
                  onClick={this.clearComparateur}
                >
                  <Button.Content visible>Vider le comparateur</Button.Content>
                  <Button.Content hidden>
                    <Icon name="delete" />
                  </Button.Content>
                </Button>
              </Segment>
            )}
        </MenuContainer>
        <Footer />
      </div>
    );
  }
}

export default Comparateur;
