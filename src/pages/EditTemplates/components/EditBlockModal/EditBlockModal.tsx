import { TIsModalOpen } from 'pages/EditTemplates/EditTemplatesTypes';
import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import { Button, Col, Input, Label, Modal, Row } from 'reactstrap';
import logoLightSvg from 'assets/images/logo-light.svg';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import Editor from 'ckeditor5-custom-build/build/ckeditor';
import { autocompletePhrases, people } from 'constants/autocomplete_phrases';
import {
  IDocTemplateBlock,
  IDocTemplateBlockAdd,
  IDocTemplateBlockGet,
} from 'store/docTemplates/types';

interface IEditBlockModal {
  condition: TIsModalOpen;
  setisModalOpen: (condition) => void;
  item: IDocTemplateBlockGet | null;
  setItemBlock: (data: any) => void;
  isTemplateExists: boolean;
  updateDocTemplate: (data: IDocTemplateBlock) => void;
  addDocTemplate: (data: IDocTemplateBlockAdd) => void;
  setTemplateBlocks: (any) => void;
  templateId: number;
}
let namesFeed: {}[] = Object.values(people).map(name =>
  toFeedObj(name, '"', ': '),
);
let autocompleteFeed: {}[] = autocompletePhrases.map(phrase =>
  toFeedObj(phrase, '!'),
);

function toFeedObj(phrase, initiateSymbol, endOfStr = '') {
  return { id: initiateSymbol + phrase, text: phrase + endOfStr };
}

const EditBlockModal = ({
  condition,
  setisModalOpen,
  item,
  setItemBlock,
  setTemplateBlocks,
  isTemplateExists,
  updateDocTemplate,
  addDocTemplate,
  templateId,
}: IEditBlockModal) => {
  const blockEditorToolbar = useRef<HTMLDivElement>(null);
  const [editBlockState, setEditBlockState] = useState({
    title: '',
    content: '',
  });
  useEffect(() => {
    if (condition === 'edit') {
      const title = item?.title ? item.title : '';
      const content = item?.content ? item.content : '';
      setEditBlockState({ title, content });
    }
  }, [item, condition]);
  function saveHandler() {
    // Если шаблон новый нам нужно сохранить новые блоки на фронте т.к шаблона нету в бд (он новый)
    if (!isTemplateExists) {
      if (!item?.template_id) {
        setTemplateBlocks(prevState => [
          ...prevState,
          { template_id: Math.floor(Math.random() * 9999), ...editBlockState },
        ]);
        return closeHandler();
      }

      setTemplateBlocks(prevState => {
        const newState = [...prevState];
        for (let i = 0; i < newState.length; i++) {
          const element = newState[i];
          if (element.template_id === item.template_id) {
            newState[i] = { ...element, ...editBlockState };
            break;
          }
        }

        return newState;
      });

      return closeHandler();
    }
    const title = editBlockState.title;
    const content = new Blob([editBlockState.content], { type: 'text/html' });

    if (item?.id) {
      const newBlock: any = {
        ...item,
        templateId,
        title,
        content,
      };
      updateDocTemplate(newBlock);
      return closeHandler();
    }

    addDocTemplate({ templateId, title, content });
    return closeHandler();
  }

  function closeHandler() {
    setisModalOpen(false);
    setItemBlock(null);
  }

  function titleInputHandler(e: ChangeEvent<HTMLInputElement>) {
    setEditBlockState(state => ({ ...state, title: e.target.value }));
  }

  return (
    <Modal
      className='edit__template_modal_wrapper'
      toggle={closeHandler}
      isOpen={condition === 'edit'}
      centered
    >
      <div className='modal-closebtn' onClick={closeHandler}>
        <i className='fas fa-times' />
      </div>
      <div>
        <div className='bg-primary bg-soft bg-relative template__edit_popup_title_wrapper'>
          <div className='text-primary'>
            <h5 className='text-primary  mb-1 popup__title'>
              {item ? 'Редактировать' : 'Создать'} шаблон блока
            </h5>
          </div>
          <div className='popup__logo_header'>
            <span className='logo-lg modal-heading'>
              <img src={logoLightSvg} alt='Лого' />
            </span>
          </div>
        </div>
        <div className='block__edit_body_wrapper'>
          <div className='block__edit_section_wrapper'>
            <Label className='name-label block__edit_label'>
              Название шаблона:
            </Label>
            <div className='template__title_input_wrapper edit__block_title_input_wrapper'>
              <i className='fas fa-pen template__input_img_edit' />
              <Input
                className='template__title_input'
                value={editBlockState.title}
                onChange={titleInputHandler}
              />
            </div>
          </div>

          <div className='block__edit_section_wrapper block__edit_section_editor'>
            <Label className='name-label block__edit_label'>
              Содержание шаблона:
            </Label>
            <div className='block__edit_editor_wrapper'>
              <Row>
                <Col>
                  <div
                    className='block__edit_toolbar'
                    ref={blockEditorToolbar}
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <div className='block__edit_editor'>
                    <CKEditor
                      onReady={editor => {
                        // @ts-ignore
                        blockEditorToolbar.current.prepend(
                          editor.ui.view.toolbar.element,
                        );
                      }}
                      editor={Editor}
                      onChange={(_, editor) => {
                        const data = editor.getData();
                        setEditBlockState(prevState => ({
                          ...prevState,
                          content: data,
                        }));
                      }}
                      data={editBlockState.content}
                      config={{
                        mention: {
                          feeds: [
                            {
                              marker: '"',
                              feed: namesFeed,
                              minimumCharacters: 1,
                              dropdownLimit: 4,
                            },
                            {
                              marker: '!',
                              feed: autocompleteFeed,
                              minimumCharacters: 1,
                              dropdownLimit: 6,
                            },
                          ],
                        },
                        fontSize: {
                          options: [8, 10, 12, 14, 16, 18, 22, 24, 26],
                        },
                      }}
                    />
                  </div>
                </Col>
              </Row>
            </div>
          </div>

          <div className='modal__buttons template_edit_modal_btns_wrapper'>
            <Button
              className='edit__block_modal_btn_cancel'
              onClick={closeHandler}
              color='secondary'
            >
              Отмена
            </Button>
            <Button
              className='edit__block_modal_btn_primary'
              color='primary'
              onClick={saveHandler}
            >
              Сохранить
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default EditBlockModal;
