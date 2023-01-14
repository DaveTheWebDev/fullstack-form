import React, { useState } from 'react'
import { Button, FormControl } from '@mui/material';
import { Input } from '../atoms/Input/Input';
import { inputs, IUser, userFormConfig } from './UserForm.config';
import { useForm } from 'react-hook-form';
import { useUserEventForm } from '../context/UserEventForm';
import { LocalStorage } from '../../services/LocalStorage';


export const UserForm = () => {
  const { handleSubmit, setError, control, formState: { errors } } = useForm(userFormConfig);
  const { setAddEventState } = useUserEventForm()

  const onSubmit = (data: any) => {
    console.log(data)
    // LocalStorage.set('email', data.email)
    setAddEventState()
  };

  return (
    <FormControl>
      {inputs.map(({ label, required, type, name }) => <Input errors={errors} control={control} setError={setError} key={name} label={label} name={name} required={required} type={type} />)}
      <Button onClick={handleSubmit(onSubmit)} >submit</Button>
    </FormControl>
  )
}
