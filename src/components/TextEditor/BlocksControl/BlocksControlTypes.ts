import { IDocTemplateBlock } from 'store/docTemplates/types';

export interface IBlocksControlTypes {
  editor: any;
  handleDeleteBlockClick: false | ((itemName: string) => void);
  handleEditBlockClick: any;
  blocks?: IDocTemplateBlock[] | [];
}
