import tag from 'html-tag-js';

function home() {
  return tag('section', {
    className: 'home',
    children: [
      tag('h1', 'Home'),
      tag('p', 'This is the home page.'),
    ],
  });
}

export default home;
