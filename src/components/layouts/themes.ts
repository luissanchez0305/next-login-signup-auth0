import { createTheme } from '@paljs/theme';
import { DefaultTheme } from 'styled-components';
import { Config } from '../../core';

const shared: Partial<DefaultTheme> = {
  sidebarHeaderGap: '2rem',
  fontFamilyPrimary: `-apple-system,BlinkMacSystemFont,
          "Segoe UI",Roboto,"Helvetica Neue",
          Arial,sans-serif,"Apple Color Emoji",
          "Segoe UI Emoji","Segoe UI Symbol"`,
};

const getDefaultTheme = (): DefaultTheme['name'] => {
  const theme = Config.getInstance().appTheme;
  return theme;
};

function themeService(theme: DefaultTheme['name'] = 'dark', dir: 'ltr' | 'rtl'): DefaultTheme {
  switch (theme) {
    case 'dark':
    case 'cosmic':
    case 'corporate':
    default:
      return createTheme(theme, { dir, ...shared });
  }
}

export { themeService, getDefaultTheme };
