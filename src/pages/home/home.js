import './home.scss';
import logo from 'res/quickpage-logo.png';
import tag from 'html-tag-js';
import mustache from 'mustache';
import template from './home.hbs';

function home() {
  const html = mustache.render(template, {
    logo,
  });
  const $page = tag('div', {
    className: 'page',
    innerHTML: mustache.render(html, {}),
    attr: {
      'data-id': 'l4y9mqtw',
    },
  });

  return {
    render() {
      main.innerHTML = '';
      main.append($page);
    },
  };
}

export default home;
