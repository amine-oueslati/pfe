import React from "react";

import { Button, Grid, Header, Image } from "semantic-ui-react";
import image from "../../../../assets/AvaterVente.jpg";

const Vente = () => {
  return (
    <Grid container stackable verticalAlign="middle">
      <Grid.Row>
        <Grid.Column width={8}>
          <Header as="h3" textAlign="center" style={{ fontSize: "2.5em" }}>
            Vente et achat de voitures
          </Header>
          <p style={{ fontSize: "1.5em", textAlign: "center" }}>
            Vente et achat de voitures neuves ou occasions.
          </p>
          <p style={{ fontSize: "1.5em", textAlign: "center" }}>
            vous pouvez avoir des conseils aussi.
          </p>
        </Grid.Column>
        <Grid.Column floated="right" width={6}>
          <Image circular size="large" src={image} />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column textAlign="center">
          <Button size="huge">Chercher une voiture</Button>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};


export default Vente