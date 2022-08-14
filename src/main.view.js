import './main.scss';
import tag from 'html-tag-js';

export default ({ appName, routes }) => [
  tag('header', {
    children: [
      tag('span', {
        className: 'logo',
        textContent: appName
      }),
      tag('nav', {
        className: 'nav',
        children: routes.map(({ href, text }) => tag('a', {
          href,
          textContent: text,
        })),
      }),
    ]
  }),
  tag('main', {
    id: 'main'
  }),
];
