import React, { Component } from "react";
import {
  Container,
  Menu,
  Segment,
  Sidebar,
  Responsive,
  Icon,
  Button,
} from "semantic-ui-react";

const getWidth = () => {
  const isSSR = typeof window === "undefined";
  return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth;
};

class MobileContainer extends Component {
  state = {};

  handleSidebarHide = () => this.setState({ sidebarOpened: false });
  handleToggle = () => this.setState({ sidebarOpened: true });

  render() {
    const { children } = this.props;
    const { sidebarOpened } = this.state;

    return (
      <Responsive
        as={Sidebar.Pushable}
        getWidth={getWidth}
        maxWidth={Responsive.onlyMobile.maxWidth}
      >
        <Sidebar
          as={Menu}
          animation="push"
          inverted
          onHide={this.handleSidebarHide}
          vertical
          visible={sidebarOpened}
        >
          <Menu.Item as="a" href="/" active={this.props.active === "home"}>
            <Icon name="home" />
            Accueil
          </Menu.Item>
          <Menu.Item
            as="a"
            href="/annonces"
            active={this.props.active === "annonces"}
          >
            <Icon name="file alternate" />
            Annonce
          </Menu.Item>
          <Menu.Item
            as="a"
            href="/comparateur"
            active={this.props.active === "comparateur"}
          >
            <Icon name="exchange" />
            Comparateur
          </Menu.Item>
          <Menu.Item
            as="a"
            href="/contact"
            active={this.props.active === "contact"}
          >
            <Icon name="envelope" />
            Contact
          </Menu.Item>
        </Sidebar>

        <Sidebar.Pusher dimmed={sidebarOpened}>
          <Segment inverted style={{ padding: "7px" }}>
            <Container>
              <Menu inverted pointing secondary size="large">
                <Menu.Item onClick={this.handleToggle}>
                  <Icon name="sidebar" />
                </Menu.Item>
              </Menu>
            </Container>
          </Segment>

          {children}
        </Sidebar.Pusher>
      </Responsive>
    );
  }
}
export default MobileContainer;
