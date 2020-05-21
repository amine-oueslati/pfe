import React, { Component } from "react";

import { Dropdown, Container } from "semantic-ui-react";
import {CARROSSERIE} from '../../../../config'

class Carrosserie extends Component {
  state = {
    carrosserieSelected: {}
  };

  handleDropdownChange = (event, data) => {
    this.setState({ carrosserieSelected: data.value });
    this.props.changeCarrosserie(data.value);
  };

  render() {
    return (
      <Container style={{ marginTop: "2em" }}>
        <h3>Type de carrosserie</h3>
        <Dropdown
        clearable
          placeholder="carrosserie"
          fluid
          search
          multiple
          selection
          options={CARROSSERIE}
          onChange={this.handleDropdownChange}
        />
      </Container>
    );
  }
}

export default Carrosserie;
