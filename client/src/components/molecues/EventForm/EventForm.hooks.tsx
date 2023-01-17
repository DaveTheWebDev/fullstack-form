import React, { useEffect, useState } from 'react'
import { eventFormConfig } from './EventForm.config';
import { useForm, SubmitHandler, FieldValues, FieldError } from 'react-hook-form';
import { eventApi } from '../../../api/EventApi/EventApi';
import { EventDto } from '../../../api/EventApi/EventApi.dto';
import { LocalStorage } from '../../../services/LocalStorage';
import { useFetch } from '../../../hooks/useFetch';

const sortByDate = (a: EventDto, b: EventDto) => new Date(a.date).getTime() - new Date(b.date).getTime()

export const useEventForm = () => {
  const { handleSubmit, control, formState: { errors }, clearErrors } = useForm(eventFormConfig);
  const [events, setEvents] = useState<EventDto[]>([])
  const [dateError, setDateError] = useState<FieldError | null>(null)
  const { initFetch, fetchStatus } = useFetch()

  console.log(dateError, 'przed')

  const onSubmit: SubmitHandler<FieldValues> = async (event) => {
    console.log(dateError)
    const email = LocalStorage.get('email')
    if (!email) return;
    if (dateError) return;
    const response = await initFetch(() => eventApi.create({ userEmail: email, eventDate: event.eventDate }))
    if (!response) return
    setEvents(prev => [...prev, response].sort(sortByDate))
  }

  const createEvent = () => {
    handleSubmit(onSubmit)()
  }

  const getEvents = async () => {
    const email = LocalStorage.get('email')
    if (!email) return;
    const events = await initFetch(() => eventApi.getAll(email))
    if (events)
      setEvents(events)
  }

  useEffect(() => {
    getEvents()
  }, [])


  return {
    createEvent,
    events,
    fetchStatus,
    setError: setDateError,
    dateError,
    control,
    errors
  }
}