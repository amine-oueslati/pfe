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
              Vous voulez vendre une voiture
            </Header>
            <p style={{ fontSize: "1.33em" }}>
              Notre société achete des voitures neuves ou occasions.
            </p>
            <Button as="a" size="large">
              envoyer un offre
            </Button>

            <Divider
              as="h4"
              className="header"
              horizontal
              style={{ margin: "3em 0em", textTransform: "uppercase" }}
            >
              ou bien
            </Divider>

            <Header as="h3" style={{ fontSize: "2em" }}>
              Réclamer un problème
            </Header>
            <p style={{ fontSize: "1.33em" }}>
              Contacter l'administrateur pour réclamer un problème
            </p>
            <Button as="a" size="large">
              Réclamer un problème
            </Button>
          </Container>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default Contact;
