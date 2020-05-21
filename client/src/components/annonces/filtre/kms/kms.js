import React from "react";

import Slider from "@material-ui/core/Slider";

import { Input, Container, Checkbox } from "semantic-ui-react";

import { KMS } from "../../../../config";

function valuetext(value) {
  return `${value}`;
}

const Kms = (props) => {
  const [minError, setMinEror] = React.useState(false);
  const [maxError, setMaxEror] = React.useState(false);

  const [value, setValue] = React.useState([KMS.MIN, KMS.MAX]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    setMinEror(false);
    setMaxEror(false);
    props.changeKms(valuetext(newValue));
  };

  const handleMinInputChange = (event) => {
    if (Number(event.target.value)) {
      setValue([Number(event.target.value), value[1]]);
      props.changeKms(valuetext([Number(event.target.value), value[1]]));
      setMinEror(false);
    } else setMinEror(true);
  };
  const handleMaxInputChange = (event) => {
    if (Number(event.target.value)) {
      setValue([value[0], Number(event.target.value)]);
      props.changeKms(valuetext([value[0], Number(event.target.value)]));
      setMaxEror(false);
    } else setMaxEror(true);
  };

  const handleCheckboxChange = (event) => {
    setValue([KMS.MIN, KMS.MAX]);
    props.changeKms(valuetext([KMS.MIN, KMS.MAX]));
  };

  const handleBlur = () => {
    if (value[0] < KMS.MIN || value[0] > KMS.MAX || value[0] > value[1]) {
      setValue([KMS.MIN, value[1]]);
      props.changeKms(valuetext([KMS.MIN, value[1]]));
    } else if (value[1] > KMS.MAX) {
      setValue([value[0], KMS.MAX]);
      props.changeKms(valuetext([value[0], KMS.MAX]));
    }
  };

  return (
    <Container style={{ marginTop: "2em" }}>
      <h3>Kilomètrage</h3>
      <Slider
        min={KMS.MIN}
        max={KMS.MAX}
        step={10}
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        aria-labelledby="range-slider"
        getAriaValueText={valuetext}
      />

      <p>min</p>
      <Input
        label="Milles Kms"
        labelPosition="right"
        fluid
        error={minError}
        value={value[0]}
        onChange={handleMinInputChange}
        onBlur={handleBlur}
      />
      <p>max</p>
      <Input
        label="Milles Kms"
        labelPosition="right"
        fluid
        error={maxError}
        value={value[1]}
        onChange={handleMaxInputChange}
        onBlur={handleBlur}
      />
      <p />
      <Checkbox
        label="Indifférent"
        value="indifferent"
        checked={value[0] === KMS.MIN && value[1] === KMS.MAX}
        onClick={handleCheckboxChange}
      />
    </Container>
  );
};

export default Kms;
