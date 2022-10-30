import { TextEditor } from 'components';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { addDocxFile, setSelectedDocument } from 'store/actions';
import TemplateSelect from '../TemplateSelect/TemplateSelect';
import htmlDocx from 'html-docx-js/dist/html-docx';
import { RootState } from 'store/reducers';
import {
  fetchDocTemplate,
  fetchDocTemplates,
  setSelectedTemplate,
  setDocTemplate,
} from 'store/docTemplates/actions';
import SaveModalDoc from '../SaveDocModal/SaveDocModal';
import { getCaseAndHearingData } from 'store/judicialHearing/selectors';
import { IEditDoc } from './EditDocTypes';
import { HTML_ENCODING } from 'constants/app_сonstants';
import { Button } from "reactstrap";

// Функция для загрузки blob файла

function downloadBlob(blob, name = 'file.txt') {
  // Convert your blob into a Blob URL (a special url that points to an object in the browser's memory)
  const blobUrl = URL.createObjectURL(blob);

  // Create a link element
  const link = document.createElement('a');

  // Set link's href to point to the Blob URL
  link.href = blobUrl;
  link.download = name;

  // Append link to the body
  document.body.appendChild(link);

  // Dispatch click event on the link
  // This is necessary as link.click() does not work on the latest firefox
  link.dispatchEvent(
    new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
      view: window,
    }),
  );

  // Remove link from body
  document.body.removeChild(link);
}

const EditDoc = ({
  caseAndHearingData,
  userId,
  templates,
  currentTemplate,
  selectedTemplate,
  setSelectedTemplate,
  fetchDocTemplates,
  fetchDocTemplate,
  addDocxFile,
  editor,
  setEditor,
  selectedDocument,
  setSelectedDocument,
  setDocTemplate,
  documentText,
  currentDocument,
}: IEditDoc) => {
  const [editorText, setEditorText] = useState(currentTemplate?.content || documentText || '');
  const [initialText, setInitialText] = useState(currentTemplate?.content || documentText || '');
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);

  useEffect(() => {
    if (userId) {
      fetchDocTemplates(userId);
    }
  }, [fetchDocTemplates, userId]);

  // Получение шаблона при выборе и рендеринге
  useEffect(() => {
    if (selectedTemplate) {
      fetchDocTemplate(selectedTemplate);
    } else {
      setDocTemplate(undefined);
    }
  }, [fetchDocTemplate, selectedTemplate, setDocTemplate]);
  // Занесение
  useEffect(() => {
    if (currentTemplate) {
      setInitialText(currentTemplate?.content);
    } else if (documentText) {
      setInitialText(documentText);
    }
  }, [currentTemplate, documentText]);

  function getFileName() {
    if (caseAndHearingData) {
      return `Дело № ${caseAndHearingData.case_id}. Заседание от ${caseAndHearingData.date} ${caseAndHearingData.time}`;
    } else {
      return `${currentTemplate?.title}`;
    }
  }

  async function exportToWord() {
    let htmlString = HTML_ENCODING + '<body>' + editorText + '</body>';
    const fileBuffer = htmlDocx.asBlob(htmlString);

    downloadBlob(fileBuffer, getFileName() + '.docx');
  }

  function saveFile(fileName) {
    const fileBuffer = new Blob([editorText], { type: 'text/html' });
    const date = new Date().getMilliseconds();

    addDocxFile({
      file: fileBuffer,
      fileName: `${fileName} ${date}.html`,
      type: selectedTemplate || 0,
    });
  }

  return (
    <div className='row mb-4'>
      <div className='col--lg-12'>
        <div className='card'>
          <div className='card-body'>
            <div className='editor__controls mb-4'>
              <div className='editor__controls__left'>
                <TemplateSelect
                  templates={templates}
                  selectedTemplate={selectedTemplate}
                  setSelectedTemplate={setSelectedTemplate}
                  selectedDocument={selectedDocument}
                  setSelectedDocument={setSelectedDocument}
                  documents={caseAndHearingData?.documents}
                />
                <Link
                  to={`/${
                    currentTemplate ? 'templates' : 'documents'
                  }/edit/${
                    currentTemplate?.template_id || currentDocument?.id
                  }`}
                  className={`${!templates.length ? 'disabled' : ''}`}
                >
                  <Button color='primary' className='w-md d-flex justify-content-center' disabled={!templates.length}>
                    Редактировать
                  </Button>
                </Link>
                <Link to={'/templates/add'}>
                  <Button color='primary' className='w-lg d-flex justify-content-center'>
                    Добавить шаблон
                  </Button>
                </Link>
              </div>
              <div className='editor__buttons-container'>
                <button
                  className='btn btn-primary'
                  onClick={() => {
                    setIsSaveModalOpen(true);
                  }}
                >
                  Сохранить документ
                </button>
                <button
                  className='btn btn-primary export-button'
                  onClick={exportToWord}
                >
                  Экспорт в word
                </button>
              </div>
            </div>

            <TextEditor
              setEditorText={setEditorText}
              initialText={initialText}
              handleDeleteBlockClick={false}
              blocks={currentTemplate?.blocks}
              editor={editor}
              setEditor={setEditor}
            />
          </div>
        </div>
      </div>
      <SaveModalDoc
        caseAndHearingData={caseAndHearingData}
        selectedDoc={currentTemplate?.title}
        getFileName={getFileName}
        isSaveModalOpen={isSaveModalOpen}
        setIsSaveModalOpen={setIsSaveModalOpen}
        saveFile={saveFile}
      />
    </div>
  );
};

const mapStateToProps = (state: RootState) => {
  const { userId } = state.Profile;
  const { templates, currentTemplate, selectedTemplate } = state.DocTemplates;
  const caseAndHearingData: any = getCaseAndHearingData(state);
  const { selectedDocument, documentText, currentDocument } = state.JudicialHearing;

  return {
    userId,
    templates,
    currentTemplate,
    caseAndHearingData,
    selectedTemplate,
    selectedDocument,
    documentText,
    currentDocument,
  };
};

const mapDispatchToProps = {
  addDocxFile,
  setSelectedTemplate,
  fetchDocTemplate,
  fetchDocTemplates,
  setSelectedDocument,
  setDocTemplate,
};

export default connect(mapStateToProps, mapDispatchToProps)(EditDoc);
