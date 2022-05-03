import React from 'react';
import ThemeProvider, {Theme} from 'react-native-dark-mode';
import Home from './Home';

const App = () => {
  return (
    <ThemeProvider>
      <Home />;
    </ThemeProvider>
  );
};

export default App;
