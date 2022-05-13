# React Native Custom Theme
## Custom theme system for react native

[![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://travis-ci.org/joemccann/dillinger)

React native custom theme is the library which enable your app to support multiple themes.
## Supported platforms
- iOS
- Android

## Installation

```sh
npm install react-native-custom-theme
```
The solution is implemented in JavaScript so no native module linking is required

## How to use

Create theme object for light and dark theme ```Colors.js```
```ts
import {Theme} from 'react-native-custom-theme';
export const light: Theme = {
  mode: 'light',
  primary: '#4e9cdb',
  secondary: '#4e9cdb',
  background: '#ffffff',
};

export const dark: Theme = {
  mode: 'dark',
  primary: '#0a5897',
  secondary: '#0a5897',
  background: '#000000',
};

```

Wrap your app within ThemeProvider. ThemeProvider require light and dark theme objects as props
```tsx
import React from 'react';
import ThemeProvider from 'react-native-custom-theme';
import {dark, light} from './Colors';
import Home from './Home';

const App = () => {
  return (
    <ThemeProvider darkTheme={dark} lightTheme={light}>
      <Home />
    </ThemeProvider>
  );
};

export default App;
```

## Authors
- [Balveer Dhanoriya](https://github.com/estbalveer)

## Contributing
Pull requests are most welcome! Please npm run test and npm run lint before push. Don't forget to add a title and a description that explain the issue you're trying to solve and your suggested solution. Screenshots and gifs are VERY helpful. Please do NOT format the files as we are trying to keep a unified syntax and the reviewing process fast and simple.

## License

MIT
