import { useEffect, useState } from 'react'
import { useForm, SubmitHandler, FieldValues, FieldError } from 'react-hook-form';
import { eventApi } from 'api/EventApi/EventApi';
import { EventDto } from 'api/EventApi/EventApi.dto';
import { LocalStorage } from 'services/LocalStorage';
import { useFetch } from 'hooks/useFetch';
import { eventFormConfig } from './EventForm.config';
import { useUserEventForm } from 'components/context/UserEventFormCtx';

const sortByDate = (a: EventDto, b: EventDto) => new Date(a.date).getTime() - new Date(b.date).getTime()

export const useEventForm = () => {
  const { handleSubmit, control, formState: { errors } } = useForm(eventFormConfig);
  const [events, setEvents] = useState<EventDto[]>([])
  const [dateError, setDateError] = useState<FieldError | null>(null)
  const { initFetch, fetchStatus } = useFetch()
  const { setCreateUserState } = useUserEventForm()

  const onSubmit: SubmitHandler<FieldValues> = async (event) => {
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

  const createAnotherUser = () => {
    LocalStorage.set('email', "")
    setCreateUserState()
  }

  const getEvents = async () => {
    const email = LocalStorage.get('email')
    if (!email) return;
    const events = await initFetch(() => eventApi.getAll(email))
    if (events) setEvents(events)
  }

  useEffect(() => {
    getEvents()
    // eslint-disable-next-line
  }, [])


  return {
    createEvent,
    events,
    fetchStatus,
    setError: setDateError,
    dateError,
    control,
    errors,
    createAnotherUser
  }
}