import React from "react";
import {
  Grid,
  Image,
  Segment,
  Container,
  Header,
  Icon,
  Responsive
} from "semantic-ui-react";

import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import EventIcon from "@material-ui/icons/Event";
import LocalGasStationIcon from "@material-ui/icons/LocalGasStation";
import SettingsIcon from "@material-ui/icons/Settings";

const getWidth = () => {
  const isSSR = typeof window === "undefined";
  return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth;
};

const Annonce = (props) => {
  return (
    <Responsive getWidth={getWidth} minWidth={Responsive.onlyTablet.minWidth}>
      <Container style={{ color: "#3e3e3e" }}>
        <Header as="h3" textAlign="center">
          {props.titre}
        </Header>
        <Grid>
          <Grid.Column width={6}>
            <Image
              verticalAlign="middle"
              rounded
              fluid
              centered
              src={props.image}
            />
          </Grid.Column>
          <Grid.Column width={10}>
            <Segment inverted>
              <Grid columns={3} divided>
                <Grid.Row>
                  <Grid.Column textAlign="center">
                    <MonetizationOnIcon />
                    <p>Prix : {props.prix}</p>
                  </Grid.Column>
                  <Grid.Column textAlign="center">
                    <EventIcon />
                    <p>Année : {props.annee}</p>
                  </Grid.Column>
                  <Grid.Column textAlign="center">
                    <Icon name="chess knight" />
                    <p>Puissance : {props.puissance}</p>
                  </Grid.Column>
                </Grid.Row>

                <Grid.Row>
                  <Grid.Column textAlign="center">
                    <LocalGasStationIcon />
                    <p>Energie : {props.energie}</p>
                  </Grid.Column>
                  <Grid.Column textAlign="center">
                    <SettingsIcon />
                    <p>Boite : {props.boite}</p>
                  </Grid.Column>
                  <Grid.Column textAlign="center">
                    <Icon name="road" />
                    <p>Kilomètrage : {props.kms}</p>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Segment>
          </Grid.Column>
        </Grid>
        <Segment>
          <Header>
            {props.marque}-{props.modele}
          </Header>
        </Segment>
        <Segment>
          {props.description ?
            props.description.split("\n").map((item) => {
              return (
                <span key={item}>
                  {item}
                  <br />
                </span>
              )
            }) : null
          }
        </Segment>
      </Container>
    </Responsive>
  );
};

export default Annonce;
