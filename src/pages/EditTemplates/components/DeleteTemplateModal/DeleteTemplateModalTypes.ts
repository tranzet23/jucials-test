import { TIsModalOpen } from 'pages/EditTemplates/EditTemplatesTypes';
import { RouteComponentProps } from 'react-router-dom';

export interface IDeleteTemplateModalTypes extends RouteComponentProps {
  condition: TIsModalOpen;
  setIsModalOpen: (condition) => void;
  itemName: string | undefined;
  itemId: number | undefined;
  isBlock: boolean;
  deleteHandler: (id: number) => void;
  setSelectedItem: (id: any) => void;
  setTemplateBlocks: (any) => void;
  isTemplateExists: any;
  setItem: any;
  isTemplate: boolean;
}
