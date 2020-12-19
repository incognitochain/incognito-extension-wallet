import { ACTION_FETCHED } from './Templates.constant';

export const actionFetched = (payload: any) => ({
    type: ACTION_FETCHED,
    payload,
});
