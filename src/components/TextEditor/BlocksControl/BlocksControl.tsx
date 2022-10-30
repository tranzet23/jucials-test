import React from 'react';
import { IBlocksControlTypes } from './BlocksControlTypes';
import BlockButton from '../BlockButton/BlockButton';
import { Button } from 'reactstrap';

export default React.memo(function BlocksControl({
  editor,
  handleDeleteBlockClick,
  handleEditBlockClick,
  blocks,
}: IBlocksControlTypes) {
  const isTemplateEdit = Boolean(handleDeleteBlockClick);
  return (
    <div className='editor-sidebar'>
      {blocks &&
        blocks.map(item => (
          <BlockButton
            key={`${item.title}_${item.id ?? item.template_id}`}
            editor={editor}
            item={item}
            isEdit={isTemplateEdit}
            handleDeleteBlockClick={handleDeleteBlockClick}
            handleEditBlockClick={handleEditBlockClick}
          />
        ))}

      {isTemplateEdit && (
        <div className='editor__blocks__add_btn_wrapper'>
          <Button color='primary' onClick={() => handleEditBlockClick(null)}>
            Добавить блок
          </Button>
        </div>
      )}
    </div>
  );
});
