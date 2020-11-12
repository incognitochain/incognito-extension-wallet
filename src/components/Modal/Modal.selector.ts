import { createSelector } from 'reselect';
import { IRootState } from 'src/redux/interface';
import { IModalReducer } from './Modal.reducer';

export const modalSelector = createSelector(
  (state: IRootState) => state.modal,
  (modal: IModalReducer) => modal
);
