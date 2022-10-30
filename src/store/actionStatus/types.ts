export interface IActionStatusReducer {
  status?: 'success' | 'error' | 'fail';
  message?: string;
}
