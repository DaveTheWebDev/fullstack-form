import React from 'react';
import { InputProps } from './Input.types'
import TextField from '@mui/material/TextField';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Controller } from "react-hook-form";
import { useUserEventForm } from '../../context/UserEventForm';
import { datePickerErrorsHandler, getError } from './Input.utils';

const minDate = new Date();
const minDateYear = minDate.getFullYear()
const minDateMonth = minDate.getMonth()
const maxDate = new Date(minDateYear + 10, minDateMonth)

export const Input: React.FC<InputProps> = ({ label, required, type, name, control, errors, setError }) => {
  const { isError, message } = getError(errors[name])


  return <Controller
    name={name}
    control={control}
    render={({ field: { onChange, value } }) => (
      type === 'date' ?
        <DatePicker onChange={onChange} value={value} onError={(reason) => datePickerErrorsHandler(reason, setError)} inputFormat="dd-MM-yyyy" minDate={minDate} maxDate={maxDate} renderInput={(props) => <TextField helperText='Cos' {...props} />} />
        :
        <TextField onChange={onChange} error={isError} helperText={message} value={value} label={label} required={required} type={type} />
    )}
  />
}
