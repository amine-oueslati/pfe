import React, { Component } from "react";

import SliderPrix from "./sliderPrix/sliderPrix";
import Marque from "./marque/marque";
import Carrosserie from "./carrosserie/carrosserie.js";
import Energie from "./energie/energie";
import Boite from "./boite/boite";
import Annee from "./annee/annee";
import Kms from "./kms/kms";
import Modele from "./modele/modele";

import { KMS, PRIX } from "../../../config";

import { Container, Button, Responsive } from "semantic-ui-react";

class Filtre extends Component {
  state = {
    marquesSelected: [],
    modelesSelected: [],
    prix: "",
    kms: "",
    annee: "",
    carrosserie: "",
    boite: "",
  };

  changeMarque = (data) => {
    this.setState({ marquesSelected: data });
  };
  changeModele = (data) => {
    this.setState({ modelesSelected: data });
  };
  changePrix = (data) => {
    this.setState({ prix: data });
  };
  changeKms = (data) => {
    this.setState({ kms: data });
  };
  changeAnnee = (data) => {
    this.setState({ annee: data });
  };
  changeCarrosserie = (data) => {
    this.setState({ carrosserie: data });
  };
  changeEnergie = (data) => {
    this.setState({ energie: data });
  };
  changeBoite = (data) => {
    this.setState({ boite: data });
  };

  setrequest = () => {
    let req = { $and: [] };

    // Filtre marque
    if (this.state.marquesSelected.length !== 0) {
      let marqueFiltre = [];
      this.state.marquesSelected.map((marque) => {
        marqueFiltre.push({ marque: marque.brand });
      });
      req.$and.push({ $or: marqueFiltre });
    }

    // Filtre modele
    if (this.state.modelesSelected.length !== 0) {
      let modeleFiltre = [];
      this.state.modelesSelected.map((modele) => {
        modeleFiltre.push({ modele });
      });
      req.$and.push({ $or: modeleFiltre });
    }

    // Filtre carrosserie
    if (this.state.carrosserie.length !== 0) {
      let carrosserieFiltre = [];
      this.state.carrosserie.map((carrosserie) => {
        carrosserieFiltre.push({ carrosserie });
      });
      req.$and.push({ $or: carrosserieFiltre });
    }

    // Filtre Kms
    if (
      this.state.kms !== "" &&
      this.state.kms !== KMS.MIN.toString() + "," + KMS.MAX.toString()
    ) {
      let min = this.state.kms.slice(0, this.state.kms.indexOf(","));
      let max = this.state.kms.slice(
        this.state.kms.indexOf(",") + 1,
        this.state.kms.length
      );

      req.$and.push({ kms: { $gte: min } });
      req.$and.push({ kms: { $lte: max } });
    }

    // Filtre Prix
    if (
      this.state.prix !== "" &&
      this.state.prix !== PRIX.MIN.toString() + "," + PRIX.MAX.toString()
    ) {
      let min = this.state.prix.slice(0, this.state.prix.indexOf(","));
      let max = this.state.prix.slice(
        this.state.prix.indexOf(",") + 1,
        this.state.prix.length
      );

      req.$and.push({ prix: { $gte: min } });
      req.$and.push({ prix: { $lte: max } });
    }

    // Filtre Annee
    if (this.state.annee !== "" && this.state.annee !== "indifferent") {
      console.log(parseInt(this.state.annee));
      req.$and.push({ annee: { $gte: parseInt(this.state.annee) } });
    }

    // Filtre Boite
    if (this.state.boite !== "" && this.state.boite !== "indifferent") {
      req.$and.push({ boite: this.state.boite });
    }

    // Filtre energie
    if (this.state.energie !== undefined && this.state.energie.length !== 0) {
      let energieFiltre = [];
      this.state.energie.map((energie) => {
        energieFiltre.push({ energie });
      });
      req.$and.push({ $or: energieFiltre });
    }

    // let reaq = {

    //   puissance: 7,
    // };

    this.props.setFiltre(req);

  };

  render() {
    return (
      <Container>
        <Responsive {...Responsive.onlyMobile}>
          <Button
            color="green"
            fluid
            circular
            animated="fade"
            onClick={this.setrequest}
          >
            Lancer la recherche !
          </Button>
        </Responsive>
        <Responsive minWidth={Responsive.onlyTablet.minWidth}>
          <Button
            color="green"
            fluid
            circular
            animated="fade"
            onClick={this.setrequest}
          >
            <Button.Content visible>Personaliser le filtre</Button.Content>
            <Button.Content hidden>et lancer la recherche !</Button.Content>
          </Button>
        </Responsive>

        <Marque changeMarque={this.changeMarque} />

        {this.state.marquesSelected.length !== 0 ? (
          <Modele
            changeModele={this.changeModele}
            marquesSelected={this.state.marquesSelected}
          />
        ) : null}

        <SliderPrix changePrix={this.changePrix} />
        <Kms changeKms={this.changeKms} />
        <Annee changeAnnee={this.changeAnnee} />
        <Carrosserie changeCarrosserie={this.changeCarrosserie} />
        <Energie changeEnergie={this.changeEnergie} />
        <Boite changeBoite={this.changeBoite} />
      </Container>
    );
  }
}

export default Filtre;
