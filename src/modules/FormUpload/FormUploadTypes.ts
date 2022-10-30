import { RouteComponentProps } from 'react-router-dom';

export interface IFormUploadProps extends RouteComponentProps {
  title: string;
  isUploadingFile: boolean;
  addAudioFile: (file: any, history) => {};
  setIsUploadAudio: (status: boolean) => {};
}
