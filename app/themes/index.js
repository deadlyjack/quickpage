import defaultTheme from './default';

/**
 * @typedef {Map.<keyof defaultTheme, string>} Theme
 */

/** @type {HTMLStyleElement} */
let themeStyleEl = null;

export default {
  /**
   * Get theme by name
   * @param {string} name
   * @returns {Promise<Theme>}
   */
  async get(name) {
    name = name.toLowerCase();
    let theme = defaultTheme;
    switch (name) {
      case 'light': {
        const themeModule = await import('./light');
        theme = themeModule.default;
        break;
      }

      case 'black': {
        const themeModule = await import('./black');
        theme = themeModule.default;
        break;
      }

      default: {
        const themeModule = await import('./default');
        theme = themeModule.default;
        break;
      }
    }

    return new Map(Object.entries(theme));
  },

  /**
   * Applies the specified theme by updating the CSS variables in the document.
   * @param {string} name - The name of the theme to apply.
   * @param {HTMLStyleElement} [style] - The style element to update with the theme's CSS.
   * @returns {Promise<void>} A promise that resolves when the theme is applied.
   */
  async use(name, style) {
    const theme = await this.get(name);
    const css = jsonToCssVariables(theme);
    if (!themeStyleEl) {
      themeStyleEl = style || document.createElement('style');
    }

    if (!style) style = themeStyleEl;
    style.innerHTML = css;
    if (!style.isConnected) {
      document.head.appendChild(style);
    }
  },
  /**
   * Get the list of available themes.
   *
   * @returns {string[]} The list of themes.
   */
  get list() {
    return ['Light', 'Dark', 'Black'];
  },
  /**
   * Checks if a theme name exists in the list of themes.
   * @param {string} name - The name of the theme to check.
   * @returns {boolean} - Returns true if the theme exists, false otherwise.
   */
  has(name) {
    return this.list.includes(name);
  },
};

/**
 * Converts a JSON object to CSS variables.
 *
 * @param {Map} json - The JSON object containing key-value pairs.
 * @returns {string} - The CSS variables as a string.
 */
function jsonToCssVariables(json) {
  let theme = '';
  Array.from(json.keys()).forEach((color) => {
    const cssVar = color.replace(/[A-Z]/g, ($) => `-${$.toLowerCase()}`);
    theme += `--${cssVar}: ${json.get(color)};`;
  });
  return `:root{${theme}}`;
}
