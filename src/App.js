import { useEffect, useState, useMemo } from 'react';
import { ThemeContext } from './context';

import Content from './components/layout/content';
import Sidebar from './components/layout/sidebar';

function App() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    // get the theme from local storage
    const data = JSON.parse(localStorage.getItem('dark'));
    if (data) setDark(true);
  }, []);

  const themeValue = useMemo(
    () => ({
      dark,
      setDark,
    }),
    [dark, setDark]
  );

  return (
    <ThemeContext.Provider value={themeValue}>
      <main>
        <div className={`container ${dark ? 'dark' : ''}`}>
          <Sidebar />
          <Content />
        </div>
      </main>
    </ThemeContext.Provider>
  );
}

export default App;
