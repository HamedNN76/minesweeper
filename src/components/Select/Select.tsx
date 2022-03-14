import React from 'react';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select as MaterialSelect,
  SelectChangeEvent,
} from '@mui/material';

type DataItem = {
  name: string;
  value: string;
};

export type SelectProps = {
  onChange: (data: SelectChangeEvent) => void;
  data: DataItem[];
  value: string;
  label: string;
};

export function Select(props: SelectProps) {
  const {data, onChange, value, label} = props;

  if (!data.length) {
    return null;
  }

  return (
    <FormControl fullWidth>
      <InputLabel id="level-select-label">{label}</InputLabel>
      <MaterialSelect
        labelId="level-select-label"
        id="level-select"
        value={value}
        label="Level"
        onChange={onChange}
      >
        {data.map((dataItem, index) => {
          return (
            <MenuItem key={index} value={dataItem.value}>
              {dataItem.name}
            </MenuItem>
          );
        })}
      </MaterialSelect>
    </FormControl>
  );
}
