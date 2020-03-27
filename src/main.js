import tag from 'html-tag-js';
import mustache from 'mustache';
import css from './main.scss';
import template from './main.hbs';
import Router from './lib/Router';

window.onload = main;

function main() {
  const router = Router();
  loadApp();

  router.add('/', () => {
    root.innerHTML = `<span>Hello World!</span>`;
  });
  router.add('*', () => {
    // jshint ignore:start
    alert("Cannot get " + location.pathname);
    // jshint ignore:end
  });
  router.listen();

  function loadApp() {
    const AppName = 'Quickpage';
    app.innerHTML = mustache.render(template, {
      "app-name": AppName
    });
    window.app = tag.get('#root');
    const $style = tag('style', {
      textContent: css.toString()
    });
    document.head.append($style);
  }
}