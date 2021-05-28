import { useRef, useState } from 'react';
import styles from './styles.module.css';

const EditableBlock = ({
  block: passedBlock,
  updatePageData,
  addNewBlock,
  deleteBlock,
  setCurrentBlockId,
}) => {
  const [block, setBlock] = useState(passedBlock);
  const [contentBackup, setContentBackup] = useState('');
  const [prevKey, setPrevKey] = useState(null);

  const blockRef = useRef(null);
  const defaultValue = useRef(passedBlock.content);

  const handleKeyDown = (e) => {
    setBlock({ ...block, content: blockRef.current.innerHTML });
    setPrevKey(e.key);

    if (e.key === '/') {
      setContentBackup(block.content);
      return;
    }
    if (e.key === 'Enter') {
      if (prevKey !== 'Shift') {
        e.preventDefault();
        addNewBlock(block, blockRef.current);
        setCurrentBlockId(block.id);
        return;
      }
    }

    if (e.key === 'Backspace' && !block.content) {
      e.preventDefault();
      deleteBlock(block, blockRef.current);
    }
  };

  const renderBlock = (block) => {
    const BlockTag = block.tag;
    return (
      <BlockTag
        placeholder="type '/' for commands"
        className={`${styles.block}`}
        contentEditable="true"
        suppressContentEditableWarning={true}
        ref={blockRef}
        onKeyDown={handleKeyDown}
        onChange={(e) => {
          setBlock(e.target.innerHTML);
        }}
        dangerouslySetInnerHTML={{ __html: defaultValue.current }}
      ></BlockTag>
    );
  };

  return <>{renderBlock(block)}</>;
};

export default EditableBlock;
