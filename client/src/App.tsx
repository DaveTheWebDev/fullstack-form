import React from 'react';
import './App.css';
import { UserEventForm } from './components/organisms/UserEventForm/UserEventForm';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import type { } from '@mui/x-date-pickers/themeAugmentation';
import { UserEventFormProvider } from './components/context/UserEventFormCtx';
import { Form } from './components/template/Form/Form';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
  components: {
    MuiDatePicker: {
      styleOverrides: {
        root: {
          backgroundColor: 'red',
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <CssBaseline />
        <div className="App">
          <UserEventFormProvider>
            <Form />
          </UserEventFormProvider>
        </div>
      </LocalizationProvider>

    </ThemeProvider>

  );
}

export default App;