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

export type GlobalContent = {
  themeMode: string;
  theme: Theme;
  isDarkTheme: boolean;
  setTheme: (theme: string) => void;
};
