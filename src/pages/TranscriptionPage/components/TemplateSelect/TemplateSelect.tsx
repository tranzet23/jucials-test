import React, {useEffect} from 'react';
import {Input} from 'reactstrap';
import {ITemplateSelect} from "./TemplateSelectTypes";

export default function TemplateSelect({
  selectedTemplate,
  setSelectedTemplate,
  selectedDocument,
  setSelectedDocument,
  templates,
  documents,
}: ITemplateSelect) {
  useEffect(() => {
    if (
      (!selectedTemplate || typeof selectedTemplate === 'string') &&
      templates[0] &&
      !selectedDocument
    ) {
      setSelectedTemplate(+templates[0]?.template_id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [templates]);

  return (
    <div className='d-flex align-items-center'>
      <h4 className='me-3 mb-0 card-title'>Документ:</h4>

      <Input
        type='select'
        className='form-select me-4 doc-file-select'
        value={selectedTemplate ? selectedTemplate : selectedDocument ? 0 - selectedDocument : 0}
        onChange={e => {
          let value = parseInt(e.target.value)
          if (value > 0) {
            setSelectedTemplate(value);
            setSelectedDocument(null)
          } else {
            setSelectedDocument(Math.abs(value))
            setSelectedTemplate(undefined)
          }
        }}
      >
        <optgroup label='Шаблоны'>
          {templates &&
            templates.map((item, index) => (
              <option value={item.template_id} key={`${item.title}_${index}`}>
                {item.title}
              </option>
            ))}
        </optgroup>
        {documents && documents.length &&
          <optgroup label='Сохранённые файлы'>
            {documents.map((doc, index) => <option value={0 - doc.id} key={`${doc.name}_${index}`}>{doc.name}</option>)}
          </optgroup>
        }
      </Input>
    </div>
  );
}
