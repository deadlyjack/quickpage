import './main.scss';

export default ({ appName, routes }) => <section>
  <header>
    <span className='logo'>{appName}</span>
    <nav>{routes.map(({ href, text }) => <a href={href}>{text}</a>)}</nav>
  </header>
  <main></main>
</section>;
