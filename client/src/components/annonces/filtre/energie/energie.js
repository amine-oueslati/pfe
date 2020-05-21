import React, { Component } from "react";
import { Dropdown, Container } from "semantic-ui-react";
import { ENERGIE } from "../../../../config";

class Energie extends Component {
  state = {
    energieSelected: "indifferent",
  };

  handleDropdownChange = (event, data) => {
    this.setState({ energieSelected: data.value });
    this.props.changeEnergie(data.value);
  };

  render() {
    return (
      <Container style={{ marginTop: "2em" }}>
        <h3>Type d'énergie</h3>
        <Dropdown
          clearable
          placeholder="type d'énergie"
          fluid
          search
          multiple
          selection
          options={ENERGIE}
          onChange={this.handleDropdownChange}
        />
      </Container>
    );
  }
}

export default Energie;
