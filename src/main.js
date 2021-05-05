import './main.scss';
import 'core-js';
import 'html-tag-js/polyfill';
import './res/favicon.ico';
import tag from 'html-tag-js';
import mustache from 'mustache';
import template from './main.hbs';
import Router from './lib/Router';
import alert from './components/dialogs/alert/alert';
import logo from './res/quickpage-logo.png';

window.onload = main;

/**
 * Entry point of the app
 */
function main() {
  const router = Router();
  const AppName = 'Quickpage';
  app.innerHTML = mustache.render(template, {
    'app-name': AppName,
  });
  window.app = tag.get('#root');

  router.add('/:filename(index.html?)?', () => {
    root.innerHTML = `<img src="${logo}" alt="logo" style="margin:auto" />`;
  });
  router.add('*', () => {
    alert(`Cannot get ${window.location.pathname}`);
  });
  router.listen();
}
