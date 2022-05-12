/**
 * Theme modes
 * 1. light theme applied when light mode is selected
 * 2. light dark applied when dark mode is selected
 * 3. if device theme mode is selected then it fetch the theme mode of device
 * and applied it,
 * 4. Device theme mode only work in device which support dark mode
 */

export enum ThemeModes {
  LIGHT = 'light',
  DARK = 'dark',
  DEVICE_THEME = 'device theme',
}
