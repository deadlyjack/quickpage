import './main.scss';
import 'core-js';
import 'html-tag-js/dist/polyfill';
import './res/favicon.ico';
import mustache from 'mustache';
import template from './main.hbs';
import Router from './lib/Router';

window.onload = () => {
  const router = Router();
  const AppName = 'Quickpage';
  app.innerHTML = mustache.render(template, {
    'app-name': AppName,
  });

  router.add('/:filename(index.html?)?', async () => {
    const { default: Home } = await import('./pages/home/home');
    const home = Home();
    home.render();
  });
  router.add('*', () => {
    main.innerHTML = `Cannot get ${window.location.pathname}`;
  });
  router.listen();
};
