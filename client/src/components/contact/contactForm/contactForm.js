import React, { Component } from "react";
import { Form, Message, Container, Segment } from "semantic-ui-react";

import axios from "axios";



class ContactForm extends Component {
  state = {
    contactNom: "",
    contactPrenom: "",
    contactTel: "",
    contactEmail: "",
    contactMessage: this.props.defaultMessage,
    contactCheck: false,
    prenomEmpty: false,
    nomEmpty: false,
    telEmpty: false,
    emailEmpty: false,
    msgEmpty: false,
    msgSubmitted: "default",
  };

  handleNom = (e) => {
    this.setState({
      nomEmpty: false,
      contactNom: e.target.value,
      formValid: true,
      msgSubmitted: "default"
    });
  };

  handlePrenom = (e) => {
    this.setState({
      prenomEmpty: false,
      contactPrenom: e.target.value,
      formValid: true,
      msgSubmitted: "default"
    });
  };

  handleTel = (e) => {
    if (e.target.value === "") this.setState({ contactTel: "" });
    if (Number(e.target.value) || e.target.value === "0") {
      this.setState({
        telEmpty: false,
        contactTel: e.target.value,
        formValid: true,
        msgSubmitted: "default"
      });
    }
  };

  handelEmail = (e) => {
    this.setState({
      emailEmpty: false,
      contactEmail: e.target.value,
      formValid: true,
      msgSubmitted: "default"
    });
  };

  handelMessage = (e) => {
    this.setState({
      msgEmpty: false,
      contactMessage: e.target.value,
      formValid: true,
      msgSubmitted: "default"
    });
  };

  handelCheck = () => {
    this.setState((prevState) => ({
      contactCheck: !prevState.contactCheck,
      formValid: true,
      msgSubmitted: "default"
    }));
  };

  onSubmit = (e) => {
    e.preventDefault();


    if (this.state.contactPrenom === "") {
      this.setState({ prenomEmpty: true });
    }
    if (this.state.contactNom === "") {
      this.setState({ nomEmpty: true });
    }
    if (this.state.contactTel === "" || this.state.contactTel.length < 8) {
      this.setState({ telEmpty: true });
    }
    if (
      this.state.contactEmail === "" ||
      !/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(this.state.contactEmail)
    ) {
      this.setState({ emailEmpty: true });
    }
    if (this.state.contactMessage === "") {
      this.setState({ msgEmpty: true });
    }

    if (
      !/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(this.state.contactEmail) ||
      this.state.prenomEmpty ||
      this.state.nomEmpty ||
      this.state.telEmpty ||
      this.state.contactTel.length < 8 ||
      this.state.msgEmpty ||
      !this.state.contactCheck
    ) {
      this.setState({ formValid: false });
    } else {
      const data = {
        nom: this.state.contactNom,
        prenom: this.state.contactPrenom,
        tel: this.state.contactTel,
        email: this.state.contactEmail,
        msg: this.state.contactMessage,
        check: this.state.contactCheck,
        idAnnonce: this.props.idAnnonce,
      };

      this.setState({ formValid: true });

      axios.post("/api/message", { ...data }).then((response) => {
        if (response.status === 200) this.setState({ msgSubmitted: true });
        else this.setState({ msgSubmitted: false });
      });
    }
  };

  render() {
    return (
      <Container>
        <p>
          les champs avec un astérisque{" "}
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
              value={this.state.contactNom}
            />
            <span style={{ color: "red" }}> * </span>
            <Form.Input
              error={this.state.prenomEmpty}
              fluid
              label="Prenom"
              placeholder="Prenom"
              onChange={this.handlePrenom}
              value={this.state.contactPrenom}
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
              value={this.state.contactEmail}
            />
            <span style={{ color: "red" }}> * </span>
            <Form.Input
              error={this.state.telEmpty}
              fluid
              type="tel"
              label="Tél"
              placeholder="Tél"
              maxLength="8"
              onChange={this.handleTel}
              value={this.state.contactTel}
            />
          </Form.Group>

          <span style={{ color: "red" }}> * </span>
          <Form.TextArea
            error={this.state.msgEmpty}
            label="Message"
            rows={6}
            onChange={this.handelMessage}
            value={this.state.contactMessage}
          />

          <span style={{ color: "red" }}> * </span>
          <Form.Checkbox
            error
            slider
            label="j'accepte de recevoir des informations par courrier électronique ou par téléphone "
            onChange={this.handelCheck}
            checked={this.state.contactCheck}
          />

          <Form.Button
            onClick={this.onSubmit}
            color="green"
            style={{ marginBottom: "2em" }}
          >
            Envoyer
          </Form.Button>

          {this.state.msgSubmitted === true ? (
            <Message positive>
              <Message.Header>Votre message a été transmis</Message.Header>
              <p>On vous contactera sous peu</p>
            </Message>
          ) : null}
          {this.state.msgSubmitted === false ? (
            <Message negative>
              <Message.Header>
                Votre message n'a pas pu être envoyé
              </Message.Header>
              <p>Veuillez réessayer plus tard </p>
            </Message>
          ) : null}
          {this.state.formValid === false ? (
            <Message negative>
              <Message.Header>Veuillez vérifier le formulaire</Message.Header>
            </Message>
          ) : null}
        </Form>
      </Container>
    );
  }
}

export default ContactForm;
