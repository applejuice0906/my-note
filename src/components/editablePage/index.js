import { useState, useEffect } from 'react';
import EditableBlock from '../editableBlock';
import { calcUniqueID } from '../../helpers';
import styles from './styles.module.css';

const EditablePage = () => {
  const initialBlock = { id: calcUniqueID(), content: '', tag: 'p' };
  const [page, setPage] = useState({ blocks: [initialBlock] });
  const [currentBlockId, setCurrentBlockId] = useState(null);

  useEffect(() => {}, [page, currentBlockId]);

  const updatePageData = (currentBlock) => {
    const newBlocks = page.blocks.map((block) => {
      if (block.id === currentBlock.id) return currentBlock;
      return block;
    });
    setPage({ ...page, blocks: newBlocks });

    // Update the document in FireStore Database
  };

  const addNewBlock = (currentBlock, currentBlockRef) => {
    const newBlock = { id: calcUniqueID(), content: '', tag: 'p' };
    const currentIndex = page.blocks
      .map((block) => block.id)
      .indexOf(currentBlock.id);

    // Update the current block
    const newBlocks = page.blocks.map((block) => {
      if (block.id === currentBlock.id) return currentBlock;
      return block;
    });

    // Insert a new block right after the current block
    newBlocks.splice(currentIndex + 1, 0, newBlock);

    setPage({ ...page, blocks: newBlocks });

    // Update the document in FireStore Database
  };

  const deleteBlock = (currentBlock) => {
    if (page.blocks.length === 1) return;
    const newBlocks = page.blocks.filter(
      (block) => block.id !== currentBlock.id
    );
    setPage({ ...page, blocks: newBlocks });
    // if (currentBlockRef)
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {page.blocks.map((block) => {
          return (
            <EditableBlock
              key={block.id}
              block={block}
              updatePageData={updatePageData}
              addNewBlock={addNewBlock}
              deleteBlock={deleteBlock}
              setCurrentBlockId={setCurrentBlockId}
            />
          );
        })}
      </div>
    </div>
  );
};

export default EditablePage;
