import { useState, useEffect, useContext } from 'react';
import { firestore } from '../firebase';
import { UserContext } from '../context';

export const useFirestore = (collection) => {
  const { user } = useContext(UserContext);
  const [pages, setPages] = useState(null);

  useEffect(() => {
    if (!user) return;
    const unsub = firestore
      .collection(collection)
      .orderBy('createdAt', 'asc')
      .onSnapshot((snap) => {
        const docs = [];
        snap.forEach((doc) => {
          docs.push({ ...doc.data(), docId: doc.id });
        });
        setPages(docs);
      });
    return () => unsub();
  }, [user, collection]);

  return { pages, setPages };
};

export const useClickOutside = (ref, state, stateHandler) => {
  useEffect(() => {
    if (state) {
      const listener = (e) => {
        if (!ref.current || ref.current.contains(e.target)) return;
        stateHandler(false);
      };

      document.addEventListener('click', listener);

      return () => document.removeEventListener('click', listener);
    }
  }, [ref, state, stateHandler]);
};
