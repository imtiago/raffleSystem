import PropTypes from 'prop-types';
// form
import { useFormContext, Controller } from 'react-hook-form';
// @mui
import { TextField } from '@mui/material';
import InputMask from "react-input-mask";


// ----------------------------------------------------------------------

RHFTextFieldMask.propTypes = {
  name: PropTypes.string,
  mask: PropTypes.string,
};

export default function RHFTextFieldMask({ name,mask, ...other }) {
  const { control } = useFormContext();

  return (
    <Controller
    name={name}
    defaultValue=""
    control={control}
    render={({ field, fieldState: { error } }) => (
      <InputMask
      style={{
        width: '90%',
        marginLeft: 'auto',
        marginRight: 'auto',            
        paddingBottom: 0,
        marginTop: 0,
        fontWeight: 500
    }}
      mask={mask}
          {...field}
          // fullWidth
          value={typeof field.value === 'number' && field.value === 0 ? '' : field.value}
          // error={!!error}
          // helperText={error?.message}
          {...other}
        />
      )}
    />
  );
}
