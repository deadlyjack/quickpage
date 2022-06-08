import mustache from 'mustache';
import alertHTML from './alert.hbs';
import Box from '../box/box';

/**
 * Shows alert box with title and message.
 * @param {String} title
 * @param {String} message
 * @param {()=>void} [onhide]
 */
export default function alert(title, message, onhide) {
  const box = Box(title, mustache.render(alertHTML, {
    message,
  }));

  box.$mask.onclick = box.hide;
  box.$body.onclick = clickHandler;
  box.render();

  /**
   *
   * @param {MouseEvent} e
   */
  function clickHandler(e) {
    const $target = e.target;
    if (!($target instanceof HTMLElement)) return;
    const action = $target.getAttribute('action');
    if (!action) return;

    if (action === 'ok') {
      box.hide();
      if (onhide) onhide();
    }
  }
}
