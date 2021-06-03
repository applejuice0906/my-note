import { useContext, useRef } from 'react';
import { useClickOutside } from '../../../hooks';
import AddPage from '../../addPage';

import styles from './styles.module.css';
import sun from '../../../assets/sunny.svg';
import moon from '../../../assets/night.svg';
import github from '../../../assets/github.svg';
import {
  PagesContext,
  SelectedPageContext,
  ThemeContext,
} from '../../../context';

const Sidebar = ({ sidebarState }) => {
  const { pages } = useContext(PagesContext);
  const { selectedPage, setSelectedPage } = useContext(SelectedPageContext);
  const { dark, setDark } = useContext(ThemeContext);
  const { sidebarOpen, setSidebarOpen } = sidebarState;

  const sidebarRef = useRef(null);

  useClickOutside(sidebarRef, sidebarOpen, setSidebarOpen);

  const handleThemeSwitch = () => {
    // store the theme to local storage
    localStorage.setItem('dark', !dark);
    setDark(!dark);
  };

  return (
    <div
      className={
        sidebarOpen
          ? [styles.container, styles.active].join(' ')
          : styles.container
      }
    >
      <div
        ref={sidebarRef}
        className={`${styles.sidebar} ${dark ? styles.dark : ''}`}
      >
        <div onClick={handleThemeSwitch} className={styles.themeSwitch}>
          <span className={styles.button}></span>
          <img src={sun} alt="sunny icon" className={styles.icon} />
          <img src={moon} alt="night icon" className={styles.icon} />
        </div>
        <div className={styles.itemContainer}>
          <ul>
            {pages?.length && selectedPage
              ? pages.map((page) => {
                  return (
                    <li
                      onClick={() => {
                        setSelectedPage(page);
                        setSidebarOpen(false);
                      }}
                      key={page.pageId}
                      data-pageid={page.docId}
                      className={
                        selectedPage.pageId === page.pageId
                          ? [styles.active, styles.item].join(' ')
                          : styles.item
                      }
                    >
                      {page.blocks[0].content || '📄Untitled'}
                    </li>
                  );
                })
              : null}
          </ul>
          <AddPage setSidebarOpen={setSidebarOpen} />
        </div>
        <footer className={styles.footer}>
          <a
            className={styles.footerLink}
            href="https://github.com/applejuice0906/my-note"
            target="_blank"
            rel="noreferrer"
          >
            <img src={github} alt="github icon" className={styles.footerIcon} />
          </a>
          <p className={styles.copyright}>Copyright &copy; 2021 My Note</p>
        </footer>
      </div>
    </div>
  );
};

export default Sidebar;
