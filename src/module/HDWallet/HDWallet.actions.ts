import { ACTION_SET_ACTION_TYPE } from './HDWallet.constant';

export const actionSetActionType = (payload: number) => ({
    type: ACTION_SET_ACTION_TYPE,
    payload,
});
