import { useContext } from 'react';
import styles from './styles.module.css';
import sun from '../../../assets/sunny.svg';
import moon from '../../../assets/night.svg';
import { ThemeContext } from '../../../context';

const Sidebar = () => {
  const { dark, setDark } = useContext(ThemeContext);

  const handleThemeSwitch = () => {
    // store the theme to local storage
    localStorage.setItem('dark', !dark);
    setDark(!dark);
  };

  return (
    <div className={styles.container}>
      <div className={`${styles.sidebar} ${dark ? styles.dark : ''}`}>
        <div onClick={handleThemeSwitch} className={styles.themeSwitch}>
          <span className={styles.button}></span>
          <img src={sun} alt="sunny icon" className={styles.icon} />
          <img src={moon} alt="night icon" className={styles.icon} />
        </div>
        <footer className={styles.footer}>
          <p className={styles.copyright}>Copyright &copy; 2021 Note App</p>
        </footer>
      </div>
    </div>
  );
};

export default Sidebar;
