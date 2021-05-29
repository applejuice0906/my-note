import { useState, useEffect } from 'react';
import { calcUniqueID } from '../../helpers';
import EditableBlock from '../editableBlock';

import styles from './styles.module.css';

// Each page contains an array of blocks/block

const EditablePage = () => {
  // When a new page is added, it sets a initial block for the page
  const initialBlock = { id: calcUniqueID(), content: '', tag: 'h1' };

  const [blocks, setBlocks] = useState([initialBlock]);
  const [currentBlockId, setCurrentBlockId] = useState(null);

  useEffect(() => {
    // Update the document in FireStore Database
  }, [blocks]);

  useEffect(() => {
    // get the next block position by calculating the current block position(index + 1) + 1
    const nextBlockPosition =
      blocks.map((block) => block.id).indexOf(currentBlockId) + 2;
    const nextBlock = document.querySelector(
      `[data-position='${nextBlockPosition}']`
    );
    if (nextBlock) nextBlock.focus();
  }, [currentBlockId, blocks]);

  const updatePageData = (currentBlock) => {
    setCurrentBlockId(currentBlock.id);
    const newBlocks = blocks.map((block) => {
      if (block.id === currentBlock.id) return currentBlock;
      return block;
    });
    setBlocks(newBlocks);
  };

  const addNewBlock = (currentBlock) => {
    setCurrentBlockId(currentBlock.id);
    const newBlock = { id: calcUniqueID(), content: '', tag: 'p' };
    const currentIndex = blocks
      .map((block) => block.id)
      .indexOf(currentBlock.id);

    // Update the current blocks
    const newBlocks = blocks.map((block) => {
      if (block.id === currentBlock.id) return currentBlock;
      return block;
    });

    // Insert a new block right after the current block
    newBlocks.splice(currentIndex + 1, 0, newBlock);
    setBlocks(newBlocks);
  };

  const deleteBlock = (currentBlockId) => {
    if (blocks.length === 1) return;
    const newBlocks = blocks.filter((block) => block.id !== currentBlockId);
    setBlocks(newBlocks);
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {blocks.map((block, index) => {
          return (
            <EditableBlock
              key={block.id}
              block={block}
              updatePageData={updatePageData}
              addNewBlock={addNewBlock}
              deleteBlock={deleteBlock}
              lineNum={index}
            />
          );
        })}
      </div>
    </div>
  );
};

export default EditablePage;
