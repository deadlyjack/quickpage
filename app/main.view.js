import './main.scss';

/**
 * View component for the main page.
 * @param {Object} props
 * @param {string} props.appName
 * @param {Array<{ href: string, text: string }>} props.routes
 * @param {(e:InputEvent) => void} props.onThemeChange
 */
export default ({ appName, routes, onThemeChange }) => <section>
  <header data-name='header'>
    <span className='logo'>{appName}</span>
    <nav>{
      routes.map(({ href, text }) => <a href={href}>{text}</a>)
    }</nav>
    <select name="theme" onchange={onThemeChange}>
      <option value="default">default</option>
      <option value="dark">dark</option>
      <option value="light">light</option>
    </select>
  </header>
  <main></main>
</section>;
