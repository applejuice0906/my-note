import { useState, useEffect } from 'react';
import { firestore } from '../firebase';

export const useFirestore = (collection) => {
  const [pages, setPages] = useState(null);

  useEffect(() => {
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
  }, [collection]);

  return { pages, setPages };
};
