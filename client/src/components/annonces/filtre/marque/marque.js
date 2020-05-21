import React, { Component } from "react";
import axios from "axios";
import { Dropdown, Container } from "semantic-ui-react";

class Marque extends Component {
  state = {
    marques: [],
    marquesSelected: [],
    marquesSelectedData: [],
  };

  componentDidMount() {
    axios.get("/api/getMarques").then((response) => {
      this.setState({ marques: response.data });
    });
  }

  handleMarquesDropdownChange = (event, data) => {
    this.setState({ marquesSelected: data.value });

    let aux = [];
    data.value.map((brand) => {
      aux.push(this.state.marques.find((marque) => marque.brand === brand));
    });
    this.setState({ marquesSelectedData: aux });
    this.props.changeMarque(aux);
  };

  render() {
    let marquesOptions = [];
    this.state.marques.map((item) => {
      marquesOptions.push({
        key: item._id,
        text: item.brand,
        value: item.brand,
      });
    });

    return (
      <Container style={{ marginTop: "2em" }}>
        <h3>Marque</h3>
        <Dropdown
          clearable
          placeholder="Marque"
          fluid
          search
          multiple
          selection
          options={marquesOptions}
          onChange={this.handleMarquesDropdownChange}
        />
      </Container>
    );
  }
}

export default Marque;
