import { createContext } from 'react';
import { useFirestore } from '../hooks';

export const PagesContext = createContext();
export const PagesProvider = ({ children }) => {
  const { pages, setPages } = useFirestore('pages');

  return (
    <PagesContext.Provider value={{ pages, setPages }}>
      {children}
    </PagesContext.Provider>
  );
};
