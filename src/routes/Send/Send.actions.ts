import { ACTION_FETCHED } from './Send.constant';

export const actionFetched = (payload: object) => ({
  type: ACTION_FETCHED,
  payload,
});
