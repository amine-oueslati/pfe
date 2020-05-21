import React, { Component } from "react";

import {
  Icon,
  Button,
  Container,
  Responsive,
  Menu,
  Segment,
} from "semantic-ui-react";

const getWidth = () => {
  const isSSR = typeof window === "undefined";
  return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth;
};

class DesktopContainer extends Component {
  render() {
    const { children } = this.props;

    return (
      <Responsive getWidth={getWidth} minWidth={Responsive.onlyTablet.minWidth}>
        <Segment inverted textAlign="center" vertical>
          <Menu
            borderless={true}
            fixed="top"
            inverted={false}
            pointing={true}
            secondary={false}
            size="large"
          >
            <Container>
              <Menu.Item as="a" href="/" active={this.props.active === "home"}>
                Accueil
              </Menu.Item>

              <Menu.Item
                as="a"
                href="/annonces"
                active={this.props.active === "annonces"}
              >
                Annonce
              </Menu.Item>

              <Menu.Item
                as="a"
                href="/comparateur"
                active={this.props.active === "comparateur"}
              >
                Comparateur
              </Menu.Item>

              <Menu.Item
                as="a"
                href="/contact"
                active={this.props.active === "contact"}
              >
                Contact
              </Menu.Item>
              
            </Container>
          </Menu>
        </Segment>
        <Container style={{ margin: "3em", marginRight: "1em" }}>
          {children}
        </Container>
      </Responsive>
    );
  }
}
export default DesktopContainer;
