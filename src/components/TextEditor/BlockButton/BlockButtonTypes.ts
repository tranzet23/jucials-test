import { IDocTemplateBlockGet } from 'store/docTemplates/types';

export interface IBlockButton {
  editor: any;
  item: IDocTemplateBlockGet;
  isEdit: boolean;
  handleDeleteBlockClick: false | ((blockName: string) => void);
  handleEditBlockClick: any;
}
