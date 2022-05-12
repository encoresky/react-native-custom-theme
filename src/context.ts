import React from 'react';
import {GlobalContent} from './types';

/**
 * These are default values for theme
 * initially we are applying light them and initializing other variables according to it
 */
const contextDefaultValues: GlobalContent = {
  themeMode: 'light',
  theme: {mode: 'light'},
  isDarkTheme: false,
  setTheme: _ => {},
};

/**
 * theme context
 * It provide real time changes to all app components when theme is changed
 */
export const ThemeContext =
  React.createContext<GlobalContent>(contextDefaultValues);
