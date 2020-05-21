import React, { Component } from "react";
import {
  Dropdown,
  Container,
  Header,
  Button,
  Icon,
  Message,
  Responsive,
} from "semantic-ui-react";
import axios from "axios";
class AjoutMarque extends Component {
  state = { marqueSelected: "" };

  componentDidMount() {
    axios.get("/api/getMarques").then((response) => {
      this.setState({ marques: response.data });
    });
  }

  handleMarquesDropdownChange = (event, data) => {
    this.setState({
      marqueEmpty: false,
      formNotValid: false,
      dataSubmitted: false,
      marqueSelected: data.value,
    });

    let aux = this.state.marques.find((marque) => marque.brand === data.value);

    this.setState({ marqueSelectedData: aux });
  };

  handleModeleDropdownChange = (event, data) => {
    this.setState({
      modeleEmpty: false,
      formNotValid: false,
      dataSubmitted: false,
      modeleSelected: data.value,
    });
  };

  sendMarque = () => {
    if (!this.state.marqueSelected) {
      this.setState({ marqueEmpty: true });
    }

    if (!this.state.modeleSelected) {
      this.setState({ modeleEmpty: true });
    }

    if (!this.state.modeleSelected || !this.state.marqueSelected) {
      this.setState({ formNotValid: true });
    } else {
      let dataToSubmit;

      if (this.state.marqueSelectedData) {
        dataToSubmit = {
          _id: this.state.marqueSelectedData._id,
          model: this.state.modeleSelected,
        };

        axios
          .post("/api/marqueUpdate", { ...dataToSubmit })
          .then((response) => {
            if (response.status === 200){
              this.setState({ dataSubmitted: true });
              axios.get("/api/getMarques").then((response) => {
                this.setState({ marques: response.data });
              });
            } 
            else this.setState({ dataSubmitted: false });
          });
      } else {
        dataToSubmit = {
          brand: this.state.marqueSelected,
          models: this.state.modeleSelected,
        };

        axios.post("/api/marques", { ...dataToSubmit }).then((response) => {
          if (response.status === 200){
            this.setState({ dataSubmitted: true });
            axios.get("/api/getMarques").then((response) => {
              this.setState({ marques: response.data });
            });
          } 
          else this.setState({ dataSubmitted: false });
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
      <div>
        <Header as="h2">Ajouter une marque ou un modèle</Header>

        <Container style={{ marginTop: "2em" }}>
          <h3>Marque</h3>
          <Dropdown
            error={this.state.marqueEmpty}
            clearable
            text={this.state.marqueSelected}
            noResultsMessage="aucun résultat"
            placeholder="Marque"
            fluid
            search
            allowAdditions
            additionLabel="ajouter"
            additionPosition="bottom"
            selection
            options={marquesOptions}
            onChange={this.handleMarquesDropdownChange}
          />
        </Container>

        <Container style={{ marginTop: "2em" }}>
          <h3>Modèle</h3>
          <Dropdown
            value={this.state.marqueSelected}
            clearable
            error={this.state.modeleEmpty}
            placeholder="Modèle"
            noResultsMessage="aucun résultat"
            text={this.state.modeleSelected}
            fluid
            search
            allowAdditions
            selection
            options={modelsOptions}
            onChange={this.handleModeleDropdownChange}
          />
        </Container>

          <Responsive {...Responsive.onlyMobile}>
            <Button
              onClick={this.sendMarque}
              positive
              fluid
              style={{ marginBottom: "1em", marginTop: "1em" }}
            >
              Ajouter
            </Button>
          </Responsive>
          <Responsive minWidth={Responsive.onlyTablet.minWidth}>
            <Button
              onClick={this.sendMarque}
              positive
              animated
              floated="right"
              style={{ margin: "2em" }}
            >
              <Button.Content visible>Ajouter</Button.Content>
              <Button.Content hidden>
                <Icon name="arrow right" />
              </Button.Content>
            </Button>
          </Responsive>

        {this.state.dataSubmitted ? (
          <Message positive>
            <Message.Header>Changement effectué </Message.Header>
            <p>Vous pouvez maintenant ajouter une annonce avec ce modèle.</p>
          </Message>
        ) : null}

        {this.state.formNotValid ? (
          <Message negative>
            <Message.Header>
              Veuillez vérifier les informations saisies
            </Message.Header>
            <p>Une ou plusieurs informations sont manquantes</p>
          </Message>
        ) : null}
      </div>
    );
  }
}

export default AjoutMarque;
