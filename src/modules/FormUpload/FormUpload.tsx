import { useState } from 'react';
import { Row, Col, Card, Form } from 'reactstrap';
import Dropzone from 'react-dropzone';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { RootState } from 'store/reducers';
import { addAudioFile, setIsUploadAudio } from 'store/actions';
import { SpinerLoadFile } from 'components';
import { IFormUploadProps } from './FormUploadTypes';

const FormUpload = ({
  history,
  title,
  isUploadingFile,
  addAudioFile,
}: IFormUploadProps) => {
  const [selectedFiles, setSelectedFiles] = useState([]);

  function handleAcceptedFiles(files: any) {
    files.map((file: any) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
        formattedSize: formatBytes(file.size),
      }),
    );
    setSelectedFiles(files);
  }

  /**
   * Formats the size
   */
  function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }

  const onClickUploadFile = () => {
    if (selectedFiles.length > 0) {
      addAudioFile(selectedFiles[0], history);
    }
  };

  const getElementControl = () => {
    if (selectedFiles.length > 0) {
      if (isUploadingFile) {
        return <SpinerLoadFile />;
      } else {
        return (
          <button
            type='button'
            className='btn btn-primary '
            onClick={onClickUploadFile}
          >
            Загрузить
          </button>
        );
      }
    }
  };

  return (
    <>
      <div className='h5 card-title'>
        <strong>{title}</strong>
      </div>

      <Form>
        <Dropzone
          onDrop={acceptedFiles => {
            handleAcceptedFiles(acceptedFiles.slice(0, 1));
          }}
          accept={'audio/*,video/*'}
        >
          {({ getRootProps, getInputProps }) => (
            <div className='dropzone'>
              <div className='dz-message needsclick mt-2' {...getRootProps()}>
                <input {...getInputProps()} />
                <div className='mb-3'>
                  <i className='display-4 text-muted bx bxs-cloud-upload' />
                </div>
                <h4>Поместите файл сюда или нажмите, чтобы выбрать его.</h4>
              </div>
            </div>
          )}
        </Dropzone>
        <div className='dropzone-previews mt-3' id='file-previews'>
          {selectedFiles.map((f: any, i) => {
            return (
              <Card
                className='mt-1 mb-0 shadow-none border dz-processing dz-image-preview dz-success dz-complete'
                key={i + '-file'}
              >
                <div className='p-2'>
                  <Row className='align-items-center'>
                    <Col>
                      <Link to='#' className='text-muted font-weight-bold'>
                        {f.name}
                      </Link>
                      <p className='mb-0'>
                        <strong>{f.formattedSize}</strong>
                      </p>
                    </Col>
                  </Row>
                </div>
              </Card>
            );
          })}
        </div>
      </Form>

      <div className='text-center mt-4'>{getElementControl()}</div>
    </>
  );
};
const mapStatetoProps = (state: RootState) => {
  const { isUploadingAudio } = state.JudicialHearing;
  const { currentTemplate } = state.DocTemplates;

  return {
    isUploadingFile: isUploadingAudio,
    currentTemplate,
  };
};
export default connect(mapStatetoProps, { addAudioFile, setIsUploadAudio })(
  withRouter(FormUpload),
);
