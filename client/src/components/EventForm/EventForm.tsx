import React, { useState } from 'react'
import { InputProps } from '../atoms/Input/Input.types';
import { EventFormProps } from "./EventForm.types";
import { Button, FormControl } from '@mui/material';
import { useUserEventForm } from '../context/UserEventForm';
import { Input } from '../atoms/Input/Input';
import { UserEventFormState } from "../context/UserEventForm.types";
import { dateInput, eventFormConfig } from './EventForm.config';
import { useForm } from 'react-hook-form';


export const EventForm = ({ }: EventFormProps) => {
  const { handleSubmit, setError, control, formState: { errors } } = useForm(eventFormConfig);
  const onSubmit = (data: any) => console.log(data);
  const { label, name, required, type } = dateInput
  return (
    <FormControl>
      <Input errors={errors} control={control} setError={setError} key={name} label={label} name={name} required={required} type={type} />
      <Button onClick={handleSubmit(onSubmit)} >submit</Button>
    </FormControl>
  )
}
