import React from 'react'
import { useUserEventForm } from 'components/context/UserEventFormCtx';
import { UserForm } from 'components/molecules/UserForm/UserForm';
import { EventForm } from 'components/molecules/EventForm/EventForm';

export const UserEventForm = () => {
  const { stateType } = useUserEventForm()

  switch (stateType) {
    case 'CREATE_USER':
      return <UserForm />
    case 'ADD_EVENTS':
      return <EventForm />
    default:
      return null
  }

}
