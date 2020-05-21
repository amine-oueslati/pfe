import React, { Component } from "react";
import {
  Header,
  Dropdown,
  Input,
  Label,
  Radio,
  Progress,
  Message,
  TextArea,
  Form,
  Responsive,
  Button,
} from "semantic-ui-react";

import axios from "axios";

import { ANNEE, CARROSSERIE, ENERGIE } from "../../../../config";

class AjoutAnnonce extends Component {
  constructor() {
    super();
    this.state = {
      modeles: [],
      marques: [],
      images: [],
      marqueSelected: {},
      brandSelected: "",
      modeleSelected: "",
      kms: "",
      prix: "",
      annee: "",
      energieSelected: "",
      CarrosserieSelected: "",
      puissance: "",
      boite: "",
      description: "",
      formNotValide: false,
    };

    this.selectMultipleImage = this.selectMultipleImage.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    axios.get("/api/getMarques").then((response) => {
      this.setState({ marques: response.data });
    });
  }

  selectMultipleImage(e) {
    if (e.target.files.length > 0) {
      this.setState({ images: e.target.files, imagesIsEmpty: false });
    }
  }

  handleTitreInputChange = (event) => {
    this.setState({ titre: event.target.value });
    if (event.target.value !== "") this.setState({ titreIsEmpty: false });
  };

  handleDescriptionAreaChange = (event) => {
    this.setState({
      description: event.target.value,
      descriptionIsEmpty: false,
    });
  };

  handleMarquesDropdownChange = (event, data) => {
    let x = this.state.marques.find((element) => element.brand === data.value);
    this.setState({ marqueSelected: x });
    let modelsOptions = [];
    x.models.map((item) => {
      modelsOptions.push({
        key: item,
        text: item,
        value: item,
      });
    });
    this.setState({
      modeles: modelsOptions,
      brandSelected: data.value,
      brandSelectedIsEmpty: false,
    });
  };

  handleModeleDropdownChange = (event, data) => {
    this.setState({ modeleSelected: data.value, modeleSelectedIsEmpty: false });
  };

  handleCarrosserieDropdownChange = (event, data) => {
    this.setState({
      CarrosserieSelected: data.value,
      CarrosserieSelectedIsEmpty: false,
    });
  };

  handleKmsInputChange = (event) => {
    if (Number(event.target.value))
      this.setState({
        kms: Number(event.target.value),
        kmsError: false,
        kmsIsEmpty: false,
      });
    else this.setState({ kmsError: true });
  };

  handlePrixInputChange = (event) => {
    if (Number(event.target.value)) {
      this.setState({
        prix: Number(event.target.value),
        prixError: false,
        prixIsEmpty: false,
      });
    } else this.setState({ prixError: true });
  };

  handleAnneeInputChange = (event, data) => {
    this.setState({
      annee: data.value,
      anneeIsEmpty: false,
    });
  };

  handleBoiteChange = (e, { value }) => {
    this.setState({ boiteSelected: value, boiteIsEmpty: false });
  };

  handleEnergieChange = (e, data) => {
    this.setState({ energieSelected: data.value, energieIsEmpty: false });
  };

  handlePuissanceInputChange = (event, data) => {
    if (Number(event.target.value)) {
      this.setState({
        puissance: Number(event.target.value),
        puissanceError: false,
        puissanceIsEmpty: false,
      });
    } else this.setState({ puissanceError: true });
  };

  onSubmit() {
    if (this.state.titre === "" || this.state.titre === undefined)
      this.setState({ titreIsEmpty: true });

    if (
      this.state.brandSelected === undefined ||
      this.state.brandSelected === ""
    )
      this.setState({ brandSelectedIsEmpty: true });

    if (
      this.state.modeleSelected === undefined ||
      this.state.modeleSelected === ""
    )
      this.setState({ modeleSelectedIsEmpty: true });

    if (this.state.kms === "" || this.state.kms === undefined)
      this.setState({ kmsIsEmpty: true });

    if (this.state.prix === "" || this.state.prix === undefined)
      this.setState({ prixIsEmpty: true });

    if (this.state.annee === "" || this.state.annee === undefined)
      this.setState({ anneeIsEmpty: true });

    if (
      this.state.energieSelected === "" ||
      this.state.energieSelected === undefined
    )
      this.setState({ energieIsEmpty: true });

    if (
      this.state.CarrosserieSelected === undefined ||
      this.state.CarrosserieSelected === ""
    )
      this.setState({ CarrosserieSelectedIsEmpty: true });

    if (this.state.puissance === "" || this.state.puissance === undefined)
      this.setState({ puissanceIsEmpty: true });

    if (
      this.state.boiteSelected === "" ||
      this.state.boiteSelected === undefined
    )
      this.setState({ boiteIsEmpty: true });

    if (this.state.description === "" || this.state.description === undefined)
      this.setState({ descriptionIsEmpty: true });

    if (this.state.images === undefined || this.state.images.length === 0)
      this.setState({ imagesIsEmpty: true });

    let formNotValide =
      this.state.brandSelectedIsEmpty ||
      this.state.modeleSelectedIsEmpty ||
      this.state.kmsIsEmpty ||
      this.state.kmsError ||
      this.state.prixError ||
      this.state.prixIsEmpty ||
      this.state.anneeIsEmpty ||
      this.state.energieIsEmpty ||
      this.state.CarrosserieSelectedIsEmpty ||
      this.state.puissanceError ||
      this.state.puissanceIsEmpty ||
      this.state.boiteIsEmpty ||
      this.state.titreIsEmpty ||
      this.state.descriptionIsEmpty ||
      this.state.imagesIsEmpty;

    this.setState({ formNotValide });

    if (formNotValide === false) {
      const formData = new FormData();
      formData.append("modele", this.state.modeleSelected);
      formData.append("marque", this.state.brandSelected);
      formData.append("carrosserie", this.state.CarrosserieSelected);
      formData.append("kms", this.state.kms);
      formData.append("prix", this.state.prix);
      formData.append("annee", this.state.annee);
      formData.append("boite", this.state.boiteSelected);
      formData.append("energie", this.state.energieSelected);
      formData.append("puissance", this.state.puissance);
      formData.append("description", this.state.description);
      formData.append("titre", this.state.titre);

      for (let img of this.state.images) {
        formData.append("images", img);
      }

      axios
        .post("/api/annonce", formData, {
          onUploadProgress: (progressEvent) => {
            this.setState({
              progress: parseInt(
                Math.round((progressEvent.loaded * 100) / progressEvent.total)
              ),
            });
          },
        })
        .then((res) => {
          if (res.status === 200) {
            this.setState({ progress: 0, formSubmitted: true });
          } else this.setState({ formSubmitted: false });
        })
        .catch((error) => {
          this.setState({ serverError: true });
        });
    }
  }

  renderAnneeOptions = (min, max) => {
    let anneeOptions = [];
    let annee;
    for (annee = max; annee >= min; annee--) {
      anneeOptions.push({ key: annee, text: annee, value: annee });
    }
    return anneeOptions;
  };

  render() {
    let marquesOptions = [];
    this.state.marques.map((item) => {
      marquesOptions.push({
        key: item._id,
        text: item.brand,
        value: item.brand,
      });
    });

    return (
      <div>
        <Header size="large">Creer une annonce</Header>

        <Form>
          {/* Titre */}
          <Form.Field>
            <Header size="medium">Titre</Header>
            <Input
              fluid
              placeholder="Titre"
              name="titre"
              onChange={this.handleTitreInputChange}
            />
            {this.state.titreIsEmpty ? (
              <Label basic color="red" pointing>
                Donner un titre pour l'annonce
              </Label>
            ) : null}
          </Form.Field>

          {/* Label */}
          <Responsive {...Responsive.onlyMobile}>
            <Label style={{ marginBottom: "1em" }} color="orange">
              Ci vous n'avez pas trouver la marque ou le modèle vous pouvez
              l'ajouter à la rubrique de gestion de marques
            </Label>
          </Responsive>
          <Responsive minWidth={Responsive.onlyTablet.minWidth}>
            <Label as="a" color="orange" ribbon="right">
              Ci vous n'avez pas trouver la marque ou le modèle vous pouvez
              l'ajouter à la rubrique de gestion de marques
            </Label>
          </Responsive>

          {/* Marque */}
          <Form.Field>
            <Header size="medium">Marque</Header>
            <Dropdown
              name="marque"
              fluid
              placeholder="Marque"
              search
              selection
              options={marquesOptions}
              onChange={this.handleMarquesDropdownChange}
            />
            {this.state.brandSelectedIsEmpty ? (
              <Label basic color="red" pointing>
                Sélectionnez une marque
              </Label>
            ) : null}
          </Form.Field>

          {/* Modele */}
          <Form.Field>
            <Header size="medium">Modele</Header>
            <Dropdown
              name="modele"
              fluid
              placeholder="Modèle"
              search
              selection
              options={this.state.modeles}
              onChange={this.handleModeleDropdownChange}
            />
            {this.state.modeleSelectedIsEmpty ? (
              <Label basic color="red" pointing>
                Sélectionnez un modèle
              </Label>
            ) : null}
          </Form.Field>

          {/* Kilomètrage */}
          <Form.Field>
            <Header size="medium">Kilomètrage</Header>
            <Input
              name="kms"
              label="Milles Kms"
              labelPosition="right"
              fluid
              name="kms"
              error={this.state.kmsError}
              onChange={this.handleKmsInputChange}
            />
            {this.state.kmsError ? (
              <Label basic color="red" pointing>
                Le kilomètrage doit être une valeur numerique
              </Label>
            ) : null}
            {this.state.kmsIsEmpty ? (
              <Label basic color="red" pointing>
                Ce champ est obligatoire
              </Label>
            ) : null}
          </Form.Field>

          {/* Prix */}
          <Form.Field>
            <Header size="medium">Prix</Header>
            <Input
              name="prix"
              label="Milles Dinars"
              labelPosition="right"
              fluid
              onChange={this.handlePrixInputChange}
            />
            {this.state.prixError ? (
              <Label basic color="red" pointing>
                Le prix doit être une valeur numerique
              </Label>
            ) : null}
            {this.state.prixIsEmpty ? (
              <Label basic color="red" pointing>
                Ce champ est obligatoire
              </Label>
            ) : null}
          </Form.Field>

          {/* Année */}
          <Form.Field>
            <Header size="medium">Année</Header>
            <Dropdown
              placeholder="Année"
              onChange={this.handleAnneeInputChange}
              value={this.state.value}
              search
              fluid
              selection
              options={this.renderAnneeOptions(ANNEE.MIN, ANNEE.MAX)}
            />

            {this.state.anneeIsEmpty ? (
              <Label basic color="red" pointing>
                Ce champ est obligatoire
              </Label>
            ) : null}
          </Form.Field>

          {/* Energie */}
          <Form.Field>
            <Header size="medium">Energie</Header>
            <Dropdown
              clearable
              placeholder="type d'énergie"
              fluid
              search
              selection
              options={ENERGIE}
              onChange={this.handleEnergieChange}
            />
            {this.state.energieIsEmpty ? (
              <Label basic color="red" pointing>
                Sélectionnez un choix
              </Label>
            ) : null}
          </Form.Field>

          {/* Carrosserie */}
          <Form.Field>
            <Header size="medium">Carrosserie</Header>
            <Dropdown
              name="carrosserie"
              placeholder="carrosserie"
              fluid
              search
              selection
              options={CARROSSERIE}
              onChange={this.handleCarrosserieDropdownChange}
            />
            {this.state.CarrosserieSelectedIsEmpty ? (
              <Label basic color="red" pointing>
                Sélectionnez le type de carrosserie
              </Label>
            ) : null}
          </Form.Field>

          {/* Puissance */}
          <Form.Field>
            <Header size="medium">Puissance</Header>
            <Input
              name="puissance"
              fluid
              onChange={this.handlePuissanceInputChange}
            />
            {this.state.puissanceError ? (
              <Label basic color="red" pointing>
                La puissance doit être une valeur numerique
              </Label>
            ) : null}
            {this.state.puissanceIsEmpty ? (
              <Label basic color="red" pointing>
                Ce champ est obligatoire
              </Label>
            ) : null}
          </Form.Field>

          {/* Boite */}
          <Form.Field>
            <Header size="medium">Boite</Header>
            <Form.Field>
              <Radio
                label="Manuelle"
                name="boite"
                value="manuelle"
                checked={this.state.boiteSelected === "manuelle"}
                onChange={this.handleBoiteChange}
              />
            </Form.Field>
            <Form.Field>
              <Radio
                label="Automatique"
                name="boite"
                value="automatique"
                checked={this.state.boiteSelected === "automatique"}
                onChange={this.handleBoiteChange}
              />
            </Form.Field>
            {this.state.boiteIsEmpty ? (
              <Label basic color="red" pointing>
                Sélectionnez un choix
              </Label>
            ) : null}
          </Form.Field>

          {/* Description */}
          <Form.Field>
            <Header size="medium">Description</Header>
            <TextArea
              placeholder="Description"
              name="description"
              onChange={this.handleDescriptionAreaChange}
            />
            {this.state.descriptionIsEmpty ? (
              <Label basic color="red" pointing>
                Ajoutez une description
              </Label>
            ) : null}
          </Form.Field>

          {/* Images */}
          <Form.Field>
            <Header size="medium">Images</Header>
            <Input
              type="file"
              name="images"
              multiple
              onChange={this.selectMultipleImage}
            />
            {this.state.imagesIsEmpty ? (
              <Label basic color="red" pointing>
                Sélectionner les images nécessaires
              </Label>
            ) : null}
          </Form.Field>

          {/* Percentage Bar */}
          {this.state.progress === undefined ||
          this.state.progress === 0 ? null : (
            <Progress percent={this.state.progress} indicating />
          )}

          {this.state.formNotValide ? (
            <Message negative>
              <Message.Header>
                Possibilité d'avoir des champs vides ou erronés
              </Message.Header>
              <p>Veuillez vérifier les informations saisies</p>
            </Message>
          ) : null}

          {this.state.formSubmitted ? (
            <Message positive={true}>
              <Message.Header>Annonce ajoutée</Message.Header>
            </Message>
          ) : null}

          {this.state.serverError === true ? (
            <Message negative>
              <Message.Header>Ajout echoué</Message.Header>
            </Message>
          ) : null}

          <Button
            color="green"
            size="big"
            onClick={this.onSubmit}
            type="submit"
            value="submit"
          >
            Ajouter
          </Button>
        </Form>
      </div>
    );
  }
}

export default AjoutAnnonce;
