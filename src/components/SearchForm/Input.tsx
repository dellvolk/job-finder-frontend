import FormControl from "@mui/material/FormControl";
import React, { ReactElement } from "react";
import styled from "styled-components";
import MuiInput, { InputProps } from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";

interface IInputProps extends Omit<InputProps, "onChange"> {
  value: string | number,
  onChange: (v: string) => void,
  label: string
  endAdornment?: ReactElement | string
  type?: string
}

const Input: React.FC<IInputProps> = ({ onChange, value, label = "Some", type = 'number', endAdornment, ...props}) => {

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  const _props = endAdornment ? ({ endAdornment }) : ({});

  return (
    // @ts-ignore
    <InputStyled variant="standard" color="violet">
      <InputLabel id={`demo-simple-input-label-${label}`}>{label}</InputLabel>
      <MuiInput
        // labelId={`demo-simple-select-label-${label}`}
        id={`demo-simple-input-${label}`}
        value={value}
        onChange={handleChange}
        // endAdornment={<InputAdornment position="end">m<sup>2</sup></InputAdornment>}
        aria-describedby="standard-weight-helper-text"
        type={type}
        {..._props}
        {...props}
        inputProps={{
          "aria-label": "meter"
        }}
      />
    </InputStyled>
  );
};

const InputStyled = styled(FormControl)`
`;

export default (Input);
