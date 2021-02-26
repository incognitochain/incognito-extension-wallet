import { passwordSelector } from 'src/module/Password';
import { IRootState } from 'src/redux/interface';
import { Dispatch } from 'redux';
import { WalletInstance } from 'incognito-js/build/web/browser';
import { listIdsWalletSelector, loadWallet } from 'src/module/Wallet';
import { ACTION_UPDATE_MASTER_KEY, ACTION_SET_ACTION_TYPE, ACTION_LOADED_LIST_MASTER_KEY } from './HDWallet.constant';

export const actionSetActionType = (payload: number) => ({
    type: ACTION_SET_ACTION_TYPE,
    payload,
});

export const actionLoadedListMasterKey = (payload: { wallet: WalletInstance; walletId: number }[]) => ({
    type: ACTION_LOADED_LIST_MASTER_KEY,
    payload,
});

export const actionSetListMasterKey = () => async (dispatch: Dispatch, getState: () => IRootState) => {
    try {
        const state = getState();
        const listIds: number[] = listIdsWalletSelector(state);
        const pass = passwordSelector(state);
        let loadListWalletFromDB = [];
        loadListWalletFromDB = listIds.map((walletId: number) => loadWallet(walletId, pass));
        let listWallet: any[] = await Promise.all([...loadListWalletFromDB]);
        listWallet = listWallet.map((wallet: WalletInstance, index) => ({
            walletId: listIds[index],
            wallet,
        }));
        dispatch(actionLoadedListMasterKey(listWallet));
    } catch (error) {
        throw error;
    }
};

export const actionUpdateMasterKey = (payload: { walletId: number; wallet: WalletInstance }) => ({
    type: ACTION_UPDATE_MASTER_KEY,
    payload,
});
