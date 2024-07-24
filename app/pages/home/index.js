import './style.scss';

function home() {
  const count = <>0</>;
  const onclick = () => { ++count.value; };

  return <section id='home'>
    <span className='counter'>
      Count: <strong>{count}</strong> times clicked
    </span>
    <button type='button' onclick={onclick}>Click</button>
  </section>;
}

export default home;
