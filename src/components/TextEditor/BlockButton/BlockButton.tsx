import React from 'react';
import { IBlockButton } from './BlockButtonTypes';

export default function BlockButton({
  editor,
  item,
  isEdit,
  handleDeleteBlockClick,
  handleEditBlockClick,
}: IBlockButton) {
  function insertBlock() {
    if (editor) {
      let content = editor.data.processor.toView(item.content);
      content = editor.data.toModel(content);
      editor.execute('insertSimpleBox', content, item.title === 'Автоматическая транскрибация');
    } else {
      console.error('Editor not loaded');
    }
  }

  return (
    <button
      onClick={() => {
        if (!isEdit) {
          insertBlock();
        }
      }}
      className={`editor-sidebar__button ${isEdit ? 'edit' : 'add'}`}
    >
      <div className='editor__sidebar_block_title_wrapper'>
        <i className='bx bx-add-to-queue' />
        <span className='editor__block_title'>{item.title}</span>
      </div>
      {isEdit && (
        <div className='block__edit-icons'>
          <i
            className='fas fa-pen'
            onClick={() => handleEditBlockClick(item)}
          />
          <i
            className='fas fa-trash-alt'
            onClick={() => {
              // @ts-ignore
              handleDeleteBlockClick(item);
            }}
          />
        </div>
      )}
    </button>
  );
}
