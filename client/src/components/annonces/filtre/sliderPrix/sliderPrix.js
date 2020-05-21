import React from "react";

import Slider from "@material-ui/core/Slider";

import { Input, Container, Checkbox } from "semantic-ui-react";

import { PRIX } from "../../../../config";

function valuetext(value) {
  return `${value}`;
}

const SliderPrix = (props) => {
  const [minError, setMinEror] = React.useState(false);
  const [maxError, setMaxEror] = React.useState(false);

  const [value, setValue] = React.useState([PRIX.MIN, PRIX.MAX]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    setMinEror(false);
    setMaxEror(false);
    props.changePrix(valuetext(newValue));
  };

  const handleMinInputChange = (event) => {
    if (Number(event.target.value)) {
      setValue([Number(event.target.value), value[1]]);
      props.changePrix(valuetext([Number(event.target.value), value[1]]));
      setMinEror(false);
    } else setMinEror(true);
  };

  const handleMaxInputChange = (event) => {
    if (Number(event.target.value)) {
      setValue([value[0], Number(event.target.value)]);
      props.changePrix(valuetext([value[0], Number(event.target.value)]));
      setMaxEror(false);
    } else setMaxEror(true);
  };

  const handleCheckboxChange = (event) => {
    setValue([PRIX.MIN, PRIX.MAX]);
    props.changePrix(valuetext([PRIX.MIN, PRIX.MAX]));
  };

  const handleBlur = () => {
    if (value[0] < PRIX.MIN || value[0] > PRIX.MAX || value[0] > value[1]) {
      setValue([PRIX.MIN, PRIX.MAX]);
      props.changePrix(valuetext([PRIX.MIN, PRIX.MAX]));
    } else if (value[1] > PRIX.MAX) {
      setValue([value[0], PRIX.MAX]);
      props.changePrix(valuetext([value[0], PRIX.MAX]));
    }
  };

  return (
    <Container style={{ marginTop: "2em" }}>
      <h3>Prix</h3>
      <Slider
        min={PRIX.MIN}
        max={PRIX.MAX}
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        aria-labelledby="range-slider"
        getAriaValueText={valuetext}
      />
      <p>min</p>
      <Input
        label={{ tag: true, content: "Milles Dinars" }}
        labelPosition="right"
        fluid
        error={minError}
        value={value[0]}
        onChange={handleMinInputChange}
        onBlur={handleBlur}
      />
      <p>max</p>
      <Input
        label={{ tag: true, content: "Milles Dinars" }}
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
        checked={value[0] === PRIX.MIN && value[1] === PRIX.MAX}
        onClick={handleCheckboxChange}
      />
    </Container>
  );
};

export default SliderPrix;
