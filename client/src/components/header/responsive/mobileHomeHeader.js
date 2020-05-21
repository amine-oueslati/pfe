import React, { Component } from "react";
import {
  Button,
  Container,
  Icon,
  Menu,
  Responsive,
  Segment,
  Sidebar
} from "semantic-ui-react";

import car from "../../../assets/home.jpg";

import HomepageHeading from "../homePageHeading";

const getWidth = () => {
  const isSSR = typeof window === "undefined";

  return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth;
};

class MobileHomeHeader extends Component {
  state = {};

  handleSidebarHide = () => this.setState({ sidebarOpened: false });

  handleToggle = () => this.setState({ sidebarOpened: true });

  render() {
    const { sidebarOpened } = this.state;

    return (
      <Responsive
        as={Sidebar.Pushable}
        getWidth={getWidth}
        maxWidth={Responsive.onlyMobile.maxWidth}
      >
        <Sidebar
          as={Menu}
          animation="uncover"
          inverted
          onHide={this.handleSidebarHide}
          vertical
          visible={sidebarOpened}
        >
          <Menu.Item active as="a" href="/">
            <Icon name="home" />
            Accueil
          </Menu.Item>
          <Menu.Item as="a" href="/annonces">
            <Icon name="file alternate" />
            Annonce
          </Menu.Item>
          <Menu.Item as="a" href="/comparateur">
            <Icon name="exchange" />
            Comparateur
          </Menu.Item>
          <Menu.Item as="a" href="/contact">
            <Icon name="envelope" />
            Contact
          </Menu.Item>
          <Menu.Item as="a" href="/login">
            <Icon name="settings" />
            Admin
          </Menu.Item>
        </Sidebar>

        <Sidebar.Pusher dimmed={sidebarOpened}>
          <Segment
            inverted
            textAlign="center"
            style={{
              backgroundImage: `url(${car})`,
              backgroundSize: "cover",
              minHeight: 400,
              padding: "1em 0em"
            }}
            vertical
          >
            <Container>
              <Menu inverted pointing secondary size="large">
                <Menu.Item onClick={this.handleToggle}>
                  <Icon name="sidebar" />
                </Menu.Item>
                
              </Menu>
            </Container>
            <HomepageHeading mobile />
          </Segment>
        </Sidebar.Pusher>
      </Responsive>
    );
  }
}

export default MobileHomeHeader;
