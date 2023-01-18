import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { UserForm } from 'components/molecules/UserForm/UserForm'
import { UserEventFormProvider } from 'components/context/UserEventFormCtx';
import { IUserEventForm, UserEventFormState } from 'components/context/UserEventFormCtx.types';
import { SCHEMA_DICTIONARY } from 'components/molecules/UserForm/UserForm.config';
import { LocalStorage } from 'services/LocalStorage'
import { userApi } from 'api/UserApi/UserApi';
import { user } from 'mocks/UserForm.mock';

const customRender = (ui: React.ReactNode, providerProps: { value: Partial<IUserEventForm> }) => {
  return render(
    <UserEventFormProvider {...providerProps}>{ui}</UserEventFormProvider>,
  )
}

describe('UserForm', () => {
  let providerProps: { value: Partial<IUserEventForm> }
  beforeEach(() => {
    providerProps = {
      value: { stateType: 'USER_CREATE' as UserEventFormState },
    }
  })
  afterEach(async () => {
    jest.clearAllMocks();
  });

  describe('should display name input', () => {
    it('for a first render', async () => {
      customRender(<UserForm />, { ...providerProps });
      await screen.findAllByLabelText(/name/i)
    });

    it('with empty field error', async () => {
      customRender(<UserForm />, { ...providerProps });
      const createUserButton = await screen.findByText(/create user/i)
      fireEvent.click(createUserButton)
      await screen.findByText(SCHEMA_DICTIONARY.NAME.REQUIRED)
    });

    it('with max length field error', async () => {
      customRender(<UserForm />, { ...providerProps });
      const [nameInput] = await screen.findAllByLabelText<HTMLInputElement>(/name/i)
      const createUserButton = await screen.findByText(/create user/i)
      fireEvent.change(nameInput, { target: { value: 'nameWithLettersNumberGreaterThan32' } })
      fireEvent.click(createUserButton)
      await screen.findByText(SCHEMA_DICTIONARY.NAME.MAX_LENGTH)
    });

  });

  describe('should display surname input', () => {
    it('for a first render', async () => {
      customRender(<UserForm />, { ...providerProps });
      await screen.findAllByLabelText(/surname/i)
    });

    it('with empty field error', async () => {
      customRender(<UserForm />, { ...providerProps });
      const createUserButton = await screen.findByText(/create user/i)
      fireEvent.click(createUserButton)
      await screen.findByText(SCHEMA_DICTIONARY.SURNAME.REQUIRED)
    });

    it('with max length field error', async () => {
      customRender(<UserForm />, { ...providerProps });
      const [surnameInput] = await screen.findAllByLabelText<HTMLInputElement>(/name/i)
      const createUserButton = await screen.findByText(/create user/i)
      fireEvent.change(surnameInput, { target: { value: 'surnameWithLettersNumberGreaterThan32' } })
      fireEvent.click(createUserButton)
      await screen.findByText(SCHEMA_DICTIONARY.NAME.MAX_LENGTH)
    });
  });

  describe('should display email input', () => {
    it('for a first render', async () => {
      customRender(<UserForm />, { ...providerProps });
      await screen.findAllByLabelText(/email/i)
    });

    it('with empty field error', async () => {
      customRender(<UserForm />, { ...providerProps });
      const createUserButton = await screen.findByText(/create user/i)
      fireEvent.click(createUserButton)
      await screen.findByText(SCHEMA_DICTIONARY.EMAIL.REQUIRED)
    });

    it('with max length field error', async () => {
      customRender(<UserForm />, { ...providerProps });
      const [emailInput] = await screen.findAllByLabelText<HTMLInputElement>(/email/i)
      const createUserButton = await screen.findByText(/create user/i)
      fireEvent.change(emailInput, { target: { value: 'correctEmailWithLenghtGreaterThan48Letters@format.com' } })
      fireEvent.click(createUserButton)
      await screen.findByText(SCHEMA_DICTIONARY.EMAIL.MAX_LENGTH)
    });
    it('with correct email error', async () => {
      customRender(<UserForm />, { ...providerProps });
      const [emailInput] = await screen.findAllByLabelText<HTMLInputElement>(/email/i)
      const createUserButton = await screen.findByText(/create user/i)
      fireEvent.change(emailInput, { target: { value: 'notCorrectEmail' } })
      fireEvent.click(createUserButton)
      await screen.findByText(SCHEMA_DICTIONARY.EMAIL.CORRECT)
    });
  });

  describe('should get user info', () => {
    it('from local storage', async () => {
      const getSpy = jest.spyOn(LocalStorage, 'get')

      customRender(<UserForm />, { ...providerProps });
      await waitFor(() => {
        expect(getSpy).toBeCalledTimes(1)
      })

    });

    it('from api call if there is email in local storage', async () => {
      const getFromLocalStorageSpy = jest.spyOn(LocalStorage, 'get').mockReturnValue(user.email)
      const getUserSpy = jest.spyOn(userApi, 'getUser').mockResolvedValue(user)

      customRender(<UserForm />, { ...providerProps });

      await waitFor(() => {
        expect(getFromLocalStorageSpy).toBeCalledTimes(1)
      })
      await waitFor(() => {
        expect(getUserSpy).toBeCalledTimes(1)
      })

    });
  });

  describe('should send user', () => {
    it('after clicked create user', async () => {
      const setSpy = jest.spyOn(LocalStorage, 'set')
      const createUserSpy = jest.spyOn(userApi, 'create').mockResolvedValue(user)

      customRender(<UserForm />, { ...providerProps });
      const [nameInput] = await screen.findAllByLabelText<HTMLInputElement>(/name/i)
      const [surnameInput] = await screen.findAllByLabelText<HTMLInputElement>(/surname/i)
      const [emailInput] = await screen.findAllByLabelText<HTMLInputElement>(/email/i)

      fireEvent.change(nameInput, { target: { value: 'Dawid' } })
      fireEvent.change(surnameInput, { target: { value: 'Antczak' } })
      fireEvent.change(emailInput, { target: { value: 'dawidantczak2@gmail.com' } })

      const createUserButton = await screen.findByText(/create user/i)

      fireEvent.click(createUserButton)

      await waitFor(() => {
        expect(setSpy).toBeCalledTimes(1)
      })
      await waitFor(() => {
        expect(createUserSpy).toBeCalledTimes(1)
      })

    });
  });
})

