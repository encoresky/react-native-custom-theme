import * as React from 'react';
import {Appearance, useColorScheme} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {ThemeModes} from './constants';
import {ThemeContext} from './context';
import {GlobalContent, Theme, ThemeProviderProps} from './types';

const ThemeProvider = ({
  children,
  darkTheme = {mode: ThemeModes.DARK},
  lightTheme = {mode: ThemeModes.LIGHT},
}: ThemeProviderProps) => {
  /**
   * useColorScheme hook provide device theme. It is triggered every time user change device theme
   */
  const colorScheme = useColorScheme();

  /**
   * @theme object contain color values for selected theme. it also have a additional parameter 'mode' which
   * determine if selected theme is light or dark.
   */
  const [theme, setTheme] = React.useState<Theme>(lightTheme);

  /**
   * @themeMode is type of mode which is selected for applying theme. it can be light, dark or device theme.
   * if device theme is selected then it will apply light or dark theme based on device theme.
   */
  const [themeMode, setThemeMode] = React.useState<ThemeModes>(
    ThemeModes.LIGHT,
  );

  /**
   * It is a common method to set new theme
   * @param newTheme new theme to be set
   * @param deviceColorScheme device color scheme
   */
  const onChangeTheme = React.useCallback(
    (newTheme: ThemeModes, deviceColorScheme: string | null | undefined) => {
      setThemeMode(newTheme);
      AsyncStorage.setItem('theme', newTheme ?? '');

      if (newTheme === ThemeModes.DEVICE_THEME) {
        setTheme(deviceColorScheme === 'dark' ? darkTheme : lightTheme);
      } else {
        setTheme(newTheme === ThemeModes.DARK ? darkTheme : lightTheme);
      }
    },
    [darkTheme, lightTheme],
  );

  /**
   * Hook triggered every time device theme changes
   */
  React.useEffect(() => {
    AsyncStorage.getItem('theme').then(newTheme => {
      const t = newTheme as ThemeModes;

      onChangeTheme(t ?? 'light', colorScheme);
    });
  }, [colorScheme, onChangeTheme]);

  /**
   * Change theme method
   */
  const changeThemeMemo = React.useMemo(
    () => ({
      changeTheme: async (newTheme: ThemeModes) => {
        const deviceColorScheme = Appearance.getColorScheme();
        onChangeTheme(newTheme, deviceColorScheme);
      },
    }),
    [onChangeTheme],
  );

  /**
   * content to be exported for external use
   */
  const globalContent: GlobalContent = {
    themeMode: themeMode,
    theme: theme,
    setTheme: changeThemeMemo.changeTheme,
    isDarkTheme: theme.mode === ThemeModes.DARK,
  };

  /**
   * ThemeContext Provider - it wrap application
   */
  return (
    <ThemeContext.Provider value={globalContent}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
