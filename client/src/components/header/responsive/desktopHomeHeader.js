import React, { Component } from "react";

import {
  Icon,
  Button,
  Container,
  Menu,
  Responsive,
  Segment,
  Visibility,
} from "semantic-ui-react";

import car from "../../../assets/home.jpg";

import HomepageHeading from "../homePageHeading";

const getWidth = () => {
  const isSSR = typeof window === "undefined";

  return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth;
};

class DesktopHomeHeader extends Component {
  state = {};

  hideFixedMenu = () => this.setState({ fixed: false });
  showFixedMenu = () => this.setState({ fixed: true });

  render() {
    const { fixed } = this.state;

    return (
      <Responsive getWidth={getWidth} minWidth={Responsive.onlyTablet.minWidth}>
        <Visibility
          once={false}
          onBottomPassed={this.showFixedMenu}
          onBottomPassedReverse={this.hideFixedMenu}
        >
          <Segment
            inverted
            textAlign="center"
            vertical
            style={{
              backgroundImage: `url(${car})`,
              backgroundSize: "cover",
              minHeight: 700,
              padding: "1em 0em",
            }}
          >
            <Menu
              borderless={true}
              fixed={fixed ? "top" : null}
              inverted={!fixed}
              pointing={true}
              secondary={!fixed}
              size="large"
            >
              <Container>
                <Menu.Item active as="a" href="/">
                  Accueil
                </Menu.Item>

                <Menu.Item as="a" href="/annonces">
                  Annonce
                </Menu.Item>

                <Menu.Item as="a" href="/comparateur">
                  Comparateur
                </Menu.Item>

                <Menu.Item as="a" href="/contact">
                  Contact
                </Menu.Item>
                
              </Container>
            </Menu>
            <HomepageHeading />
          </Segment>
        </Visibility>
      </Responsive>
    );
  }
}

export default DesktopHomeHeader;
