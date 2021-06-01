import { useContext, useState, useRef } from 'react';
import {
  PagesContext,
  SelectedPageContext,
  ThemeContext,
} from '../../../context';
import { useClickOutside } from '../../../hooks';
import { firestore } from '../../../firebase';

import styles from './styles.module.css';
import { ReactComponent as IconDelete } from '../../../assets/delete.svg';

const Header = () => {
  const { dark } = useContext(ThemeContext);
  const { pages } = useContext(PagesContext);
  const { selectedPage, setSelectedPage } = useContext(SelectedPageContext);

  const [showMessage, setShowMessage] = useState(false);
  const deleteMessageRef = useRef();

  useClickOutside(deleteMessageRef, showMessage, setShowMessage);

  const handleDeletePage = () => {
    setShowMessage(false);
    let docId;
    if (!selectedPage.docId) {
      pages.forEach((page) => {
        if (page.pageId === selectedPage.pageId) docId = page.docId;
      });
    }

    firestore
      .collection('pages')
      .doc(selectedPage.docId || docId)
      .delete()
      .then(() => {
        setSelectedPage(null);
      });
  };

  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <IconDelete
          className={styles.icon}
          style={{
            display: selectedPage ? 'block' : 'none',
            fill: dark ? 'currentColor' : '',
          }}
          onClick={() => setShowMessage(true)}
        />
        {showMessage && (
          <div ref={deleteMessageRef} className={styles.deleteMessage}>
            <button
              className={styles.deleteButton}
              type="button"
              onClick={handleDeletePage}
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
