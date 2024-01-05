import './main.scss';

export default ({ appName, routes, onThemeChange }) => <section>
  <header data-name='header'>
    <span className='logo'>{appName}</span>
    <nav>{
      routes.map(({ href, text }) => <a href={href}>{text}</a>)
    }</nav>
    <select name="theme" onchange={onThemeChange}>
      <option value="dark">dark</option>
      <option value="light">light</option>
      <option value="ocean">ocean</option>
    </select>
  </header>
  <main></main>
</section>;
