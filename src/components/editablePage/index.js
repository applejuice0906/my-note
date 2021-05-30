import { useState, useEffect, useContext } from 'react';
import { PagesContext, SelectedPageContext } from '../../context';
import { calcUniqueID } from '../../helpers';
import EditableBlock from '../editableBlock';
import { firestore } from '../../firebase';

import styles from './styles.module.css';
import { ReactComponent as IconLoading } from '../../assets/loader.svg';

// Each page contains an array of blocks/block

const EditablePage = () => {
  const { pages } = useContext(PagesContext);
  const { selectedPage } = useContext(SelectedPageContext);

  // When a new page is added, it sets a initial block for the page
  // initialBlock = { id: calcUniqueID(), content: '', tag: 'h1' };

  const [blocks, setBlocks] = useState(null);
  const [currentBlockId, setCurrentBlockId] = useState(null);

  useEffect(() => {
    setBlocks(selectedPage?.blocks);
  }, [selectedPage]);

  useEffect(() => {
    // get the next block position by calculating the current block position(index + 1) + 1
    const nextBlockPosition =
      blocks?.map((block) => block.id).indexOf(currentBlockId) + 2;
    if (nextBlockPosition < 2) return;
    const nextBlock = document.querySelector(
      `[data-position='${nextBlockPosition}']`
    );
    if (currentBlockId && nextBlock) nextBlock.focus();
  }, [currentBlockId, blocks]);

  const updateDatabase = async (newBlocks) => {
    let docId;
    pages.forEach((page) => {
      if (page.pageId === selectedPage.pageId) docId = page.docId;
    });
    await firestore
      .collection('pages')
      .doc(docId)
      .update({ ...selectedPage, blocks: newBlocks });
  };

  const updateBlock = async (currentBlock) => {
    setCurrentBlockId(currentBlock.id);
    const newBlocks = blocks.map((block) => {
      if (block.id === currentBlock.id) return currentBlock;
      return block;
    });
    await updateDatabase(newBlocks);
    setBlocks(newBlocks);
  };

  const addNewBlock = async (currentBlock) => {
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

    await updateDatabase(newBlocks);

    setBlocks(newBlocks);
  };

  const deleteBlock = async (currentBlockId) => {
    if (blocks.length === 1) return;
    const newBlocks = blocks.filter((block) => block.id !== currentBlockId);
    await updateDatabase(newBlocks);
    setBlocks(newBlocks);
  };

  const renderContent = () => {
    if (!pages)
      return (
        <div>
          <IconLoading className={styles.icon} />
        </div>
      );

    if (!selectedPage)
      return (
        <div className={styles.notice}>
          <h2>
            No pages available...🙁
            <br />
            You can create a new page in the sidebar📒
          </h2>
        </div>
      );

    if (blocks) {
      return blocks.map((block, index) => {
        return (
          <EditableBlock
            key={block.id}
            block={block}
            updateBlock={updateBlock}
            addNewBlock={addNewBlock}
            deleteBlock={deleteBlock}
            lineNum={index}
          />
        );
      });
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>{renderContent()}</div>
    </div>
  );
};

export default EditablePage;
