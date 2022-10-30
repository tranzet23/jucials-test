import React, { useState, useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import { Button } from 'reactstrap';
import { RootState } from 'store/reducers';
import {
  getSoundFile,
  getInfoJudicialHearing,
  getJudicialCaseInfo,
  setActionStatus,
  startTranscribation,
} from 'store/actions';
import { AudioProcessing } from 'pages';
import { updateDocTemplate, addDocTemplate } from 'store/docTemplates/actions';
import { getTheFirstLetter, parseTime } from 'utils/app_helper';
import { Breadcrumbs, PlayerMemo } from 'components';
import TranscribationStartButton from 'components/Player/components/TranscribationStartButton/TranscribationStartButton';
import EditDoc from './components/EditDoc/EditDoc';
import {
  IPlayerTypes,
  ITranscribationInfo,
  ITranscriptionPage,
} from './TranscriptionPageTypes';
import { getStatusAudio } from 'store/transcription/selectors';

function transcriptionDataToString(
  data: ITranscribationInfo[],
  isTimeShow: boolean = false,
) {
  let text = '';

  for (let paragraph of data) {
    let time = isTimeShow
      ? ` ${parseTime(paragraph.startTime)} - ${parseTime(paragraph.endTime)}`
      : '';

    text += `<p><span style="color:${paragraph.color};"><strong>${paragraph.name}${time}:</strong></span> ${paragraph.text}</p>`;
  }

  return text;
}

const TranscriptionPage = ({
  getSoundFile,
  soundFilePath,
  waveform,
  getInfoJudicialHearing,
  getJudicialCaseInfo,
  currentTemplate,
  addDocTemplate,
  updateDocTemplate,
  setActionStatus,
  startTranscribation,
  transcribationText,
  dataHearing,
  transcribationStatus,
  isPlayerReady,
  soundFileStatus,
}: ITranscriptionPage) => {
  const [playerType, setPlayerType] = useState<IPlayerTypes>('mono');
  const [editor, setEditor] = useState<any>(null);
  const [isTranscriptionLoading, setIsTranscriptionLoading] = useState(false);

  const [isTranscribationTime, setIsTranscribationTime] = useState(false);

  const updateParticipantsBlock = useCallback(() => {
    function assignParticipants(transcribationData) {
      return transcribationData?.map(phrase => {
        let speakingPerson = dataHearing?.participants.find(person => {
          return parseInt(person.channel) === parseInt(phrase.speakerTag);
        });
        phrase.color = speakingPerson?.color;
        phrase.name = speakingPerson
          ? `${speakingPerson.lastname}
        
      ${speakingPerson.name ? getTheFirstLetter(speakingPerson.name) + '.' : ''}
      ${
        speakingPerson.surname
          ? getTheFirstLetter(speakingPerson.surname) + '.'
          : ''
      }`
          : `Канал ${phrase.channel || phrase.speakerTag}`;

        return phrase;
      });
    }

    if (transcribationText && dataHearing) {
      let blockText = assignParticipants(transcribationText);
      blockText = transcriptionDataToString(blockText, isTranscribationTime);
      // if (currentTemplate && dataHearing) {
      //   // let isBlockUpdated = false;
      //   // const defaultTitle = 'Автоматическая транскрибация';
      //   // const templateId = currentTemplate?.template_id;
      //   // const content = new Blob([blockText], { type: 'text/html' });
      //   // Если блок существует обновляем его
      //   // if (currentTemplate?.blocks) {
      //   //   for (let block of currentTemplate.blocks) {
      //   //     if (block.title === 'Автоматическая транскрибация') {
      //   //       updateDocTemplate({
      //   //         id: block.id,
      //   //         title: block.title,
      //   //         templateId: templateId,
      //   //         content: content,
      //   //       });
      //   //       isBlockUpdated = true;
      //   //       break;
      //   //     }
      //   //   }
      //   // }
      //   // // Если блока нет создаём новый
      //   // if (!isBlockUpdated) {
      //   //   addDocTemplate({ templateId, title: defaultTitle, content });
      //   // }
      // }
      return blockText;
    }
  }, [
    transcribationText,
    // updateDocTemplate,
    // addDocTemplate,
    // currentTemplate,
    isTranscribationTime,
    dataHearing,
  ]);

  useEffect(() => {
    getInfoJudicialHearing();
  }, [getInfoJudicialHearing]);

  useEffect(() => {
    getJudicialCaseInfo();
  }, [getJudicialCaseInfo]);

  // Обновляет блок автоматической транскрибации при изменении канала
  useEffect(() => {
    updateParticipantsBlock();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataHearing?.participants]);

  // Обработка ответа транскрибации
  useEffect(() => {
    function insertBlock(item, isTranscribation) {
      if (editor) {
        let content = editor.data.processor.toView(item.content);
        content = editor.data.toModel(content);
        editor.execute('insertSimpleBox', content, isTranscribation);
      } else {
        console.error('Editor not loaded');
      }
    }

    if (isTranscriptionLoading) {
      if (transcribationStatus === 'done') {
        let updatedContent = updateParticipantsBlock();
        insertBlock({ content: updatedContent }, true);

        setIsTranscriptionLoading(false);
        setActionStatus({
          message: 'Блок с транскрибацией был добавлен в текстовый редактор',
          status: 'success',
        });
      } else if (transcribationStatus === 'error') {
        setIsTranscriptionLoading(false);
        setActionStatus({
          message: 'Произошла ошибка транскрибации',
          status: 'error',
        });
      }
    }
  }, [
    isTranscriptionLoading,
    transcribationStatus,
    editor,
    setActionStatus,
    updateParticipantsBlock,
  ]);

  function handleTranscriptionStart() {
    startTranscribation();
    setIsTranscriptionLoading(true);
  }

  return (
    <>
      <Breadcrumbs
        title={'Аудиозапись'}
        breadcrumbItems={['Дела судебного участка', 'Данные']}
      />
      <AudioProcessing
        isPlayerReady={isPlayerReady}
        soundFileStatus={soundFileStatus}
      >
        <div
          className={`page-title-box page-heading ${
            playerType === 'hide' ? 'folded' : ''
          }`}
        >
          {playerType === 'hide' && <div />}
          <div className='player-container'>
            <PlayerMemo
              waveform={waveform}
              soundFilePath={soundFilePath}
              playerType={playerType}
              setPlayerType={setPlayerType}
            >
              <TranscribationStartButton
                handleTranscriptionStart={handleTranscriptionStart}
                setIsTranscribationTime={setIsTranscribationTime}
              />
            </PlayerMemo>
          </div>
          {playerType === 'hide' ? (
            <>
              <div />
              <Button
                color='primary'
                className='fold-button btn btn-outline-primary d-flex align-items-center player-fold__button justify-content-center w-lg control__channel-button'
                onClick={() => setPlayerType('mono')}
              >
                Развернуть плеер
              </Button>
              <TranscribationStartButton
                handleTranscriptionStart={handleTranscriptionStart}
                setIsTranscribationTime={setIsTranscribationTime}
              />
            </>
          ) : null}
        </div>
      </AudioProcessing>
      <br />
      <EditDoc editor={editor} setEditor={setEditor} />
    </>
  );
};

const mapStatetoProps = (state: RootState) => {
  const { soundFilePath, transcribationText, transcribationStatus, waveform } =
    state.Transcription;
  const { currentTemplate } = state.DocTemplates;
  const { dataHearing } = state.JudicialHearing;
  const { isPlayerReady } = state.Transcription;
  const soundFileStatus = getStatusAudio(state);

  return {
    soundFilePath,
    currentTemplate,
    transcribationText,
    dataHearing,
    transcribationStatus,
    waveform,
    isPlayerReady,
    soundFileStatus,
  };
};
export default connect(mapStatetoProps, {
  getSoundFile,
  getInfoJudicialHearing,
  getJudicialCaseInfo,
  updateDocTemplate,
  addDocTemplate,
  setActionStatus,
  startTranscribation,
})(TranscriptionPage);
