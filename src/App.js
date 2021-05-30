import { useEffect, useState, useMemo } from 'react';
import { ThemeContext, PagesProvider, SelectedPageProvider } from './context';

import Content from './components/layout/content';
import Sidebar from './components/layout/sidebar';
import { ReactComponent as Icon } from './assets/menu.svg';

function App() {
  const [dark, setDark] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
    <PagesProvider>
      <SelectedPageProvider>
        <ThemeContext.Provider value={themeValue}>
          <main className={dark ? 'dark' : ''}>
            {!sidebarOpen ? (
              <Icon className="icon" onClick={() => setSidebarOpen(true)} />
            ) : null}
            <div className="container">
              <Sidebar sidebarState={{ sidebarOpen, setSidebarOpen }} />
              <Content />
            </div>
          </main>
        </ThemeContext.Provider>
      </SelectedPageProvider>
    </PagesProvider>
  );
}

export default App;
