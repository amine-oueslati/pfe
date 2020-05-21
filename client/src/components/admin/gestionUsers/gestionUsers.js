import React, { Component } from "react";

import {
  Table,
  Button,
  Container,
  Icon,
  Dimmer,
  Loader,
  Divider,
  Message,
  Modal,
  Card,
  Form,
  Responsive,
} from "semantic-ui-react";

import axios from "axios";

class GestionUsers extends Component {
  state = {
    nom: "",
    prenom: "",
    email: "",
    password: "",
    passwordConf: "",
    nomEmpty: false,
    prenomEmpty: false,
    emailEmpty: false,
    passwordEmpty: false,
    openModal: false,
  };

  componentWillMount = () => {
    axios.get("/api/getUsers").then((response) => {
      this.setState({ users: response.data });
    });
  };

  suppUser = (idUser) => {
    axios
      .delete("/api/deleteUser", { data: { id: idUser } })
      .then((response) => {
        if (response.status === 200) {
          axios.get("/api/getUsers").then((response) => {
            this.setState({ users: response.data });
          });
        } else {
          this.setState({ OperationError: true });
        }
      });
  };

  renderUserDesktop = () => {
    let temp = null;
    temp = this.state.users.map((user) => (
      <Table.Row textAlign="center" key={user._id}>
        <Table.Cell>
          {user.name} {user.lastName}
        </Table.Cell>
        <Table.Cell>{user.email}</Table.Cell>
        <Table.Cell>
          <Button
            negative
            animated="fade"
            onClick={() => this.suppUser(user._id)}
          >
            <Button.Content visible>Supprimer</Button.Content>
            <Button.Content hidden>
              <Icon name="delete" />
            </Button.Content>
          </Button>
        </Table.Cell>
      </Table.Row>
    ));
    return temp;
  };

  renderUserMobile = () => {
    let temp = null;
    temp = this.state.users.map((user) => (
      <Card color="blue" fluid key={user._id}>
        <Card.Content>
          <Card.Header textAlign="center">
            {user.name} {user.lastName}
          </Card.Header>

          <Card.Description textAlign="center">{user.email}</Card.Description>
        </Card.Content>
        <Card.Content
          textAlign="center"
          extra
          style={{ paddingBottom: "0.5em" }}
        >
          <Button
            style={{ paddingRight: "5em", paddingLeft: "5em" }}
            color="red"
            onClick={() => this.suppUser(user._id)}
          >
            Supprimer
          </Button>
        </Card.Content>
      </Card>
    ));

    return temp;
  };

  handleNom = (e) => {
    this.setState({
      nomEmpty: false,
      nom: e.target.value,
      formValid: true,
    });
  };

  handlePrenom = (e) => {
    this.setState({
      prenomEmpty: false,
      prenom: e.target.value,
      formValid: true,
    });
  };

  handelEmail = (e) => {
    this.setState({
      emailEmpty: false,
      email: e.target.value,
      formValid: true,
    });
  };

  handlePassword = (e) => {
    this.setState({
      password: e.target.value,
      passwordEmpty: false,
      formValid: true,
    });
  };

  handlePasswordConf = (e) => {
    this.setState({
      passwordConf: e.target.value,
      passwordEmpty: false,
      formValid: true,
    });
  };

  fieldComfirmation = () => {
    if (this.state.prenom === "") {
      this.setState({ prenomEmpty: true });
    }
    if (this.state.nom === "") {
      this.setState({ nomEmpty: true });
    }
    if (
      this.state.email === "" ||
      !/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(this.state.email)
    ) {
      this.setState({ emailEmpty: true });
    }
    if (
      this.state.password.length < 8 ||
      this.state.password === "" ||
      this.state.passwordConf === "" ||
      this.state.password !== this.state.passwordConf
    ) {
      this.setState({ passwordEmpty: true });
    }
  };

  onSubmit = (e) => {
    e.preventDefault();

    this.fieldComfirmation();

    if (this.state.prenom !== "") {
      if (this.state.nom !== "") {
        if (
          this.state.email !== "" &&
          /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(this.state.email)
        ) {
          if (
            this.state.password.length > 7 &&
            this.state.password !== "" &&
            this.state.passwordConf !== "" &&
            this.state.password === this.state.passwordConf
          ) {
            const data = {
              name: this.state.nom,
              lastName: this.state.prenom,
              password: this.state.password,
              email: this.state.email,
            };
            axios.post("/api/register", { ...data }).then((response) => {
              this.setState({
                nom: "",
                prenom: "",
                email: "",
                password: "",
                passwordConf: "",
                nomEmpty: false,
                prenomEmpty: false,
                emailEmpty: false,
                passwordEmpty: false,
                openModal: false,
              });

              if (response.data.user) {
                this.setState({ userAdded: true });
                axios.get("/api/getUsers").then((response) => {
                  this.setState({ users: response.data });
                });
              } else this.setState({ userAdded: false });
            });
          }
        }
      }
    }
  };

  render() {
    if (this.state.users) {
      return (
        <div>
          {/* Desktop */}
          <Responsive minWidth={Responsive.onlyTablet.minWidth}>
            <Table color="blue">
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell textAlign="center">Nom </Table.HeaderCell>
                  <Table.HeaderCell textAlign="center">E-mail</Table.HeaderCell>
                  <Table.HeaderCell textAlign="center">
                    Supprimer
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>{this.renderUserDesktop()}</Table.Body>
            </Table>
          </Responsive>

          {/* Mobile */}
          <Responsive {...Responsive.onlyMobile}>
            <Card.Group>{this.renderUserMobile()}</Card.Group>
          </Responsive>

          <Divider horizontal style={{ margin: "2em" }}>
            Ou Bien
          </Divider>

          <Modal
            onOpen={() => this.setState({ openModal: true })}
            onClose={() => this.setState({ openModal: false })}
            open={this.state.openModal}
            trigger={
              <div>
                {/* Desktop */}
                <Responsive minWidth={Responsive.onlyTablet.minWidth}>
                  <Button fluid positive animated="fade">
                    <Button.Content visible>
                      Ajouter un administrateur
                    </Button.Content>
                    <Button.Content hidden>
                      <Icon name="add user" />
                    </Button.Content>
                  </Button>
                </Responsive>

                {/* Mobile */}
                <Responsive {...Responsive.onlyMobile}>
                  <Button fluid positive>
                    Ajouter un administrateur
                  </Button>
                </Responsive>
              </div>
            }
          >
            <Modal.Header>Ajouter un administrateur</Modal.Header>
            <Modal.Content image>
              <Container>
                <p>
                  les champs avec un astérisque
                  <span style={{ color: "red" }}> * </span> obligatoires
                </p>

                <Form>
                  <Form.Group widths="equal">
                    <span style={{ color: "red" }}> * </span>
                    <Form.Input
                      error={this.state.nomEmpty}
                      fluid
                      label="Nom "
                      placeholder="Nom"
                      onChange={this.handleNom}
                      value={this.state.nom}
                    />

                    <span style={{ color: "red" }}> * </span>
                    <Form.Input
                      error={this.state.prenomEmpty}
                      fluid
                      label="Prenom"
                      placeholder="Prenom"
                      onChange={this.handlePrenom}
                      value={this.state.prenom}
                    />
                  </Form.Group>

                  <Form.Group widths="equal">
                    <span style={{ color: "red" }}> * </span>
                    <Form.Input
                      error={this.state.emailEmpty}
                      fluid
                      label="E-mail"
                      placeholder="E-mail"
                      onChange={this.handelEmail}
                      value={this.state.email}
                    />
                  </Form.Group>

                  <Form.Group widths="equal">
                    <span style={{ color: "red" }}> * </span>
                    <Form.Input
                      error={this.state.passwordEmpty}
                      fluid
                      type="password"
                      label="Mot de passe"
                      placeholder="Mot de passe"
                      onChange={this.handlePassword}
                      value={this.state.password}
                    />
                    <span style={{ color: "red" }}> * </span>
                    <Form.Input
                      error={this.state.passwordEmpty}
                      fluid
                      type="password"
                      label="Confirmer mot de passe"
                      placeholder="Confirmer mot de passe"
                      onChange={this.handlePasswordConf}
                      value={this.state.passwordConf}
                    />
                  </Form.Group>

                  <Form.Button
                    size="big"
                    onClick={this.onSubmit}
                    color="green"
                    style={{ marginBottom: "2em" }}
                    floated="right"
                  >
                    Ajouter l'administrateur
                  </Form.Button>
                </Form>
              </Container>
            </Modal.Content>
          </Modal>
          {this.state.userAdded === false ? (
            <Message negative>
              <Message.Header>operation échouée !</Message.Header>
            </Message>
          ) : null}
          {this.state.userAdded === true ? (
            <Message positive>
              <Message.Header>opération effectuée avec succès !</Message.Header>
            </Message>
          ) : null}
        </div>
      );
    } else {
      return (
        <Container>
          <Dimmer active inverted>
            <Loader inverted content="Chargement" />
          </Dimmer>
        </Container>
      );
    }
  }
}
export default GestionUsers;
