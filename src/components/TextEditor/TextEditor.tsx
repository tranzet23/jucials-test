import React, { useRef } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import Editor from 'ckeditor5-custom-build/build/ckeditor';
import { autocompletePhrases } from 'constants/autocomplete_phrases';
import BlocksControl from './BlocksControl/BlocksControl';
import { ITextEditorTypes } from './TextEditorTypes';
import { RootState } from 'store/reducers';
import { getDataHearing } from 'store/judicialHearing/selectors';
import { connect } from 'react-redux';

function toFeedObj(phrase, initiateSymbol, endOfStr = '') {
  return { id: initiateSymbol + phrase, text: phrase + endOfStr };
}

function TextEditor({
  setEditorText,
  initialText,
  handleDeleteBlockClick,
  handleEditBlockClick,
  blocks,
  editor,
  setEditor,
  hearingData,
}: ITextEditorTypes) {
  const editorToolbar = useRef<HTMLDivElement>(null);
  return (
    <>
      <div className='row'>
        <div ref={editorToolbar} className='document-editor__toolbar' />
      </div>
      <div className='row-editor'>
        <div className='editor-container'>
          {/*// @ts-ignore*/}
          <CKEditor
            onReady={editor => {
              // Insert the toolbar before the editable area.
              editorToolbar.current?.prepend(editor.ui.view.toolbar.element);
              setEditor(editor);
              editor.setData(initialText)
            }}
            onError={({ willEditorRestart }) => {
              // If the editor is restarted, the toolbar element will be created once again.
              // The `onReady` callback will be called again and the new toolbar will be added.
              // This is why you need to remove the older toolbar.
              if (willEditorRestart) {
                editor.ui.view.toolbar.element.remove();
              }
            }}
            onChange={(event, editor) => {
              setEditorText(editor.getData());
            }}
            editor={Editor}
            data={initialText}
            config={{
              mention: {
                feeds: [
                  {
                    marker: '"',
                    feed: hearingData
                      ? Object.values(hearingData?.participants).map(person =>
                          toFeedObj(
                            `${person.lastname} ${person.name} ${person.surname}`,
                            '"',
                            ': ',
                          ),
                        )
                      : [],
                    minimumCharacters: 1,
                    dropdownLimit: 4,
                  },
                  {
                    marker: '!',
                    feed: autocompletePhrases.map(phrase =>
                      toFeedObj(phrase, '!'),
                    ),
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
        <BlocksControl
          editor={editor}
          handleDeleteBlockClick={handleDeleteBlockClick}
          handleEditBlockClick={handleEditBlockClick}
          blocks={blocks}
        />
      </div>
    </>
  );
}

const mapStateToProps = (state: RootState) => {
  const hearingData = getDataHearing(state);

  return {
    hearingData,
  };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(TextEditor);
