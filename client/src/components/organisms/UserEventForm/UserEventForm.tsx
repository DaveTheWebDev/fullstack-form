import React, { useState } from 'react'
import { UserEventFormProps } from "./UserEventForm.types";
import { useUserEventForm } from '../../context/UserEventFormCtx';
import { UserForm } from '../../molecues/UserForm/UserForm';
import { EventForm } from '../../molecues/EventForm/EventForm';

export const UserEventForm = ({ }: UserEventFormProps) => {
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
