import { useEffect, useState } from 'react';
import Content from './components/layout/content';
import Sidebar from './components/layout/sidebar';

function App() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    // get the theme from local storage
    const data = JSON.parse(localStorage.getItem('dark'));
    if (data) setDark(true);
  }, []);

  return (
    <main>
      <div className={`container ${dark ? 'dark' : ''}`}>
        <Sidebar dark={dark} setDark={setDark} />
        <Content dark={dark} />
      </div>
    </main>
  );
}

export default App;
