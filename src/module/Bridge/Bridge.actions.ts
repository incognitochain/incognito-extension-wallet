import BRIDGE_ACTION_NAME from './Bridge.actionsName';

export const actionSelectHeaderTab = (payload: { tab: string }) => ({
    type: BRIDGE_ACTION_NAME.CHANGE_HEADER_TAB,
    payload,
});

export const actionUpdateMetamaskConnectAccounts = (payload: { accounts: string[] }) => ({
    type: BRIDGE_ACTION_NAME.UPDATE_METAMASK_CONNECT_ACCOUNT,
    payload,
});
