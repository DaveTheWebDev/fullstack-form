import React, { useState } from 'react'
import { Button, FormControl } from '@mui/material';
import { Input } from '../../atoms/Input/Input';
import { inputs, IUser, userFormConfig } from './UserForm.config';
import { useForm, SubmitHandler, FieldValues } from 'react-hook-form';
import { useUserEventForm } from '../../context/UserEventFormCtx';
import { LocalStorage } from '../../../services/LocalStorage';
import { userApi } from '../../../api/UserApi/UserApi';
import { useFetch } from '../../../hooks/useFetch';
import { UserBodyDto } from '../../../api/UserApi/UserApi.dto';
import { useUserForm } from './UserForm.hooks';
import { Spinner } from '../../atoms/Spinner/Spinner';


export const UserForm = () => {
  const { control, createUser, errors, fetchStatus } = useUserForm()
  const isSubmitting = fetchStatus.type === 'LOADING'

  if (isSubmitting) {
    return <Spinner />
  }
  return (
    <FormControl margin='normal'>
      {inputs.map(({ label, required, type, name }) =>
        <Input
          key={name}
          errors={errors}
          control={control}
          name={name}
          label={label}
          required={required}
          type={type}
          disabled={isSubmitting}
        />
      )}
      {fetchStatus.type === 'ERROR' &&
        fetchStatus.error.type !== 'NOT_FOUND' &&
        <small style={{ color: '#f44336' }}>{fetchStatus.error.message}</small>}
      <Button style={{ marginTop: '15px' }} variant='contained' disabled={isSubmitting} onClick={createUser}>Create User</Button>
    </FormControl>
  )
}
