import React, { Component } from "react";
import { Redirect } from 'react-router-dom'
import MenuContainer from "../../HOC/menuContainer";
import Footer from "../../HOC/footer";
import axios from "axios";

import {
  Message,
  Header,
  Icon,
  Button,
  Form,
  Segment
} from "semantic-ui-react";

class Login extends Component {
  state = {
    email: "",
    password: "",
    error: undefined,
    success: false
  };

  handelEmailChange = event => {
    this.setState({ email: event.target.value, error: undefined });
  };
  handelPasswordChange = event => {
    this.setState({ password: event.target.value, error: undefined });
  };
  submitForm = e => {
    e.preventDefault();
    axios
      .post("/api/login", {
        email: this.state.email,
        password: this.state.password
      })
      .then(response =>
        this.setState({
          error: response.data.message,
          success: response.data.isAuth
        })
      );
  };

  renderRedirect = () => {
    if (this.state.success) {
      return <Redirect to="/admin" />;
    }
  };

  render() {
    return (
      <div>
        {this.renderRedirect()}
        <MenuContainer align="center" active="admin">
          <Segment padded="very" textAlign="center">
            <Header
              color="red"
              as="h2"
              icon
              textAlign="center"
              style={{ marginTop: "1em", marginBottom: "2em" }}
            >
              <Header.Content style={{ marginBottom: "1em" }}>
                page réservé à l'administrateur
              </Header.Content>
              <Icon name="users" circular />
            </Header>
            <Form warning>
              <Header as="h2" textAlign="center" size="large">
                E-mail
              </Header>
              <Form.Input
                error={this.state.error === "Auth failed, email not found"}
                size="huge"
                icon="user"
                type="email"
                iconPosition="left"
                placeholder="E-mail"
                onChange={this.handelEmailChange}
              />
              <Header as="h2" textAlign="center" size="large">
                Password
              </Header>

              <Form.Input
                error={this.state.error === "Wrong password"}
                size="huge"
                icon="lock"
                iconPosition="left"
                type="password"
                placeholder="password"
                onChange={this.handelPasswordChange}
              />
              {this.state.error !== undefined ? (
                <Message
                  warning
                  header="Verifier les coordonnées!"
                  content= {this.state.error === "Wrong password"? "Mot de passe incorrect" : "Email incorrect"}
                />
              ) : null}

              <Button
                onClick={this.submitForm}
                size="huge"
                content="Connection"
                primary
              />
            </Form>
          </Segment>
        </MenuContainer>
        <Footer />
      </div>
    );
  }
}
export default Login;
