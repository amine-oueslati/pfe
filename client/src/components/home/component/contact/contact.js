import React from "react";

import { Button, Divider, Header, Container, Grid, Image } from "semantic-ui-react";

import image from "../../../../assets/AvatarContact.jpg";


const Contact = () => {
  return (
    <Grid container stackable verticalAlign="middle">
      <Grid.Row>
        <Grid.Column width={6}>
          <Image circular size="large" src={image} />
        </Grid.Column>
        <Grid.Column floated="right" width={8}>
          <Container text>
            <Header as="h3" style={{ fontSize: "2em" }}>
              Réclamer un problème
            </Header>
            <p style={{ fontSize: "1.33em" }}>
              Contacter l'administrateur pour réclamer un problème
            </p>
            <Button as="a" href="/contact" size="large">
              Réclamer un problème
            </Button>
          </Container>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default Contact;
