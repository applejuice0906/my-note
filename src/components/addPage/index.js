import { useContext } from 'react';
import { SelectedPageContext, ThemeContext, UserContext } from '../../context';
import { firestore, timestamp } from '../../firebase';
import { calcUniqueID } from '../../helpers';

import styles from './styles.module.css';

const AddPage = ({ setSidebarOpen }) => {
  const { dark } = useContext(ThemeContext);
  const { user } = useContext(UserContext);
  const { setSelectedPage } = useContext(SelectedPageContext);

  const addPage = async () => {
    try {
      const newPage = {
        blocks: [{ id: calcUniqueID(), content: '', tag: 'h1' }],
        pageId: calcUniqueID(),
        createdAt: timestamp(),
        uid: user.uid,
      };

      await firestore.collection('pages').add(newPage);
      setSelectedPage(newPage);
    } catch (error) {
      console.dir(error);
    }
  };
  return (
    <div
      className={
        dark ? [styles.dark, styles.container].join(' ') : styles.container
      }
      onClick={() => {
        setSidebarOpen(false);
        addPage();
      }}
    >
      <div className={styles.content}>
        <span className={styles.plusSign}>+</span> New Page
      </div>
    </div>
  );
};

export default AddPage;
