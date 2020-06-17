import React, { Component } from "react";
import MenuContainer from "../../HOC/menuContainer";
import Footer from "../../HOC/footer";
import {
  Responsive,
  Tab,
  Accordion,
  Segment,
  Transition,
  Button,
  Icon,
} from "semantic-ui-react";
import GestionAnnonce from "./gestionAnnonces/gestionAnnonces";
import GestionMarque from "./gestionMarques/gestionMarque";
import GestionUsers from "./gestionUsers/gestionUsers";
import GestionMessages from "./gestionMessages/gestionMessages"
import axios from "axios";

const choixAdmin = [
  {
    menuItem: "Gestion des annonces",
    render: () => (
      <Tab.Pane>
        <GestionAnnonce />
      </Tab.Pane>
    ),
  },
  {
    menuItem: "Gestion des marques",
    render: () => (
      <Tab.Pane>
        <GestionMarque />
      </Tab.Pane>
    ),
  },
  {
    menuItem: "Gestion des admins",
    render: () => (
      <Tab.Pane>
        <GestionUsers />
      </Tab.Pane>
    ),
  },
  {
    menuItem: "Gestion des messages",
    render: () => (
      <Tab.Pane>
        <GestionMessages />
      </Tab.Pane>
    ),
  },
];

class Admin extends Component {
  state = {
    activeIndex: -1,
  };

  handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;

    this.setState({ activeIndex: newIndex });
  };

  handelLogout = () => {
    axios.get("/api/logout").then((response) => {
      if (response.data === "OK") {
        document.cookie =
          "auth=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      }
    });

    this.props.history.push("");
  };

  render() {
    return (
      <div>
        <MenuContainer>
          {/* Desktop */}
          <Responsive minWidth={Responsive.onlyTablet.minWidth}>
            <Segment vertical textAlign="right" style={{ paddingTop: "0em" }}>
              <Button primary animated onClick={this.handelLogout}>
                <Button.Content visible>Déconnection</Button.Content>
                <Button.Content hidden>
                  <Icon name="log out" />
                </Button.Content>
              </Button>
            </Segment>

            <Tab
              menu={{
                color: "grey",
                inverted: true,
                fluid: true,
                vertical: true,
              }}
              panes={choixAdmin}
            />
          </Responsive>

          {/* Mobile */}
          <Responsive {...Responsive.onlyMobile}>
            <Segment style={{ paddingTop: "0em" }} vertical textAlign="right">
              <Button primary onClick={this.handelLogout}>
                Déconnection
              </Button>
            </Segment>

            <Accordion fluid styled>
              {/* Gestion des annonces */}
              <Accordion.Title
                active={this.state.activeIndex === 0}
                index={0}
                onClick={this.handleClick}
              >
                <Segment color="grey" inverted>
                  Gestion des annonces
                </Segment>
              </Accordion.Title>
              <Transition
                visible={this.state.activeIndex === 0}
                animation="scale"
                duration={500}
              >
                <Accordion.Content active={this.state.activeIndex === 0}>
                  <GestionAnnonce />
                </Accordion.Content>
              </Transition>

              {/* Gestion des marques */}
              <Accordion.Title
                active={this.state.activeIndex === 1}
                index={1}
                onClick={this.handleClick}
              >
                <Segment color="grey" inverted>
                  Gestion des marques
                </Segment>
              </Accordion.Title>
              <Transition
                visible={this.state.activeIndex === 1}
                animation="scale"
                duration={500}
              >
                <Accordion.Content active={this.state.activeIndex === 1}>
                  <GestionMarque />
                </Accordion.Content>
              </Transition>

              {/* Gestion des admins */}
              <Accordion.Title
                active={this.state.activeIndex === 2}
                index={2}
                onClick={this.handleClick}
              >
                <Segment color="grey" inverted>
                  Gestion des admins
                </Segment>
              </Accordion.Title>
              <Transition
                visible={this.state.activeIndex === 2}
                animation="scale"
                duration={500}
              >
                <Accordion.Content active={this.state.activeIndex === 2}>
                  <GestionUsers />
                </Accordion.Content>
              </Transition>

              {/* Gestion des Messages */}
              <Accordion.Title
                active={this.state.activeIndex === 3}
                index={3}
                onClick={this.handleClick}
              >
                <Segment color="grey" inverted>
                  Gestion des messages
                </Segment>
              </Accordion.Title>
              <Transition
                visible={this.state.activeIndex === 3}
                animation="scale"
                duration={500}
              >
                <Accordion.Content active={this.state.activeIndex === 3}>
                  <GestionMessages />
                </Accordion.Content>
              </Transition>
            </Accordion>
          </Responsive>
        </MenuContainer>
        <Footer />
      </div>
    );
  }
}

export default Admin;
