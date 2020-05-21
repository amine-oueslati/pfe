import React, { Component } from "react";
import {
  Container,
  Header,
  Button,
  Icon,
  Responsive,
  Label,
  Modal,
  Dropdown,
  Message,
} from "semantic-ui-react";

import axios from "axios";

class SuppMarque extends Component {
  state = {
    marqueEmpty: false,
    marqueDeleted: false,
    marqueSelected: "",
    modelesSelected: [],
  };

  componentDidMount() {
    axios.get("/api/getMarques").then((response) => {
      this.setState({ marques: response.data });
    });
  }

  handleMarquesDropdownChange = (event, data) => {
    let aux = this.state.marques.find((marque) => marque.brand === data.value);
    this.setState({
      marqueEmpty: false,
      marqueDeleted: false,
      marqueDeleted: false,
      marqueSelected: data.value,
      marqueSelectedData: aux,
    });
  };

  handleModeleDropdownChange = (event, data) => {
    this.setState({
      modeleEmpty: false,
      marqueDeleted: false,
      marqueDeleted: false,
      modelesSelected: data.value,
    });
  };

  supprimerMarque = () => {
    if (this.state.marqueSelected === "") {
      this.setState({ marqueEmpty: true });
    } else {
      if (this.state.modelesSelected.length === 0) {
        axios
          .delete("/api/deleteMarque", {
            data: {
              id: this.state.marqueSelectedData._id,
            },
          })
          .then((res) => {
            if (res.status === 200) {
              this.setState({ marqueDeleted: true });
              axios.get("/api/getMarques").then((response) => {
                this.setState({ marques: response.data });
              });
            }
          });
      } else {
        axios
          .post("/api/suppModele", {
            id: this.state.marqueSelectedData._id,
            models: this.state.modelesSelected,
          })
          .then((res) => {
            if (res.status === 200) {
              this.setState({ marqueDeleted: true });
              axios.get("/api/getMarques").then((response) => {
                this.setState({ marques: response.data });
              });
            }
          });
      }
    }
  };

  render() {

    let marquesOptions = [];
    if (this.state.marques) {
      this.state.marques.map((item) => {
        marquesOptions.push({
          key: item._id,
          text: item.brand,
          value: item.brand,
        });
      });
    }

    let modelsOptions = [];
    if (this.state.marqueSelected !== undefined) {
      if (this.state.marqueSelectedData !== undefined) {
        this.state.marqueSelectedData.models.map((model) => {
          modelsOptions.push({
            key: model,
            text: model,
            value: model,
          });
        });
      }
    }

    return (
      <Container>
        <Header as="h2">Supprimer une marque ou un modèle</Header>
        <Container style={{ marginTop: "2em" }}>
          <Header as="h3">Marque</Header>
          <Dropdown
            text={this.state.marqueSelected}
            noResultsMessage="aucun résultat"
            placeholder="Marque"
            fluid
            search
            selection
            options={marquesOptions}
            onChange={this.handleMarquesDropdownChange}
          />
        </Container>

        {this.state.marqueEmpty ? (
          <Label as="a" basic color="red" pointing>Ce champ est obligatoire </Label>
        ) : null}

        <Label
          as="a"
          style={{ marginTop: "2em" }}
          color="orange"
          ribbon="right"
        >
          Si vous voulez supprimer toute la marque, laisser le champs des
          modèles vide.
        </Label>

        <Container>
          <h3>Modèle</h3>
          <Dropdown
            clearable
            placeholder="Modèle"
            noResultsMessage="aucun résultat"
            fluid
            search
            multiple
            selection
            options={modelsOptions}
            onChange={this.handleModeleDropdownChange}
          />
        </Container>

        <Modal
          closeIcon
          dimmer="blurring"
          size="small"
          trigger={
            <div>
              <Responsive {...Responsive.onlyMobile}>
                <Button
                  negative
                  fluid
                  style={{ marginBottom: "1em", marginTop: "1em" }}
                >
                  Supprimer
                </Button>
              </Responsive>

              <Responsive minWidth={Responsive.onlyTablet.minWidth}>
                <Button
                  animated
                  floated="right"
                  style={{ margin: "2em" }}
                  negative
                  animated="vertical"
                >
                  <Button.Content hidden>
                    <Icon name="trash alternate" />
                  </Button.Content>
                  <Button.Content visible>Supprimer</Button.Content>
                </Button>
              </Responsive>
            </div>
          }
          header="attention!"
          content="etes vous sur de vouloir supprimer cette marque."
          actions={[
            { content: "Oui, supprimer cette marque", positive: true, key: 1 },
          ]}
          onActionClick={() => {
            this.supprimerMarque();
          }}
        />
        {this.state.marqueDeleted ? (
          <Message positive>
            <Message.Header>Opération effectuée avec succés</Message.Header>
            <p>Suppression Réussie</p>
          </Message>
        ) : null}
      </Container>
    );
  }
}

export default SuppMarque;
