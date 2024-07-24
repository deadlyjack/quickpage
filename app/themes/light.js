import defaultTheme from './default';

const primary = '#ffffff';
const primaryText = '#221100';
const secondary = '#ffffff';
const secondaryText = '#112200';

export default {
  ...defaultTheme,
  name: 'Light',
  primary,
  primaryText,
  secondary,
  secondaryText,
  primaryActiveText: '#3399ff',
  buttonBackground: '#3399ff',
  buttonText: '#ffffff',
  popupBackground: '#ffffff',
  popupText: '#000000',
  popupBorder: 'rgba(0, 0, 0, 0.5)',
  popupActiveBackground: secondary,
  popupActiveText: '#3399ff',
  popupIcon: '#3399ff',
  danger: '#ff3325',
  dangerActive: '#661105',
  dangerText: '#ffffff',
  error: '#ff9966',
  success: '#339966',
  border: 'solid 1px rgba(0,0,0,0.4)',
  input: '#ffffff',
  inputText: '#333366',
  inputLabel: primary,
  inputBorder: `solid 1px ${primaryText}`,
  inputLabelText: primaryText,
  type: 'light',
};
