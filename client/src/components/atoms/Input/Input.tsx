import React from 'react';
import { InputProps } from './Input.types'
import TextField from '@mui/material/TextField';

export const Input: React.FC<InputProps> = ({ label, required, type }) => {
  return <TextField variant="standard" label={label} required={required} type={type} />
}
