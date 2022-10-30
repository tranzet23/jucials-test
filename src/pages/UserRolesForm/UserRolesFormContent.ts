export interface IFormFieldsContent {
  name: string;
  right_id: number;
  title: string;
  children: IFormFieldsContentChildren[];
}

interface IFormFieldsContentChildren {
  name: string;
  right_id: number;
  title: string;
  access: boolean;
}
