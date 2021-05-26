import classes from './sidebar.module.css';
import sun from '../../../assets/sunny.svg';
import moon from '../../../assets/night.svg';

const Sidebar = ({ dark, setDark }) => {
  const handleThemeSwitch = () => {
    // store the theme to local storage
    localStorage.setItem('dark', !dark);
    setDark(!dark);
  };

  return (
    <div className={`${classes.sidebar} ${dark ? classes.dark : ''}`}>
      <div onClick={handleThemeSwitch} className={classes.themeSwitch}>
        <span className={classes.button}></span>
        <img src={sun} alt="sunny icon" className={classes.icon} />
        <img src={moon} alt="night icon" className={classes.icon} />
      </div>
      <h2>TEXT</h2>
      <footer className={classes.footer}>
        <p className={classes.copyright}>Copyright &copy; 2021 Note App</p>
      </footer>
    </div>
  );
};

export default Sidebar;
