import './home.scss';

function home() {
  let count = 0;
  const $span = <strong>{count}</strong>;
  return <section id='home'>
    <span className='counter'>Count: {$span} times clicked</span>
    <button type='button' onclick={() => { $span.textContent = ++count; }}>Click</button>
  </section>;
}

export default home;
