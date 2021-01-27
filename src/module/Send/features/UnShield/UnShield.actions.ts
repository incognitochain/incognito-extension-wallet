import { IRootState } from 'src/redux/interface';
import { centralizedWithdraw, decentralizedWithdraw } from 'incognito-js/build/web/browser';
import { Dispatch } from 'redux';
import { signPublicKeyEncodeSelector } from 'src/module/Account';
import { unShieldStorageDataSelector } from './UnShield.selector';
import {
    ACTION_ADD_STORAGE_DATA_DECENTRALIZED,
    ACTION_REMOVE_STORAGE_DATA_DECENTRALIZED,
    ACTION_ADD_STORAGE_DATA_CENTRALIZED,
    ACTION_REMOVE_STORAGE_DATA_CENTRALIZED,
} from './UnShield.constant';

export const actionAddStorageDataDecentralized = (payload: {
    tx: {
        burningTxId: string;
        data: any;
    };
}) => ({
    type: ACTION_ADD_STORAGE_DATA_DECENTRALIZED,
    payload,
});

export const actionRemoveStorageDataDecentralized = (payload = { burningTxId: '' }) => ({
    type: ACTION_REMOVE_STORAGE_DATA_DECENTRALIZED,
    payload,
});

export const actionAddStorageDataCentralized = (payload: {
    tx: {
        burningTxId: string;
        data: any;
    };
}) => ({
    type: ACTION_ADD_STORAGE_DATA_CENTRALIZED,
    payload,
});

export const actionRemoveStorageDataCentralized = (payload = { burningTxId: '' }) => ({
    type: ACTION_REMOVE_STORAGE_DATA_CENTRALIZED,
    payload,
});

export const actionRetryLastWithdrawTxs = () => async (dispatch: Dispatch, getState: () => IRootState) => {
    const state: IRootState = getState();
    const { decentralized, centralized } = unShieldStorageDataSelector(state);
    const signPublicKey = signPublicKeyEncodeSelector(state);
    decentralized.txs.map((item) => {
        try {
            dispatch(
                actionRemoveStorageDataDecentralized({
                    burningTxId: item.burningTxId,
                }),
            );
            decentralizedWithdraw({ ...item.data, signPublicKey });
        } catch (error) {
            console.debug(error);
        }
        return item;
    });
    centralized.txs.map((item) => {
        try {
            dispatch(
                actionRemoveStorageDataCentralized({
                    burningTxId: item.burningTxId,
                }),
            );
            centralizedWithdraw({ ...item.data, signPublicKey });
        } catch (error) {
            console.debug(error);
        }
        return item;
    });
};
