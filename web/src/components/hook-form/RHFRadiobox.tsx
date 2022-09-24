import PropTypes from 'prop-types';
// form
import { useFormContext, Controller } from 'react-hook-form';
// @mui
import { Checkbox, FormControlLabel, FormGroup } from '@mui/material';
import { Radio } from '@mui/material';

// ----------------------------------------------------------------------


export function RHFRadiobox({ name, ...other }) {
  const { control } = useFormContext();

  return (
    <FormControlLabel
      control={
        <Controller
          name={name}
          control={control}
          render={({ field }) => <Radio {...field} />}
        />
      }
      {...other}
    />
  );
}
