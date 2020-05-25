import React, { Component } from "react";

import axios from "axios";

import MenuContainer from "../../../HOC/menuContainer";
import Footer from "../../../HOC/footer";

import ContactForm from "../../contact/contactForm/contactForm";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

import {
  Icon,
  Image,
  Container,
  Loader,
  Segment,
  Grid,
  Header,
  Button,
  Modal,
  Responsive,
  Divider,
} from "semantic-ui-react";

import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import EventIcon from "@material-ui/icons/Event";
import LocalGasStationIcon from "@material-ui/icons/LocalGasStation";
import SettingsIcon from "@material-ui/icons/Settings";

class AnnonceView extends Component {
  state = {
    annonce: [],
    value: 0,
    compare: "0",
    comparateurPlein: false,
  };

  componentWillMount() {
    let id = this.props.match.params.id;
    axios.get(`/api/getAnnonce?id=${id}`).then((response) => {
      this.setState({ annonce: response.data });
    });

    if (id === localStorage.getItem("annonce1"))
      this.setState({ compare: "1" });
    else if (id === localStorage.getItem("annonce2"))
      this.setState({ compare: "2" });
    else if (id === localStorage.getItem("annonce3"))
      this.setState({ compare: "3" });
    else if (id === localStorage.getItem("annonce4"))
      this.setState({ compare: "4" });

    if (
      localStorage.getItem("annonce1") &&
      localStorage.getItem("annonce2") &&
      localStorage.getItem("annonce3") &&
      localStorage.getItem("annonce4")
    )
      this.setState({ comparateurPlein: true });
  }

  renderImages = () => {
    let temp;
    if (this.state.annonce.images) {
      temp = this.state.annonce.images.map((image) => (
        <Container key={image}>
          <Image
            style={{ margin: "auto" }}
            size="large"
            rounded
            src={"/" + image}
          />
        </Container>
      ));
    }
    return temp;
  };

  ajouterComparateur = () => {
    if (localStorage.getItem("annonce1")) {
      if (localStorage.getItem("annonce2")) {
        if (localStorage.getItem("annonce3")) {
          if (localStorage.getItem("annonce4")) {
            this.setState({ comparateurPlein: true });
          } else {
            localStorage.setItem("annonce4", this.state.annonce._id);
            this.setState({ compare: "4" });
          }
        } else {
          localStorage.setItem("annonce3", this.state.annonce._id);
          this.setState({ compare: "3" });
        }
      } else {
        localStorage.setItem("annonce2", this.state.annonce._id);
        this.setState({ compare: "2" });
      }
    } else {
      localStorage.setItem("annonce1", this.state.annonce._id);
      this.setState({ compare: "1" });
    }
  };

  supprimerComparateur = () => {
    switch (this.state.compare) {
      case "1":
        localStorage.removeItem("annonce1");
        this.setState({ compare: "0" });
        break;
      case "2":
        localStorage.removeItem("annonce2");
        this.setState({ compare: "0" });
        break;
      case "3":
        localStorage.removeItem("annonce3");
        this.setState({ compare: "0" });
        break;
      case "4":
        localStorage.removeItem("annonce4");
        this.setState({ compare: "0" });
        break;
    }
  };

  render() {
    const Slidersettings = {
      className: "center",
      centerMode: true,
      infinite: true,
      slidesToShow: 1,
      dots: true,
      infinite: true,
      speed: 500,
    };

    return (
      <div>
        <MenuContainer active="annonces">
          <Container>
            <Grid>
              {/* Titre */}
              <Grid.Row>
                <Grid.Column>
                  <Segment>
                    <Header as="h1" textAlign="center">
                      {this.state.annonce.titre}
                    </Header>
                  </Segment>
                </Grid.Column>
              </Grid.Row>

              {/* Images */}
              <Grid.Row>
                <Grid.Column>
                  <Segment textAlign="center" style={{ paddingBottom: "2em" }}>
                    {this.state.annonce.images ? (
                      <Slider {...Slidersettings}>
                        {this.renderImages()}{" "}
                      </Slider>
                    ) : (
                        <Loader active inline="centered" />
                      )}
                  </Segment>
                </Grid.Column>
              </Grid.Row>

              {/* Marque */}
              <Grid.Row>
                <Grid.Column>
                  <Segment>
                    <Header textAlign="center">
                      {this.state.annonce.marque} - {this.state.annonce.modele}
                    </Header>
                  </Segment>
                </Grid.Column>
              </Grid.Row>

              {/* Description */}
              {/* mobile */}
              <Responsive {...Responsive.onlyMobile}>
                <Grid.Row>
                  <Grid.Column width={16}>
                    <Segment inverted>
                      <Grid columns={3} divided>
                        <Grid.Row>
                          <Grid.Column textAlign="center">
                            <MonetizationOnIcon />
                            <p>Prix : {this.state.annonce.prix}</p>
                          </Grid.Column>
                          <Grid.Column textAlign="center">
                            <EventIcon />
                            <p>Année : {this.state.annonce.annee}</p>
                          </Grid.Column>
                          <Grid.Column textAlign="center">
                            <Icon name="chess knight" />
                            <p>Puissance : {this.state.annonce.puissance}</p>
                          </Grid.Column>
                        </Grid.Row>

                        <Grid.Row>
                          <Grid.Column textAlign="center">
                            <LocalGasStationIcon />
                            <p>Energie : {this.state.annonce.energie}</p>
                          </Grid.Column>
                          <Grid.Column textAlign="center">
                            <SettingsIcon />
                            <p>Boite : {this.state.annonce.boite}</p>
                          </Grid.Column>
                          <Grid.Column textAlign="center">
                            <Icon name="road" />
                            <p>Kilomètrage : {this.state.annonce.kms}</p>
                          </Grid.Column>
                        </Grid.Row>
                      </Grid>
                    </Segment>
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                  <Grid.Column width={16}>
                    <Segment style={{ marginTop: "1em" }}>
                      {this.state.annonce.description ?
                        this.state.annonce.description.split("\n").map((item) => {
                          return (
                            <span key={item}>
                              {item}
                              <br />
                            </span>
                          )
                        }) : null
                      }

                    </Segment>
                  </Grid.Column>
                </Grid.Row>
              </Responsive>

              {/* desktop */}
              <Container fluid>
                <Responsive minWidth={Responsive.onlyTablet.minWidth}>
                  <Grid>
                    <Grid.Row>
                      <Grid.Column stretched width={10}>
                        <Segment>{this.state.annonce.description ?
                          this.state.annonce.description.split("\n").map((item) => {
                            return (
                              <span key={item}>
                                {item}
                                <br />
                              </span>
                            )
                          }) : null
                        }</Segment>
                      </Grid.Column>
                      <Grid.Column width={6}>
                        <Segment inverted>
                          <Grid columns={3} divided>
                            <Grid.Row>
                              <Grid.Column textAlign="center">
                                <MonetizationOnIcon />
                                <p>Prix : {this.state.annonce.prix}</p>
                              </Grid.Column>
                              <Grid.Column textAlign="center">
                                <EventIcon />
                                <p>Année : {this.state.annonce.annee}</p>
                              </Grid.Column>
                              <Grid.Column textAlign="center">
                                <Icon name="chess knight" />
                                <p>
                                  Puissance : {this.state.annonce.puissance}
                                </p>
                              </Grid.Column>
                            </Grid.Row>

                            <Grid.Row>
                              <Grid.Column textAlign="center">
                                <LocalGasStationIcon />
                                <p>Energie : {this.state.annonce.energie}</p>
                              </Grid.Column>
                              <Grid.Column textAlign="center">
                                <SettingsIcon />
                                <p>Boite : {this.state.annonce.boite}</p>
                              </Grid.Column>
                              <Grid.Column textAlign="center">
                                <Icon name="road" />
                                <p>Kilomètrage : {this.state.annonce.kms}</p>
                              </Grid.Column>
                            </Grid.Row>
                          </Grid>
                        </Segment>
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                </Responsive>
              </Container>

              <Grid.Row style={{ marginBottom: "2em" }}>
                <Grid.Column width={16}>
                  {/* Button desktop */}
                  <Responsive minWidth={Responsive.onlyTablet.minWidth}>
                    <Button.Group fluid>
                      {this.state.compare !== "0" ? (
                        <Button
                          onClick={this.supprimerComparateur}
                          color="black"
                        >
                          supprimer du au comparateur
                        </Button>
                      ) : (
                          <Button
                            disabled={this.state.comparateurPlein}
                            onClick={this.ajouterComparateur}
                            negative
                          >
                            {this.state.comparateurPlein
                              ? "Le comparateur est plein"
                              : "ajouter au comparateur"}
                          </Button>
                        )}

                      <Button.Or text="Ou" />

                      <Modal
                        trigger={
                          <Button positive>Contacter l'administrateur</Button>
                        }
                      >
                        <Modal.Header>{this.state.annonce.titre}</Modal.Header>
                        <Modal.Content>
                          <Modal.Description>
                            <Header>
                              Contacter l'administartion à propos de cette annonce
                            </Header>
                            <Container style={{ padding: "1em" }}>
                              <ContactForm
                                defaultMessage={'Bonjour, \n \n Je suis intéressé(e) par cette véhicule. Est-il toujours disponible?\n\nCordialement.'}
                                idAnnonce={this.state.annonce._id}
                              />
                            </Container>
                          </Modal.Description>
                        </Modal.Content>
                      </Modal>
                    </Button.Group>
                  </Responsive>

                  {/* Button mobile */}
                  <Responsive {...Responsive.onlyMobile}>
                    {this.state.compare !== "0" ? (
                      <Button
                        fluid
                        onClick={this.supprimerComparateur}
                        color="black"
                      >
                        supprimer du au comparateur
                      </Button>
                    ) : (
                        <Button
                          fluid
                          disabled={this.state.comparateurPlein}
                          onClick={this.ajouterComparateur}
                          negative
                        >
                          {this.state.comparateurPlein
                            ? "Le comparateur est plein"
                            : "ajouter au comparateur"}
                        </Button>
                      )}

                    <Divider horizontal>Ou</Divider>

                    <Modal
                      trigger={
                        <Button fluid positive>
                          Contacter l'administrateur
                        </Button>
                      }
                    >
                      <Modal.Header>{this.state.annonce.titre}</Modal.Header>
                      <Modal.Content>
                        <Modal.Description>
                          <Header>
                            Contacter l'administartion à propos de cette annonce
                          </Header>
                          <Container style={{ padding: "1em" }}>
                            <ContactForm
                              defaultMessage={'Bonjour, \n \n Je suis intéressé(e) par cette véhicule. Est-il toujours disponible?\n\nCordialement.'}
                              idAnnonce={this.state.annonce._id}
                            />
                          </Container>
                        </Modal.Description>
                      </Modal.Content>
                    </Modal>
                  </Responsive>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Container>
        </MenuContainer>
        <Footer />
      </div>
    );
  }
}
export default AnnonceView;
