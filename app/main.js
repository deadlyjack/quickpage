import 'core-js';
import 'html-tag-js/dist/polyfill';

import './main.scss';
import 'res/favicon.ico';

import Router from 'lib/Router';
import themes from './themes';
import MainView from './main.view';

window.onload = () => {
  themes.use('dark');

  const routes = [
    { href: 'https://foxbiz.io', text: 'Foxbiz' },
    { href: 'https://github.com/deadlyjack/quickpage', text: 'GitHub' },
  ];

  app.content = <MainView onThemeChange={(e) => themes.use(e.target.value)} appName="Quickpage" routes={routes} />;
  const main = app.get('main');

  Router.add('/:filename(index.html?)?', async () => {
    const { default: Home } = await import('./pages/home');
    main.content = <Home />;
  });

  Router.add('*', () => {
    main.innerHTML = `Cannot get ${window.location.pathname}`;
  });

  Router.listen();
};
