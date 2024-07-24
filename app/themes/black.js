import defaultTheme from './default';

const primary = '#000000';
const primaryText = '#FAF0E6';
const secondary = '#000000';
const secondaryText = '#FAF0E6';

export default {
  ...defaultTheme,
  name: 'Black',
  primary,
  primaryText,
  secondary,
  secondaryText,
  primaryActiveText: '#3399ff',
  buttonBackground: '#3399ff',
  buttonText: '#ffffff',
  popupBackground: '#121212',
  popupText: '#FFFFFF',
  popupBorder: 'rgba(255, 255, 255, 0.5)',
  popupActiveBackground: secondary,
  popupActiveText: '#FFD700',
  popupIcon: '#FFFFFF',
  danger: '#ff3325',
  dangerBorder: 'solid 1px #ff3325',
  dangerBackground: 'linear-gradient(to bottom, #662212, #ff3325)',
  dangerActive: '#661105',
  dangerText: '#ffffff',
  error: '#ff9966',
  success: '#339966',
  shadow: 'none',
  border: 'solid 1px rgba(255,255,255,0.4)',
  borderRadius: '6px',
  input: '#000000',
  inputText: '#ffffff',
  inputPlaceholder: '#ffffff88',
  inputLabel: secondary,
  inputBorder: 'solid 1px rgba(255,255,255,0.4)',
  inputLabelText: secondaryText,
  type: 'dark',
};
