import './prompt.scss';
import autosize from 'autosize';
import promptHTML from './prompt.hbs';
import Box from '../box/box';

/**
 * Asks user for input
 * @param {String} title
 * @param {Object} [options]
 * @param {"number"|"string"} [options.type]
 * @param {boolean} [options.required]
 * @param {RegExp} [options.match]
 * @returns {Promise<String>}
 */
export default function prompt(title, options) {
  return new Promise((resolve) => {
    const box = Box(title, promptHTML);
    const $textarea = box.$body.get('#prompt-input');
    const $error = box.$body.querySelector('.error');

    box.$body.onclick = handleClick;
    box.render();
    autosize($textarea);
    $textarea.focus();

    /**
     * @param {MouseEvent} e
     */
    function handleClick(e) {
      const $target = e.target;
      if (!($target instanceof HTMLElement)) return;
      const action = $target.getAttribute('action');
      if (!action) return;

      if (action === 'cancel') box.hide();
      else if (action === 'ok') {
        let { value } = $textarea;

        if (options.required && !value) {
          showError('Required!');
          return;
        }
        if (options.match && !options.match.test(value)) {
          showError('Invalid value!');
          return;
        }
        if (options.type === 'number') value = +value;
        box.hide();
        resolve(value);
      }
    }

    function showError(str) {
      $error.textContent = str;
      $textarea.onclick = function onclick() {
        this.onclick = null;
        showError('');
      };
    }
  });
}
