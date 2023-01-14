import { FieldErrorsImpl, FieldValues, Control, UseFormSetError } from 'react-hook-form';
import { IUser } from '../../UserForm/UserForm.config';
import { IEvent } from '../../EventForm/EventForm.config';

export interface InputProps extends InputMock {
  errors: Partial<FieldErrorsImpl<FieldValues>>
  control: Control<FieldValues, unknown>
  setError: UseFormSetError<FieldValues>
}

export interface InputMock {
  label: string;
  name: 'name' | 'surname' | 'email' | 'eventDate';
  type: 'email' | 'text' | 'date';
  required: boolean;
}