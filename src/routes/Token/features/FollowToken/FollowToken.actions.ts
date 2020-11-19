import { ACTION_FETCHED } from './FollowToken.constant';

export const actionFetched = (payload: object) => ({
  type: ACTION_FETCHED,
  payload,
});
