import { createContext, useContext, useEffect, useState } from 'react';
import { PagesContext } from './PagesContext';

export const SelectedPageContext = createContext();

export const SelectedPageProvider = ({ children }) => {
  const { pages } = useContext(PagesContext);
  const [selectedPage, setSelectedPage] = useState(null);

  // When the app gets rendered for the first time, it needs to
  // set the initial selected page only after it receives the data
  // from the database
  // pages could be null, empty array, or array with data
  useEffect(() => {
    if (selectedPage) return;
    setSelectedPage(pages && pages.length > 0 && pages[0]);
  }, [pages, selectedPage]);

  return (
    <SelectedPageContext.Provider value={{ selectedPage, setSelectedPage }}>
      {children}
    </SelectedPageContext.Provider>
  );
};
