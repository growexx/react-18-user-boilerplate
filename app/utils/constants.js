export const RESTART_ON_REMOUNT = '@@saga-injector/restart-on-remount';
export const DAEMON = '@@saga-injector/daemon';
export const ONCE_TILL_UNMOUNT = '@@saga-injector/once-till-unmount';
export const TOKEN_KEY = 'jwtToken';
export const USER_DATA_KEY = 'userData';
export const EMITTER_EVENTS = {
  LOG_IN: 'USER_LOGGED_IN',
  LOG_OUT: 'USER_LOGGED_OUT',
};
export const GA_CATEGORY_MENU_CLICKS = 'Menu_Clicks';
export const BASE_URL = 'https://api.github.com';
export const PRIMARY_COLOR = '#4d186e';
export const PRIMARY_HOVER = '#3E1358';
export const ERROR_COLOR = '#ff0000';
export const BASE_COLOR = '#000';
export const FONT_FAMILY =
  "'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif";
export const themeConfig = {
  token: {
    colorPrimary: PRIMARY_COLOR,
    colorPrimaryHover: PRIMARY_HOVER,
    colorError: ERROR_COLOR,
    colorTextBase: BASE_COLOR,
    colorLink: PRIMARY_COLOR,
    fontFamily: FONT_FAMILY,
  },
};
