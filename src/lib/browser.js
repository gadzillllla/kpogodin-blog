import bowser from 'bowser';

export function isMobile() {
  return !!bowser.mobile || !!bowser.tablet;
}

export function isTablet() {
  return !!bowser.tablet;
}

export function isDesktop() {
  return !isMobile();
}

export function isProbablyUnsupportedBrowser() {
  return !!bowser.yandexbrowser || !!bowser.opera;
}
