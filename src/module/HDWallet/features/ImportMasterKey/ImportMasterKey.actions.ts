import { ACTION_FETCHED } from './ImportMasterKey.constant';

export const actionFetched = (payload: any) => ({
    type: ACTION_FETCHED,
    payload,
});
