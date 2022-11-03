import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { theme } from './theme';
import {
  useFonts as useRaleway,
  Raleway_400Regular,
} from '@expo-google-fonts/raleway';
import { ThemeProvider } from 'styled-components';
import { Provider } from 'react-redux';
import { store } from './reduxStore/store';
import { MainContainer } from './components/mainContainer/mainContainer.component';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [ralewayLoaded] = useRaleway({
    Raleway_400Regular,
  });

  //Checking for Font Load
  if (!ralewayLoaded) {
    return null;
  }

  return (
    <>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <MainContainer />
        </Provider>
      </ThemeProvider>
      <StatusBar style="auto" />
    </>
  );
}

export default App;
