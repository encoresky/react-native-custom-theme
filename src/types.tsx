/**
 * This is the basic object which contain theme variable.
 * mode store if theme is dark or light.
 * dynamic key contain values for colors define by user for each theme.
 */
export type Theme = {
  mode: 'dark' | 'light';
  [key: string]: string;
};
