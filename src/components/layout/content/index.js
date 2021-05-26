import Header from '../header';
import EditablePage from '../../editablePage';
import classes from './content.module.css';

const Content = ({ dark }) => {
  return (
    <section className={classes.content}>
      <Header dark={dark} />
      <EditablePage />
    </section>
  );
};

export default Content;
