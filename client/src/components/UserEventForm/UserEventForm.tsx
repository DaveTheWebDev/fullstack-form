import React, { useState } from 'react'
import { Input } from '../atoms/Input/Input';
import { InputProps } from '../atoms/Input/Input.types';
import { UserEventFormProps } from "./UserEventForm.types";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { FormControl, TextField } from '@mui/material';
const inputs: InputProps[] = [
  {
    label: 'Name',
    required: true,
    type: 'text'
  },
  {
    label: 'Surname',
    required: true,
    type: 'text'
  },
  {
    label: 'Email',
    required: true,
    type: 'email'
  },
]

export const UserEventForm = ({ }: UserEventFormProps) => {
  const [state, setState] = useState<any>(new Date())
  console.log(state)
  return <FormControl>
    {inputs.map(({ label, required, type }) => <Input label={label} required={required} type={type} />)}
    <DatePicker value={state} onChange={(newValue) => {
      setState(newValue);
    }}
      renderInput={(params) => <TextField {...params} />} />
  </FormControl>
}
