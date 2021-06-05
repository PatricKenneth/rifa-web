import { ThemeProvider } from '@material-ui/styles';
import React from 'react';
import PageLayout from './components/pageLayout';
import theme from './theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <PageLayout />
    </ThemeProvider>
  );
}

export default App;
