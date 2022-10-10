import 'html-tag-js/dist/polyfill';
import 'core-js';

import './main.scss';
import './res/favicon.ico';
import View from './main.view';
import Router from './lib/Router';
import Theme from './lib/theme';
import dark from './themes/dark';

window.onload = () => {
  const theme = Theme(dark);
  const router = new Router();

  const routes = [
    { href: '/', text: 'Home' },
    { href: 'https://github.com/deadlyjack/quickpage', text: 'GitHub' },
  ];

  app.content = <View onThemeChange={onThemeChange} appName="Quickpage" routes={routes} />;

  const main = app.get('main');

  router.add('/:filename(index.html?)?', async () => {
    const { default: Home } = await import('./pages/home');
    main.content = <Home />;
  });

  router.add('*', () => {
    main.innerHTML = `Cannot get ${window.location.pathname}`;
  });

  router.listen();

  async function onThemeChange() {
    const themeName = this.value;
    let module;

    switch (themeName) {
      case 'dark':
        module = await import('./themes/dark');
        break;

      case 'light':
        module = await import('./themes/light');
        break;

      default:
        break;
    }

    theme.scheme = module.default;
  }
};
