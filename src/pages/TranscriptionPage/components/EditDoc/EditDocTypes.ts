import {IDocument, IJudicialAndHearingData} from "store/judicialHearing/types";
import {IDocTemplateGet} from "store/docTemplates/types";

export interface IEditDoc {
  caseAndHearingData: IJudicialAndHearingData;
  userId: number | undefined;
  templates: IDocTemplateGet[];
  currentTemplate: IDocTemplateGet;
  selectedTemplate: number | null;
  setSelectedTemplate: (id: string) => void;
  fetchDocTemplates: (userId: number) => void;
  fetchDocTemplate: (templateId: number) => void;
  addDocxFile: (any) => void;
  editor: any;
  setEditor: React.Dispatch<React.SetStateAction<any>>;
  selectedDocument: number;
  setSelectedDocument: (id: number | null) => void;
  setDocTemplate: (any) => void;
  documentText: string;
  currentDocument: IDocument;
}