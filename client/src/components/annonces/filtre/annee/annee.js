import React, { Component } from "react";
import Slider from "@material-ui/core/Slider";
import { Dropdown, Container } from "semantic-ui-react";
import { ANNEE } from "../../../../config";

function valuetext(value) {
  return `${value}`;
}

class Annee extends Component {
  state = {
    value: "indifferent",
  };

  renderAnneeOptions = (min, max) => {
    let options = [
      { key: "indifferent", text: "Indifférent", value: "indifferent" },
    ];
    let annee;
    for (annee = max; annee >= min; annee--) {
      options.push({ key: annee, text: annee, value: annee });
    }
    return options;
  };

  handelOnChange = (event, data) => {
    this.setState({ value: valuetext(data.value) });
    this.props.changeAnnee(valuetext(data.value));
  };

  render() {
    console.log();
    return (
      <Container style={{ marginTop: "2em" }}>
        <h3>Année</h3>

        <Dropdown
          placeholder="Année"
          onChange={this.handelOnChange}
          search
          fluid
          selection
          options={this.renderAnneeOptions(ANNEE.MIN, ANNEE.MAX)}
        />
      </Container>
    );
  }
}
export default Annee;
