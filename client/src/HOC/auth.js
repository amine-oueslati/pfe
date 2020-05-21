import React, { Component } from "react";
import { Dimmer, Loader, Container } from "semantic-ui-react";

import axios from "axios";

export default function (ComposedClass, reload) {
  class AuthentificationCheck extends Component {
    state = {
      loading: true,
    };

    componentDidMount() {
      axios.get("/api/auth").then((response) => {
        this.setState({ loading: false });

        if (!response.data.isAuth) {
          if (reload) this.props.history.push("/login");
        } else {
          this.setState({ user: response.data });
          if (reload === false) {
            this.props.history.push("/admin");
          }
        }
      });
    }

    render() {
      if (this.state.loading) {
        return (
          <Container>
            <Dimmer active inverted>
              <Loader inverted content="Chargement" />
            </Dimmer>
          </Container>
        );
      } else {
        return <ComposedClass {...this.props} user={this.state.user} />;
      }
    }
  }
  return AuthentificationCheck;
}
