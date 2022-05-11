import React from 'react';
import {light} from './Colors';
import {GlobalContent} from './types';

/**
 * These are default values for theme
 * initially we are applying light them and initializing other variables according to it
 */
const contextDefaultValues: GlobalContent = {
  themeMode: 'light',
  theme: light,
  isDarkTheme: false,
  changeThemeMemo: null,
};

/**
 * theme context
 * It provide real time changes to all app components when theme is changed
 */
export const ThemeContext =
  React.createContext<GlobalContent>(contextDefaultValues);
