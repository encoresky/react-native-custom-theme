import * as React from 'react';
import {Appearance, useColorScheme} from 'react-native';
import {dark, light} from './Colors';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {DEVICE_THEME, THEME_MODE_DARK, THEME_MODE_LIGHT} from './constants';
import {ThemeContext} from './context';
import {GlobalContent, ThemeProviderProps} from './types';

const ThemeProvider = ({children}: ThemeProviderProps) => {
  const colorScheme = useColorScheme();

  const [theme, setTheme] = React.useState(light);
  const [themeMode, setThemeMode] = React.useState(THEME_MODE_LIGHT);

  React.useEffect(() => {
    AsyncStorage.getItem('theme').then(newTheme => {
      onChangeTheme(newTheme ?? 'light', colorScheme);
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
    newTheme: string,
    deviceColorScheme: string | null | undefined,
  ) => {
    setThemeMode(newTheme);
    AsyncStorage.setItem('theme', newTheme ?? '');

    if (newTheme === DEVICE_THEME) {
      setTheme(deviceColorScheme === 'dark' ? dark : light);
    } else {
      setTheme(newTheme === THEME_MODE_DARK ? dark : light);
    }
  };

  const globalContent: GlobalContent = {
    themeMode: themeMode,
    theme: theme,
    setTheme: changeThemeMemo.changeTheme,
    isDarkTheme: theme.mode === THEME_MODE_DARK,
  };

  return (
    <ThemeContext.Provider value={globalContent}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
