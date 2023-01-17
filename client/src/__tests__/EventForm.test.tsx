import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { UserEventFormProvider } from 'components/context/UserEventFormCtx';
import { IUserEventForm, UserEventFormState } from 'components/context/UserEventFormCtx.types';
import { EventForm } from 'components/molecules/EventForm/EventForm';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DATE_PICKER_ERRORS } from 'components/atoms/Input/Input.utils';

const customRender = (ui: React.ReactNode, providerProps: { value: Partial<IUserEventForm> }) => {
  return render(
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <UserEventFormProvider {...providerProps}>{ui}</UserEventFormProvider>
    </LocalizationProvider>
  )
}


describe('EventForm', () => {
  let providerProps: { value: Partial<IUserEventForm> }
  let today: Date
  let dayFormatted: string
  let monthFormatted: string
  let todayFormatted: string

  beforeEach(() => {
    providerProps = {
      value: { stateType: 'ADD_EVENTS' as UserEventFormState },
    }
    today = new Date()
    dayFormatted = today.getDate() > 9 ? `${today.getDate()}` : `0${today.getDate() + 1}`
    monthFormatted = today.getMonth() + 1 > 9 ? `${today.getMonth() + 1}` : `0${today.getMonth() + 1}`
    todayFormatted = `${dayFormatted}.${monthFormatted}.${today.getFullYear()}`
  })

  describe('should display date input', () => {
    it('for a first render with today date', async () => {
      customRender(<EventForm />, { ...providerProps });

      await screen.findAllByLabelText(/event date/i)
      await screen.findByDisplayValue(todayFormatted)
    });

    it('with today date after removing every character from input', async () => {
      customRender(<EventForm />, { ...providerProps });
      const [dateInput] = await screen.findAllByLabelText(/event date/i)
      fireEvent.change(dateInput, { target: { value: '' } })
      await screen.findByDisplayValue(todayFormatted)
    });

    it('with min date error', async () => {
      customRender(<EventForm />, { ...providerProps });
      const [dateInput] = await screen.findAllByLabelText(/event date/i)
      const yesterday = Number(dayFormatted) - 1
      fireEvent.change(dateInput, { target: { value: `${yesterday}.${monthFormatted}.${today.getFullYear()}` } })
      await screen.findByText(DATE_PICKER_ERRORS.MIN_DATE)
    });

    it('with max date error', async () => {
      customRender(<EventForm />, { ...providerProps });
      const [dateInput] = await screen.findAllByLabelText(/event date/i)
      fireEvent.change(dateInput, { target: { value: `${dayFormatted}.${monthFormatted}.${today.getFullYear() + 11}` } })
      await screen.findByText(DATE_PICKER_ERRORS.MAX_DATE)
    });

    it('with incorrect date error', async () => {
      customRender(<EventForm />, { ...providerProps });
      const [dateInput] = await screen.findAllByLabelText(/event date/i)
      fireEvent.change(dateInput, { target: { value: `${dayFormatted}.${monthFormatted}` } })
      await screen.findByText(DATE_PICKER_ERRORS.INVALID_DATE)
    });

  });

})

