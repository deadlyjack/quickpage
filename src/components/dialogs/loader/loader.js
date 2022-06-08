import mustache from 'mustache';
import tag from 'html-tag-js';
import Box from '../box/box';
import loaderHTML from './loader.hbs';
import './loader.scss';

export default {
  show(title, message, oncancel) {
    if (!message) {
      message = title;
      title = '';
    }
    this.hide();
    const cancelable = typeof oncancel === 'function';
    const body = mustache.render(loaderHTML, {
      message,
      cancelable,
    });
    const box = Box(title, body, 'center', false);
    box.render();

    if (cancelable) box.$body.get('button[action=cancel]').onclick = oncancel;
  },
  hide() {
    const $box = tag.get('#dialogbox');
    if ($box) {
      $box.get(':scope>.box').classList.add('hide');
      $box.get(':scope>.mask').classList.add('hide');
      setTimeout(() => {
        $box.remove();
      }, 300);
    }
  },
};
