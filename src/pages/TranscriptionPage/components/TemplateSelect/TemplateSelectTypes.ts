import {IDocTemplateGet} from "store/docTemplates/types";
import {IDocument} from "store/judicialHearing/types";

export interface ITemplateSelect {
  selectedTemplate: number | null;
  setSelectedTemplate: (number) => void;
  selectedDocument: number | null;
  setSelectedDocument: (id: number | null) => void;
  templates: IDocTemplateGet[];
  documents: IDocument[];
}