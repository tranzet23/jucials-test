import { RouteComponentProps } from 'react-router-dom';
import {
  IDocTemplate,
  IDocTemplateBlock,
  IDocTemplateGet,
} from 'store/docTemplates/types';
import {IDocument, SetDocument} from "store/judicialHearing/types";

export interface IEditTemplates extends RouteComponentProps {
  selectedTemplate: string;
  setSelectedTemplate: (name: any) => void;
  currentTemplate: IDocTemplateGet;
  fetchDocTemplates: (data: any) => void;
  blobUrl: any;
  updateDocTemplate: (data: IDocTemplate | IDocTemplateBlock) => void;
  addDocTemplate: (data: IDocTemplate | IDocTemplateBlock) => void;
  fetchDocTemplate: (id: number) => void;
  deleteDocTemplate: (id: number) => void;
  itemToRedirect: number;
  setDocTemplate: (any) => void;
  setDocTemplates: (any) => void;
  redirect: boolean;
  documentText?: string;
  selectedDocument?: number;
  currentDocument?: IDocument;
  setSelectedDocument: (id: number | null) => void;
  setDocument: SetDocument;
  updateDocumentText: (text: Blob, id: number) => void;
  deleteDocument: (id: number) => void;
}
export type TIsModalOpen = false | 'delete' | 'edit';
