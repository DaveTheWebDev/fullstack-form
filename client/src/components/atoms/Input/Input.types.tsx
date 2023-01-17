import { FieldErrorsImpl, FieldValues, Control, FieldError } from 'react-hook-form';
import { Dispatch, SetStateAction } from "react";
export interface InputProps extends InputMock {
  errors: Partial<FieldErrorsImpl<FieldValues>>
  control: Control<FieldValues, unknown>
  setError?: Dispatch<SetStateAction<FieldError | null>>
  disabled: boolean
}

export interface InputMock {
  label: string;
  name: 'name' | 'surname' | 'email' | 'eventDate';
  type: 'email' | 'text' | 'date';
  required: boolean;
}