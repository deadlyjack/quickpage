import './box.scss';
import tag from 'html-tag-js';
import mustache from 'mustache';
import boxHTML from './box.hbs';

/**
 * Creates a popup box
 * @param {String} title title of the box
 * @param {String} body  body of the box
 * @param {"top"|"bottom"|"center"} position  body of the box
 * @param {boolean} cancelable if dialog box is cancelable
 */
export default function Box(title, body, position, cancelable = true) {
  position = position || (window.innerWidth <= 500 ? 'center' : 'top');

  const uuid = (new Date().getTime() + parseInt(Math.random() * (10 ** 10), 16)).toString(36);
  const id = cancelable ? uuid : 'dialogbox';
  const $box = tag.parse(mustache.render(boxHTML, {
    id,
    title,
    body,
    position,
  }));

  return {
    render() {
      document.body.append($box);
    },
    hide() {
      $box.get(':scope>.box').classList.add('hide');
      $box.get(':scope>.mask').classList.add('hide');
      setTimeout(() => {
        $box.remove();
      }, 300);
    },
    $mask: $box.get(':scope>.mask'),
    $body: $box.get(':scope>.box>.body'),
    $box: $box.get(':scope>.box'),
  };
}
