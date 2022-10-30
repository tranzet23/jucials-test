export interface IActionStatusMessage {
  status?: 'success' | 'error' | 'fail';
  message?: string;
  setActionStatus: ({ message }) => {};
}
