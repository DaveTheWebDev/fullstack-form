import React from 'react';
import { Controller } from "react-hook-form";
import TextField from '@mui/material/TextField';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { InputProps } from './Input.types'
import { getError, validateDate } from './Input.utils';

const minDate = new Date();
const minDateYear = minDate.getFullYear()
const minDateMonth = minDate.getMonth()
const maxDate = new Date(minDateYear + 10, minDateMonth)

export const Input: React.FC<InputProps> = ({ label, required, type, name, control, errors, setError, disabled }) => {
  const { isError, message } = getError(errors[name])


  return <Controller
    name={name}
    control={control}
    render={({ field: { onChange, value } }) => (
      type === 'date' ?
        <DatePicker
          onChange={(value) => onChange(validateDate(value, setError))}
          disabled={disabled}
          value={value}
          label={label}
          inputFormat="dd.MM.yyyy"
          minDate={minDate}
          maxDate={maxDate}
          renderInput={(props) => <TextField {...props} />}
        />
        :
        <TextField
          margin='normal'
          disabled={disabled}
          onChange={onChange}
          error={isError}
          helperText={message}
          value={value}
          label={label}
          required={required}
          type={type}
        />
    )}
  />
}
