export type ThemeMode = 'light' | 'dark' | 'device theme';

/**
 * This is the basic object which contain theme variable.
 * mode store if theme is dark or light.
 * dynamic key contain values for colors define by user for each theme.
 */
export type Theme = {
  mode: 'dark' | 'light';
  [key: string]: string;
};

/**
 * Theme are the props supplied to ThemeProvide
 * @theme it contain currently selected theme object
 * @children ThemeProvider works as a wrapper so whole app going to
 * rendered within it. Children prop contain the app UI.
 */
export type ThemeProviderProps = {
  theme?: Theme;
  children?: React.ReactNode;
  onReady?: () => void;
};

/**
 * This data is exposed to external project. user can only use it.
 * @themeMode is string value representing currently selected theme.
 * it must be one of light, dark and device theme
 * @theme it contain color values for current theme, if dark theme is selected then
 * it contain dark theme color and same in case of light theme.
 * @isDarkTheme it is a special flag to identify if current theme is light or dark.
 * @setTheme It is a function which we use to set new theme type. We have to pass
 * light, dark or device theme as param.
 */
export type GlobalContent = {
  themeMode: string;
  theme: Theme;
  isDarkTheme: boolean;
  setTheme: (theme: ThemeMode) => void;
};
