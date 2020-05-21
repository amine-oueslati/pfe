import React, { Component } from "react";
import { Form, Checkbox, Container } from "semantic-ui-react";

class Energie extends Component {
  state = {
    boiteSelected: "indifferent"
  };
  handleChange = (e, { value }) => {
    this.setState({ boiteSelected: value });
    this.props.changeBoite(value);
  };

  render() {
    return (
      <Container style={{ marginTop: "2em" }}>
        <h3>Type de Boîte</h3>
        <Form>
          <Form.Field>
            <Checkbox
              radio
              label="Manuelle"
              name="checkboxRadioGroup"
              value="manuelle"
              checked={this.state.boiteSelected === "manuelle"}
              onChange={this.handleChange}
            />
          </Form.Field>
          <Form.Field>
            <Checkbox
              radio
              label="Automatique"
              name="checkboxRadioGroup"
              value="automatique"
              checked={this.state.boiteSelected === "automatique"}
              onChange={this.handleChange}
            />
          </Form.Field>
          <Form.Field>
            <Checkbox
              radio
              label="Indifférent"
              name="checkboxRadioGroup"
              value="indifferent"
              checked={this.state.boiteSelected === "indifferent"}
              onChange={this.handleChange}
            />
          </Form.Field>
        </Form>
      </Container>
    );
  }
}

export default Energie;
