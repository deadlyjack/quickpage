import './prompt.scss';
import tag from 'html-tag-js';
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
 * @param {boolean} [options.isSingleLine]
 * @returns {Promise<String>}
 */
export default function prompt(title, options) {
  return new Promise((resolve) => {
    const box = Box(title, promptHTML);
    let $input = box.$body.get('#prompt-input');
    const $error = box.$body.querySelector('.error');

    // If single line, submit on enter
    if (options.isSingleLine) {
      $input.onkeydown = handleKeyDown;
    }

    box.$body.onclick = handleClick;
    box.render();
    autosize($input);
    $input.focus();

    if (options.type) {
      const $oldInput = $input;
      $input = tag('input', {
        type: options.type,
        id: 'prompt-input',
        onkeydown: handleKeyDown,
      });
      $oldInput.parentNode.replaceChild($input, $oldInput);
      $input.focus();
    }

    /**
     *
     * @param {KeyboardEvent} e
     */
    function handleKeyDown(e) {
      if (e.key === 'Enter') {
        e.preventDefault();
        submit();
      }
    }

    /**
     * @param {MouseEvent} e
     */
    function handleClick(e) {
      const $target = e.target;
      if (!($target instanceof HTMLElement)) return;
      const action = $target.getAttribute('action');
      if (!action) return;

      if (action === 'cancel') {
        box.hide();
        resolve(null);
      } else if (action === 'ok') {
        submit();
      }
    }

    function submit() {
      let { value } = $input;

      if (options.required && !value) {
        showError('Required!');
        return;
      }
      if (options.match && !options.match.test(value)) {
        showError(options.errorMessage || 'Invalid value!');
        return;
      }
      if (options.type === 'number') value = +value;
      box.hide();
      resolve(value);
    }

    function showError(str) {
      $error.textContent = str;
      $input.oninput = onchange;

      function onchange() {
        $input.onchange = null;
        $error.textContent = '';
      }
    }
  });
}
