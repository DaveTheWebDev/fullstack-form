import React from 'react'
import { Button, FormControl } from '@mui/material';
import { inputs } from './UserForm.config';
import { useUserForm } from './UserForm.hooks';
import { Input } from 'components/atoms/Input/Input';
import { Spinner } from 'components/atoms/Spinner/Spinner';

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
