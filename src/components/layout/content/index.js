import Header from '../header';
import EditablePage from '../../editablePage';
import styles from './styles.module.css';

const Content = () => {
  return (
    <section className={styles.content}>
      <Header />
      <EditablePage />
    </section>
  );
};

export default Content;
