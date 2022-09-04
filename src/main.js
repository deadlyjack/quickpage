import 'html-tag-js/dist/polyfill';
import 'core-js';

import './main.scss';
import './res/favicon.ico';
import tag from 'html-tag-js';
import mainView from './main.view';
import Router from './lib/Router';

window.onload = () => {
  const router = new Router();

  app.content = mainView({
    appName: 'Quickpage',
    routes: [
      { href: '/', text: 'Home' },
      { href: 'https://github.com/deadlyjack/quickpage', text: 'GitHub' },
    ],
  });

  tag.getAll('button');

  const main = app.get('main');

  router.add('/:filename(index.html?)?', async () => {
    const { default: Home } = await import('./pages/home');
    main.content = Home();
  });

  router.add('*', () => {
    main.innerHTML = `Cannot get ${window.location.pathname}`;
  });

  router.listen();
};
