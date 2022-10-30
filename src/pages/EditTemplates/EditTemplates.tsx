import { connect } from 'react-redux';
import { RootState } from 'store/reducers';
import { Breadcrumbs, TextEditor } from 'components';
import { CardBody, Row, Col, Card, Input, Button } from 'reactstrap';
import React, { ChangeEvent, useEffect, useState } from 'react';
import DeleteTemplateModal from './components/DeleteTemplateModal/DeleteTemplateModal';
import { IEditTemplates, TIsModalOpen } from './EditTemplatesTypes';
import EditTemplateModal from './components/EditBlockModal/EditBlockModal';
import { Link, Redirect, useParams, withRouter } from 'react-router-dom';
import {
  addDocTemplate,
  deleteDocTemplate,
  fetchDocTemplate,
  fetchDocTemplates,
  setDocTemplate,
  setDocTemplates,
  setSelectedTemplate,
  updateDocTemplate,
} from 'store/docTemplates/actions';
import {
  setSelectedDocument,
  setDocument,
  updateDocumentText,
  deleteDocument,
} from 'store/judicialHearing/actions';
import {
  IDocTemplateAdd,
  IDocTemplateBlock,
  IDocTemplateBlockGet,
} from 'store/docTemplates/types';

function EditTemplates({
  currentTemplate,
  updateDocTemplate,
  addDocTemplate,
  fetchDocTemplate,
  itemToRedirect,
  deleteDocTemplate,
  setSelectedTemplate,
  setDocTemplate,
  history,
  setDocTemplates,
  redirect,
  documentText,
  selectedDocument,
  currentDocument,
  setSelectedDocument,
  setDocument,
  updateDocumentText,
  deleteDocument,
}: IEditTemplates) {
  // Текст редактора шаблона

  const [editorText, setEditorText] = useState(
    currentTemplate?.content || documentText || '',
  );
  const [initialText, setInitialText] = useState(
    currentTemplate?.content || documentText || '',
  );
  const [documentTitle, setDocumentTitle] = useState('');
  const [isModalOpen, setIsModalOpen] = useState<TIsModalOpen>(false);

  const [isBlock, setIsBlock] = useState(false);
  const [itemBlock, setItemBlock] = useState<IDocTemplateBlockGet | null>(null);
  // Массив блоков на случай если шаблон добавляется

  const [templateBlocks, setTemplateBlocks] = useState<IDocTemplateBlock | any>(
    [],
  );
  // Существующий шаблон или нет

  const [isEdit, setIsEdit] = useState<boolean>(
    Boolean(currentTemplate?.id || currentDocument?.id),
  );

  const [editor, setEditor] = useState<any>(null);
  const { templateId, documentId } = useParams<any>();
  const [isTemplate] = useState(!documentId);

  // Получает шаблон по id
  useEffect(() => {
    if (isTemplate) {
      if (templateId && !currentTemplate?.template_id) {
        fetchDocTemplate(templateId);
      } else if (!templateId) {
        setDocTemplate(null);
        setSelectedDocument(null);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [templateId]);

  useEffect(() => {
    if (isTemplate && currentTemplate?.template_id) {
      setInitialText(currentTemplate.content);
      setDocumentTitle(currentTemplate.title);
      setIsEdit(true);
    } else if (!isTemplate && currentDocument?.id) {
      setInitialText(documentText || '');
      setDocumentTitle(currentDocument.name);
      setIsEdit(true);
    } else {
      setInitialText('');
      setDocumentTitle('');
      setIsEdit(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    currentTemplate?.content,
    currentTemplate?.title,
    currentDocument,
    documentText,
  ]);

  useEffect(() => {
    setIsEdit(Boolean(currentTemplate?.template_id || currentDocument?.id));
  }, [currentTemplate?.template_id, currentDocument?.id]);

  const templateTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setDocumentTitle(e.target.value);
  };

  // Удаление шаблона
  function handleDeleteDocumentClick() {
    setIsBlock(false);
    setIsModalOpen('delete');
  }

  // Удаление блока
  function handleDeleteBlockClick(blockName) {
    setIsBlock(true);
    setItemBlock(blockName);
    setIsModalOpen('delete');
  }

  // Редактирование блока
  function handleEditBlockClick(blockName = null) {
    setIsBlock(true);
    setItemBlock(blockName);
    setIsModalOpen('edit');
  }

  if (redirect) {
    return <Redirect to={`/transcription/data`} />;
  }

  // Сохранение шаблона
  function handleDocumentSave() {
    if (isTemplate) {
      templateSave();
    } else {
      documentUpdate();
    }
  }

  // Если шаблон только создается сохранять нужно блоки тоже
  function templateSave() {
    const templateBlob = new Blob([editorText], { type: 'text/html' });

    if (isEdit) {
      const newTemplate: IDocTemplateAdd = {
        template_id: null,
        id: templateId,
        title: documentTitle,
        content: templateBlob,
      };
      updateDocTemplate(newTemplate);
      return history.push('/transcription/data');
    } else {
      const newTemplate: IDocTemplateAdd = {
        title: documentTitle,
        content: templateBlob,
        blocks: templateBlocks.map(item => ({
          ...item,
          content: new Blob([item.content], { type: 'text/html' }),
        })),
      };
      addDocTemplate(newTemplate);
    }
  }

  // Обновление документа
  function documentUpdate() {
    if (selectedDocument) {
      const fileBuffer = new Blob([editorText], { type: 'text/html' });
      updateDocumentText(fileBuffer, selectedDocument);
    }
  }

  return (
    <>
      <Breadcrumbs
        title={`${
          !isTemplate
            ? 'редактирование документа'
            : isEdit
            ? 'редактирование шаблона'
            : 'добавление шаблона'
        }`}
        breadcrumbItems={[
          'Дела судебного участка',
          `${
            !isTemplate
              ? 'Редактирование документа'
              : isEdit
              ? 'Редактирование шаблона'
              : 'Добавление шаблона'
          }`,
        ]}
      />
      <Row>
        <Col xs='12'>
          <Card>
            <CardBody>
              <div className='editor__controls mb-4'>
                <div className='editor__controls__left template__header'>
                  <h4 className='me-3 mb-0 card-title template__title'>
                    Шаблон документа:
                  </h4>
                  <div className='template__title_input_wrapper'>
                    <i className='fas fa-pen template__input_img_edit' />
                    <Input
                      className='template__title_input'
                      value={documentTitle}
                      onChange={templateTitleChangeHandler}
                      disabled={!isTemplate}
                    />
                  </div>
                </div>
                <div className='editor__buttons-container'>
                  <Link to='/transcription/data'>
                    <Button className='template__button template__cancel_button'>
                      Отмена
                    </Button>
                  </Link>
                  {isEdit && (
                    <>
                      <Button
                        color='primary'
                        className='template__button template__delete_button'
                        onClick={handleDeleteDocumentClick}
                      >
                        Удалить
                      </Button>
                    </>
                  )}
                  <>
                    <Button
                      className='template__button template__save_button'
                      color='primary'
                      onClick={handleDocumentSave}
                    >
                      Сохранить
                    </Button>
                  </>
                </div>
              </div>
              <TextEditor
                setEditorText={setEditorText}
                initialText={initialText}
                handleDeleteBlockClick={
                  isTemplate ? handleDeleteBlockClick : false
                }
                handleEditBlockClick={isTemplate ? handleEditBlockClick : false}
                blocks={
                  currentTemplate?.blocks
                    ? currentTemplate.blocks
                    : templateBlocks
                }
                editor={editor}
                setEditor={setEditor}
              />
            </CardBody>
          </Card>
        </Col>
      </Row>
      <DeleteTemplateModal
        condition={isModalOpen}
        setTemplateBlocks={setTemplateBlocks}
        isTemplateExists={isEdit}
        setIsModalOpen={setIsModalOpen}
        itemName={
          !isTemplate && currentDocument?.name
            ? currentDocument?.name
            : isBlock
            ? itemBlock?.title
            : currentTemplate?.title
        }
        itemId={
          !isTemplate
            ? currentDocument?.id
            : isBlock
            ? itemBlock?.id ?? itemBlock?.template_id
            : templateId
        }
        isBlock={isBlock}
        isTemplate={isTemplate}
        deleteHandler={isTemplate ? deleteDocTemplate : deleteDocument}
        setSelectedItem={isTemplate ? setSelectedTemplate : setSelectedDocument}
        setItem={isTemplate ? setDocTemplate : setDocument}
      />
      <EditTemplateModal
        isTemplateExists={isEdit}
        condition={isModalOpen}
        updateDocTemplate={updateDocTemplate}
        addDocTemplate={addDocTemplate}
        setTemplateBlocks={setTemplateBlocks}
        setisModalOpen={setIsModalOpen}
        setItemBlock={setItemBlock}
        templateId={templateId}
        item={itemBlock}
      />
    </>
  );
}

const mapStateToProps = (state: RootState) => {
  const { currentTemplate, itemToRedirect, redirect } = state.DocTemplates;
  const { documentText, selectedDocument, currentDocument } =
    state.JudicialHearing;
  return {
    currentTemplate,
    itemToRedirect,
    redirect,
    documentText,
    selectedDocument,
    currentDocument,
  };
};

export default connect(mapStateToProps, {
  setSelectedTemplate,
  fetchDocTemplates,
  fetchDocTemplate,
  updateDocTemplate,
  addDocTemplate,
  deleteDocTemplate,
  setDocTemplate,
  setDocTemplates,
  setSelectedDocument,
  setDocument,
  updateDocumentText,
  deleteDocument,
})(withRouter(EditTemplates));
