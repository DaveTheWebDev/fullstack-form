import React from 'react'
import { Button, FormControl } from '@mui/material';
import { Input } from 'components/atoms/Input/Input';
import { Grid } from 'components/atoms/Grid/Grid';
import { dateInput } from './EventForm.config';
import { useEventForm } from './EventForm.hooks';


export const EventForm = () => {
  const { control, createEvent, errors, events, fetchStatus, setError, dateError } = useEventForm()
  const { label, name, required, type } = dateInput
  const isSubmitting = fetchStatus.type === 'LOADING'

  return (
    <>
      <FormControl>
        <Input
          disabled={isSubmitting}
          errors={errors}
          control={control}
          setError={setError}
          key={name}
          label={label}
          name={name}
          required={required}
          type={type}
        />
        {fetchStatus.type === 'ERROR' && <small style={{ color: '#f44336', marginTop: '5px' }}>{fetchStatus.error.message}</small>}
        {dateError && <small style={{ color: '#f44336', marginTop: '5px' }}>{dateError.message}</small>}
        <Button
          disabled={isSubmitting}
          style={{ marginTop: '15px' }}
          onClick={createEvent}
          variant='contained' >Add event</Button>
      </FormControl>
      <Grid loading={isSubmitting} events={events} />
    </>
  )
}
