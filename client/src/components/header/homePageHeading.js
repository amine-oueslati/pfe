import React from "react";
import PropTypes from "prop-types";
import { Button, Container, Header, Icon } from "semantic-ui-react";
import { COMPANY_NAME } from "../../config";

const HomepageHeading = ({ mobile }) => (
  <Container text>
    <Header
      as="h1"
      content={COMPANY_NAME}
      inverted
      style={{
        fontSize: mobile ? "2em" : "4em",
        fontWeight: "normal",
        marginBottom: 0,
        marginTop: mobile ? "1.5em" : "3em",
      }}
    />
    <Header
      as="h2"
      content="Plus que nos voitures, vos histoires."
      inverted
      style={{
        fontSize: mobile ? "1.5em" : "1.7em",
        fontWeight: "normal",
        marginTop: mobile ? "0.5em" : "1.5em",
      }}
    />
    <Button
      primary
      size="huge"
      style={{
        marginTop: "45px",
        marginBottom: "40px",
        background: "#8E0000",
      }}
    >
      Chercher votre voiture
      <Icon name="right arrow" />
    </Button>
  </Container>
);

HomepageHeading.propTypes = {
  mobile: PropTypes.bool,
};

export default HomepageHeading;
