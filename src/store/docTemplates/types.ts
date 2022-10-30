export interface IDocTemplate {
  id?: number;
  title: string;
  blocks?: IDocTemplateBlock[];
}

export interface IDocTemplateBlock {
  id?: number;
  template_id?: number;
  title: string;
}

export interface IDocTemplateBlockAdd extends IDocTemplateBlock {
  templateId: number;
  content: Blob;
}
export interface IDocTemplateBlockUpdate extends IDocTemplateBlock {
  templateId: number;
  content: Blob;
}
export interface IDocTemplateBlockGet extends IDocTemplateBlock {
  content: string;
}

export interface IDocTemplateAdd extends IDocTemplate {
  content: Blob;
  template_id?: any;
}

export interface IDocTemplateGet extends IDocTemplate {
  content: string;
  template_id: number;
}
export interface IDocTemplates {
  templates: IDocTemplate[];
  currentTemplate: IDocTemplate | null;
  redirect: boolean;
  msg?: { operationType: string; status: string };
  selectedTemplate: number | null;
}
