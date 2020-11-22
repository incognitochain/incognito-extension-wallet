import { createSelector } from 'reselect';
import { IRootState } from 'src/redux/interface';

export const sendSelector = createSelector(
  (state: IRootState) => state.send,
  (send) => send
);
