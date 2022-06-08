import './input.scss';
import mustache from 'mustache';
import tag from 'html-tag-js';
import template from './input.hbs';

/**
 * Creates an input element
 * @param {HTMLInputElement|InputOptions} [$i]
 * @returns
 */
function input($i, maxWidth) {
  const placeholder = $i?.placeholder || $i?.title || '';
  const type = $i?.type || 'text';
  const value = $i?.value || '';
  const id = $i?.id || undefined;
  const name = $i?.name || undefined;
  const html = mustache.render(template, {
    placeholder,
    type,
    value,
    id,
    name,
  });
  const $input = tag('div', {
    className: 'component',
    innerHTML: html,
    style: {
      maxWidth: `${maxWidth}px`,
    },
    attr: {
      'data-id': 'l4ejrcs3',
    },
  });

  if ($i instanceof HTMLInputElement || $i instanceof HTMLTextAreaElement) {
    $input.get('input').replaceWith($i);
  }

  if ($i instanceof HTMLTextAreaElement) {
    $i.style.position = 'unset';
    $input.style.height = 'fit-content';
  }

  $i.setAttribute('data-modified', 'true');

  if ($i?.type === 'file') {
    const $label = $input.get('label');
    $i.onchange = (e) => {
      $label.textContent = placeholder;
      const file = e?.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (ev) => {
          let $el;

          if (file.type.startsWith('image/')) {
            $el = tag('img', {
              attr: {
                src: ev.target.result,
              },
            });
          } else {
            $el = tag('span', {
              textContent: file.name,
              className: 'ellipses',
            });
          }

          $label.innerHTML = $el.outerHTML;
        };
        reader.readAsDataURL(file);
      }
    };
  }

  return $input;
}

export default input;
