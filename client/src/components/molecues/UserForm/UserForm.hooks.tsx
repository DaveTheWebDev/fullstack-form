import React, { useEffect } from 'react'
import { userFormConfig } from './UserForm.config';
import { useForm, SubmitHandler, FieldValues } from 'react-hook-form';
import { useUserEventForm } from '../../context/UserEventFormCtx';
import { LocalStorage } from '../../../services/LocalStorage';
import { userApi } from '../../../api/UserApi/UserApi';
import { useFetch } from '../../../hooks/useFetch';
import { UserBodyDto } from '../../../api/UserApi/UserApi.dto';

export const useUserForm = () => {
  const { handleSubmit, setError, control, formState: { errors } } = useForm(userFormConfig);
  const { setAddEventState } = useUserEventForm()
  const { fetchStatus, initFetch } = useFetch()

  console.log(fetchStatus)
  const onSubmit: SubmitHandler<FieldValues> = async (user) => {
    const response = await initFetch(() => userApi.create(user as UserBodyDto))
    if (!response) return
    LocalStorage.set('email', user.email)
    setAddEventState()
  };

  const createUser = () => {
    return handleSubmit(onSubmit)()
  }

  const checkIfUserExists = async () => {
    const email = LocalStorage.get('email')
    if (!email) return
    const response = await initFetch(() => userApi.getUser(email))
    if (!response) return
    setAddEventState()
  }

  useEffect(() => {
    checkIfUserExists()
  }, [])

  return {
    createUser,
    setError,
    fetchStatus,
    control,
    errors
  }
}