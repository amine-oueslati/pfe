import React, { Component } from "react";

import { Dropdown, Container } from "semantic-ui-react";

class Modele extends Component {
  state = {
    modelesSelected: [],
  };

  handleDropdownChange = (event, data) => {
    this.setState({ modelesSelected: data.value });
    this.props.changeModele(data.value);
  };

  render() {
    let modelsOptions = [];
    this.props.marquesSelected.map((item) => {
      item.models.map((model) => {
        modelsOptions.push({
          key: model,
          text: model,
          value: model,
        });
      });
    });
    return (
      <Container style={{ marginTop: "1em" }}>
        <h3>Modèle</h3>
        <Dropdown
          clearable
          placeholder="Modèle"
          fluid
          search
          selection
          multiple
          options={modelsOptions}
          onChange={this.handleDropdownChange}
        />
      </Container>
    );
  }
}

export default Modele;
