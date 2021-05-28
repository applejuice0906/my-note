import Header from '../header';
import EditablePage from '../../editablePage';
import styles from './styles.module.css';

const Content = ({ dark }) => {
  return (
    <section className={styles.content}>
      <Header dark={dark} />
      <EditablePage />
    </section>
  );
};

export default Content;
