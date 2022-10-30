import React from 'react';
import {IJudicialHearingData} from "store/judicialHearing/types";

export interface ITextEditorTypes {
  setEditorText: React.Dispatch<React.SetStateAction<string>>;
  initialText: string;
  handleDeleteBlockClick: false | ((blockName: string) => void);
  handleEditBlockClick?: any;
  blocks?: any;
  editor: any;
  setEditor: React.Dispatch<React.SetStateAction<any>>;
  hearingData: IJudicialHearingData | undefined;
}
