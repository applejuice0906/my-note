import { useState, useEffect, useContext } from 'react';
import { ThemeContext } from '../../context';

import styles from './styles.module.css';

const MENU_HEIGHT = 150;
const allowedTags = [
  {
    id: 'main-heading',
    tag: 'h1',
    label: 'Top heading',
  },
  {
    id: 'heading',
    tag: 'h2',
    label: 'Heading',
  },
  {
    id: 'subheading',
    tag: 'h3',
    label: 'Subheading',
  },
  {
    id: 'paragraph',
    tag: 'p',
    label: 'Paragraph',
  },
];

const TagSelectionMenu = ({ position, closeMenu, handleSelection }) => {
  const { dark } = useContext(ThemeContext);
  const [selectedTag, setSelectedTag] = useState(0);

  const isMenuOutsideOfViewport = position.y - MENU_HEIGHT < 0;
  const y = !isMenuOutsideOfViewport
    ? position.y - MENU_HEIGHT
    : position.y + MENU_HEIGHT / 3;
  const x = position.x;

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        handleSelection(allowedTags[selectedTag].tag);
        return;
      }
      if (e.key === 'Tab' || e.key === 'ArrowDown') {
        e.preventDefault();
        const newSelectedTag =
          selectedTag === allowedTags.length - 1 ? 0 : selectedTag + 1;
        setSelectedTag(newSelectedTag);
        return;
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        const newSelectedTag =
          selectedTag === 0 ? allowedTags.length - 1 : selectedTag - 1;
        setSelectedTag(newSelectedTag);
        return;
      }
      if (e.key === 'Backspace') {
        closeMenu();
        return;
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedTag, closeMenu, handleSelection]);

  return (
    <div
      className={styles.menuWrapper}
      style={{
        top: y + 60,
        left: x / 2 + 30,
        justifyContent: !isMenuOutsideOfViewport ? 'flex-end' : 'flex-start',
      }}
    >
      <div
        className={dark ? [styles.menu, styles.dark].join(' ') : styles.menu}
      >
        {allowedTags.map((tag, key) => {
          return (
            <div
              key={key}
              data-tag={tag.tag}
              className={
                allowedTags.indexOf(tag) === selectedTag
                  ? [styles.item, styles.selectedTag].join(' ')
                  : styles.item
              }
              role="button"
              tabIndex="0"
              onClick={() => handleSelection(tag.tag)}
            >
              {tag.label}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TagSelectionMenu;
