import * as React from 'react';
import {Appearance, useColorScheme} from 'react-native';
import {dark, light} from './Colors';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {DEVICE_THEME, THEME_MODE_DARK, THEME_MODE_LIGHT} from './constants';
import {ThemeContext} from './context';
import {Theme} from './types';

type Props = {
  theme?: Theme;
  children?: React.ReactNode;
  onReady?: () => void;
};

const ThemeProvider = ({children}: Props) => {
  const [theme, setTheme] = React.useState(light);
  const [themeMode, setThemeMode] = React.useState(THEME_MODE_LIGHT);
  const colorScheme = useColorScheme();

  React.useEffect(() => {
    AsyncStorage.getItem('theme').then(newTheme => {
      onChangeTheme(newTheme, colorScheme);
    });
  }, [colorScheme]);
  const changeThemeMemo = React.useMemo(
    () => ({
      changeTheme: async (newTheme: string) => {
        const deviceColorScheme = Appearance.getColorScheme();
        onChangeTheme(newTheme, deviceColorScheme);
      },
    }),
    [],
  );
  const onChangeTheme = (
    newTheme: string | null,
    deviceColorScheme: string | null | undefined,
  ) => {
    if (newTheme === DEVICE_THEME) {
      setThemeMode(DEVICE_THEME);
      setTheme(deviceColorScheme === 'dark' ? dark : light);
    } else if (newTheme === THEME_MODE_DARK) {
      setThemeMode(THEME_MODE_DARK);
      setTheme(dark);
    } else {
      setThemeMode(THEME_MODE_LIGHT);
      setTheme(light);
    }
    AsyncStorage.setItem('theme', newTheme ?? '');
  };

  return (
    <ThemeContext.Provider
      value={{
        themeMode,
        theme,
        changeThemeMemo,
        isDarkTheme: theme.mode === THEME_MODE_DARK,
      }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
