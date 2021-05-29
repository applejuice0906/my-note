import { useCallback, useEffect, useRef, useState, useContext } from 'react';
import { ThemeContext } from '../../context';
import { setCaretToEnd, getCaretCoordinates } from '../../helpers';
import TagSelectionMenu from '../tagSelectionMenu';
import { ReactComponent as Icon } from '../../assets/delete.svg';

import styles from './styles.module.css';

const EditableBlock = ({
  block: passedBlock,
  updatePageData,
  addNewBlock,
  deleteBlock,
  lineNum,
}) => {
  const { dark } = useContext(ThemeContext);

  const [block, setBlock] = useState(passedBlock);
  const [contentBackup, setContentBackup] = useState('');
  const [prevKey, setPrevKey] = useState(null);
  const [tagSelectionMenuOpen, setTagSelectionMenuOpen] = useState(false);
  const [tagSelectionMenuPosition, setTagSelectionMenuPosition] = useState({
    x: null,
    y: null,
  });

  const defaultValue = useRef(block.content);

  const blockRef = useRef(null);

  const handleBlur = () => {
    if (
      passedBlock.content !== blockRef.current.innerHTML ||
      passedBlock.tag !== block.tag
    )
      updatePageData(block);
  };

  const handleKeyDown = (e) => {
    setPrevKey(e.key);

    if (e.key === '/') setContentBackup(block.content);

    if (e.key === 'Enter') {
      if (prevKey !== 'Shift' && !tagSelectionMenuOpen) {
        e.preventDefault();
        addNewBlock(block, blockRef.current);
        return;
      }
    }

    if (e.key === 'Backspace' && (!block.content || block.content === '<br>')) {
      deleteBlock(block);
    }
  };

  const handleKeyUp = (e) => {
    if (e.key === '/') openTagSelectionMenu();
  };

  const openTagSelectionMenu = () => {
    const { x, y } = calcTagSelectionMenuPosition();
    setTagSelectionMenuPosition({ x, y });
    setTagSelectionMenuOpen(true);

    document.addEventListener('click', closeTagSelectionMenu, false);
  };

  const closeTagSelectionMenu = useCallback(() => {
    setTagSelectionMenuPosition({ x: null, y: null });
    setTagSelectionMenuOpen(false);

    document.removeEventListener('click', closeTagSelectionMenu, false);
  }, []);

  const handleTagSelection = (tag) => {
    setBlock({ ...block, tag });
    defaultValue.current = contentBackup;
    setCaretToEnd(blockRef.current);
    closeTagSelectionMenu();
  };

  const calcTagSelectionMenuPosition = () => {
    return getCaretCoordinates(true);
  };

  const onIconClick = () => {
    deleteBlock(block);
  };

  const renderBlock = (block) => {
    const BlockTag = block.tag;
    return (
      <div
        className={
          dark
            ? [styles.blockContainer, styles.dark].join(' ')
            : styles.blockContainer
        }
      >
        <BlockTag
          // "!lineNum" means index of the block is 0 therefore line number is 1
          placeholder={
            !lineNum ? 'Add a page title here..' : "Type '/' for commands"
          }
          className={`${styles.block} ${
            !lineNum ? `pageTitle ${styles.titlePlaceholder}` : ''
          }`}
          contentEditable="true"
          suppressContentEditableWarning={true}
          ref={blockRef}
          onInput={(e) => {
            setBlock({ ...block, content: e.target.innerHTML });
          }}
          onKeyDown={handleKeyDown}
          onKeyUp={handleKeyUp}
          onBlur={handleBlur}
          dangerouslySetInnerHTML={{ __html: defaultValue.current }}
          data-position={lineNum + 1}
        ></BlockTag>
        {!lineNum ? null : (
          <Icon className={styles.icon} onClick={onIconClick} />
        )}
      </div>
    );
  };

  useEffect(() => {
    return () => {
      document.removeEventListener('click', closeTagSelectionMenu, false);
    };
  }, [closeTagSelectionMenu]);

  return (
    <>
      {tagSelectionMenuOpen && (
        <TagSelectionMenu
          position={tagSelectionMenuPosition}
          closeMenu={closeTagSelectionMenu}
          handleSelection={handleTagSelection}
        />
      )}

      {renderBlock(block)}
    </>
  );
};

export default EditableBlock;
