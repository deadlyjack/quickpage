import mustache from 'mustache';
import confirmHTML from './confirm.hbs';
import Box from '../box/box';

export default function confirm(title, message) {
  return new Promise((resolve) => {
    const body = mustache.render(confirmHTML, {
      message,
    });
    const box = Box(title, body);
    box.render();

    box.$body.onclick = clickhandler;

    /**
     *
     * @param {MouseEvent} e
     */
    function clickhandler(e) {
      const $target = e.target;
      if (!($target instanceof HTMLElement)) return;
      const action = $target.getAttribute('action');
      if (!action) return;

      box.hide();
      if (action === 'ok') resolve();
    }
  });
}
