import React from "react";
import styled from "styled-components";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { IOptions } from "../../app/interfaces";
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

interface ISelectProps {
  options?: string[],
  onChange: (value: string) => void
  label: string
  value?: string
}

const SelectIndex: React.FC<ISelectProps> = ({ value: _value, options: _options, label, onChange }) => {
  const [value, setValue] = React.useState("");

  React.useEffect(() => {
    if (typeof _value === "string") {
      setValue(_value);
    }
  }, [_value]);

  const handleChange = (event: SelectChangeEvent) => {
    setValue(event.target.value);
    onChange(event.target.value);
  };

  const options = React.useMemo(() => {
    if (!_options) return [];
    return _options.map(i => ({ value: i, label: i }));
  }, [_options]) as IOptions;

  return (
    // @ts-ignore
    <FormControl fullWidth variant="standard" color="violet">
      <InputLabel id={`demo-simple-select-label-${label}`}>{label}</InputLabel>
      <Select
        labelId={`demo-simple-select-label-${label}`}
        id={`demo-simple-select-${label}`}
        value={value}
        label={label}
        autoWidth
        // @ts-ignore
        onChange={handleChange}
      >
        {options.map(i => (
          <MenuItem key={i.value} value={i.value}>
            {i.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

const SelectStyled = styled(FormControl)`
`;

export default (SelectIndex);
