import { useContext } from 'react';
import { ThemeContext } from '../../context';
import { firestore } from '../../firebase';

import styles from './styles.module.css';

const AddPage = () => {
  const { dark } = useContext(ThemeContext);

  const handleClick = () => {};
  return (
    <div
      className={
        dark ? [styles.dark, styles.container].join(' ') : styles.container
      }
      onClick={handleClick}
    >
      <div className={styles.content}>
        <span className={styles.plusSign}>+</span> New Page
      </div>
    </div>
  );
};

export default AddPage;
