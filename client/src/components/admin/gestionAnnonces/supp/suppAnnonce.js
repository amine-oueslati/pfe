import React, { Component } from "react";
import Annonce from "../../../annonces/annonce/annonce";

import { Segment, Modal, Responsive, Button, Icon, Input, Header, Form, Grid } from "semantic-ui-react";
import axios from "axios";
class SuppAnnonce extends Component {
  state = {
    annonces: [],
    open: false,
    idAnnonce: '',
    annonceSelected: [],
    inputEmpty: false
  };

  componentWillMount() {
    axios.post(`/api/getAnnonces?order=desc`).then((response) => {
      this.setState({
        annonces: response.data,
      });
    });
  }

  supprimerAnnonce(id) {
    axios
      .delete("/api/deleteAnnonce", {
        data: {
          id: id,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          axios.post(`/api/getAnnonces?order=desc`).then((response) => {
            this.setState({
              annonces: response.data,
              annonceSelected: [],
              idAnnonce: '',
              inputEmpty: false
            });
          });
        }
      });
  }

  renderAnnonces = (annonces) => {
    let temp = null;
    temp = annonces.map((annonce) => (
      <Segment color="violet" key={annonce._id}>
        <Annonce
          titre={annonce.titre}
          prix={annonce.prix}
          image={annonce.images[0]}
          annee={annonce.annee}
          puissance={annonce.puissance}
          energie={annonce.energie}
          boite={annonce.boite}
          kms={annonce.kms}
          modele={annonce.modele}
          marque={annonce.marque}
          description={annonce.description}
        />
        <Modal
          closeIcon
          dimmer="blurring"
          size="small"
          trigger={
            <div>
              <Responsive {...Responsive.onlyMobile}>
                <Button style={{ marginTop: "10px" }} negative fluid>
                  Supprimer l'annonce
                </Button>
              </Responsive>
              <Responsive minWidth={Responsive.onlyTablet.minWidth}>
                <Button
                  style={{ marginTop: "10px" }}
                  negative
                  fluid
                  animated="vertical"
                >
                  <Button.Content visible>Supprimer l'annonce</Button.Content>
                  <Button.Content hidden>
                    <Icon name="trash alternate outline" />
                  </Button.Content>
                </Button>
              </Responsive>
            </div>
          }
          header="attention!"
          content="etes vous sur de vouloir supprimer cette annonce."
          actions={[
            { content: "Oui, supprimer cette annonce", positive: true, key: 1 },
          ]}
          onActionClick={() => {
            this.supprimerAnnonce(annonce._id);
          }}
        />
      </Segment>
    ));
    return temp;
  };

  handleInput = (e) => {
    this.setState({ idAnnonce: e.target.value, inputEmpty: false })
  }

  handelRecherche = () => {
    let found = null
    if (this.state.idAnnonce) {
      found = this.state.annonces.find((annonce) => {
        return annonce._id === this.state.idAnnonce;
      });
      if (found !== null)
        this.setState({ annonceSelected: [...this.state.annonceSelected, found] })
    }
    else (
      this.setState({ inputEmpty: true })
    )
  }
  render() {
    return <div>
      <Segment inverted>
        <Header>Entrer l'ID de l'annonce</Header>
        <Grid>
          <Grid.Row>
            <Grid.Column width={10}>
              <Input
                onChange={this.handleInput}
                value={this.state.idAnnonce}
                fluid
                error={this.state.inputEmpty}
                placeholder='ID...'
              />
            </Grid.Column>
            <Grid.Column style={{ paddingLeft: "0em" }} width={6}>
              <Button positive fluid onClick={this.handelRecherche}>Chercher</Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>

      {this.state.annonceSelected.length > 0 ? this.renderAnnonces(this.state.annonceSelected) : this.renderAnnonces(this.state.annonces)}
    </div>;
  }
}
export default SuppAnnonce;
