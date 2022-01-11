import './main.scss';
import 'core-js';
import 'html-tag-js/dist/polyfill';
import './res/favicon.ico';
import tag from 'html-tag-js';
import mustache from 'mustache';
import template from './main.hbs';
import Router from './lib/Router';
import logo from './res/quickpage-logo.png';

window.onload = main;

/**
 * Entry point of the app
 */
function main() {
  const router = Router();
  const AppName = 'Quickpage';

  router.add('/:filename(index.html?)?', () => {
    app.innerHTML = mustache.render(template, {
      'app-name': AppName,
    });
    tag.get('#root').innerHTML = `<img src="${logo}" alt="logo" style="height: 400px; width: 400px" />`;
  });
  router.add('*', () => {
    app.innerHTML = `Cannot get ${window.location.pathname}`;
  });
  router.listen();
}
