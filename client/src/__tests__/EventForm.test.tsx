import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { UserEventFormProvider } from 'components/context/UserEventFormCtx';
import { IUserEventForm, UserEventFormState } from 'components/context/UserEventFormCtx.types';
import { EventForm } from 'components/molecules/EventForm/EventForm';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DATE_PICKER_ERRORS } from 'components/atoms/Input/Input.utils';
import { eventApi } from 'api/EventApi/EventApi';
import { events } from 'mocks/EventForm.mock';
import { getFormattedDate } from 'utils/getFormattedDate';
import { LocalStorage } from 'services/LocalStorage';
import { user } from 'mocks/UserForm.mock';

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
    const { date, day, month } = getFormattedDate(today)
    dayFormatted = day
    monthFormatted = month
    todayFormatted = date
  })
  afterEach(async () => {
    jest.clearAllMocks();
  });

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
  describe('should display', () => {
    it('empty events text', async () => {
      jest.spyOn(eventApi, 'getAll').mockResolvedValue([])
      customRender(<EventForm />, { ...providerProps });
      await screen.findByText(/Add your first event!/i)
    });

    it('resolved events', async () => {
      const localStorageSpy = jest.spyOn(LocalStorage, 'get').mockReturnValueOnce(user.email)
      const getAllEventsSpy = jest.spyOn(eventApi, 'getAll').mockResolvedValueOnce(events)

      customRender(<EventForm />, { ...providerProps });

      events.forEach(async (event) => {
        const { date } = getFormattedDate(event.date)
        await screen.findByText(date)
      })

      expect(localStorageSpy).toBeCalledTimes(1)
      expect(getAllEventsSpy).toBeCalledTimes(1)
    });
  });

  describe.skip('should create event', () => {
    it('after clicked add event', async () => {
      const localStorageSpy = jest.spyOn(LocalStorage, 'get').mockReturnValueOnce(user.email)
      const addEventSpy = jest.spyOn(eventApi, 'create').mockResolvedValueOnce(events[0])
      customRender(<EventForm />, { ...providerProps });
      const [dateInput] = await screen.findAllByLabelText(/event date/i)
      const { date } = getFormattedDate(new Date(), 2)
      fireEvent.change(dateInput, { target: { value: date } })

      const addEventButton = await screen.findByText(/add event/i)
      fireEvent.click(addEventButton)

      // await screen.findByText(date)
      expect(localStorageSpy).toBeCalledTimes(1)
      expect(addEventSpy).toBeCalledTimes(1)
    });
  });
})

