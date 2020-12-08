import { ACTION_FETCHED } from "./Templates.constant";

export const actionFetched = (payload: object) => ({
  type: ACTION_FETCHED,
  payload
});
