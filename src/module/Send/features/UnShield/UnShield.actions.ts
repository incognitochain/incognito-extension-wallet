/* eslint-disable no-await-in-loop */
/* eslint-disable no-plusplus */
import { IRootState } from 'src/redux/interface';
import { centralizedWithdraw, decentralizedWithdraw } from 'incognito-js/build/web/browser';
import { Dispatch } from 'redux';
import { signPublicKeyEncodeSelector } from 'src/module/Account';
import { filterLastRawWithdrawTx } from './UnShield.utils';
import { unShieldStorageDataSelector } from './UnShield.selector';
import {
    ACTION_ADD_STORAGE_DATA_DECENTRALIZED,
    ACTION_REMOVE_STORAGE_DATA_DECENTRALIZED,
    ACTION_ADD_STORAGE_DATA_CENTRALIZED,
    ACTION_REMOVE_STORAGE_DATA_CENTRALIZED,
    ACTION_ADD_STORAGE_RAW_DATA_DECENTRALIZED,
    ACTION_REMOVE_STORAGE_RAW_DATA_DECENTRALIZED,
    ACTION_ADD_STORAGE_RAW_DATA_CENTRALIZED,
    ACTION_REMOVE_STORAGE_RAW_DATA_CENTRALIZED,
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

// raw tx
export const actionAddStorageRawDataDecentralized = (payload: {
    tx: {
        burningTxId: string;
        data: any;
    };
}) => ({
    type: ACTION_ADD_STORAGE_RAW_DATA_DECENTRALIZED,
    payload,
});

export const actionRemoveStorageRawDataDecentralized = (payload = { burningTxId: '' }) => ({
    type: ACTION_REMOVE_STORAGE_RAW_DATA_DECENTRALIZED,
    payload,
});

export const actionAddStorageRawDataCentralized = (payload: {
    tx: {
        burningTxId: string;
        data: any;
    };
}) => ({
    type: ACTION_ADD_STORAGE_RAW_DATA_CENTRALIZED,
    payload,
});

export const actionRemoveStorageRawDataCentralized = (payload = { burningTxId: '' }) => ({
    type: ACTION_REMOVE_STORAGE_RAW_DATA_CENTRALIZED,
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
            dispatch(
                actionRemoveStorageRawDataDecentralized({
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
            dispatch(
                actionRemoveStorageRawDataCentralized({
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

export const actionRetryLastRawWithdrawTxsDecentralized = () => async (
    dispatch: Dispatch,
    getState: () => IRootState,
) => {
    const state: IRootState = getState();
    const { decentralizedRawTxs } = unShieldStorageDataSelector(state);
    const { txs } = decentralizedRawTxs;
    const signPublicKey = signPublicKeyEncodeSelector(state);
    let _txs = [...txs];
    for (let index = 0; index < txs.length; index++) {
        const tx = txs[index];
        const result = await filterLastRawWithdrawTx({
            tx,
        });
        if (!result) {
            _txs = [...txs].filter((value) => value.burningTxId !== tx.burningTxId);
            dispatch(
                actionRemoveStorageRawDataDecentralized({
                    burningTxId: tx.burningTxId,
                }),
            );
        }
    }
    _txs.map((item) => {
        try {
            dispatch(
                actionRemoveStorageRawDataDecentralized({
                    burningTxId: item.burningTxId,
                }),
            );
            decentralizedWithdraw({ ...item.data, signPublicKey });
        } catch (error) {
            console.debug(error);
        }
        return item;
    });
};

export const actionRetryLastRawWithdrawTxsCentralized = () => async (
    dispatch: Dispatch,
    getState: () => IRootState,
) => {
    const state: IRootState = getState();
    const { centralizedRawTxs } = unShieldStorageDataSelector(state);
    const { txs } = centralizedRawTxs;
    const signPublicKey = signPublicKeyEncodeSelector(state);
    let _txs = [...txs];
    for (let index = 0; index < txs.length; index++) {
        const tx = txs[index];
        const result = await filterLastRawWithdrawTx({
            tx,
        });
        if (!result) {
            _txs = [...txs].filter((value) => value.burningTxId !== tx.burningTxId);
            dispatch(
                actionRemoveStorageRawDataCentralized({
                    burningTxId: tx.burningTxId,
                }),
            );
        }
    }
    _txs.map((item) => {
        try {
            dispatch(
                actionRemoveStorageRawDataCentralized({
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
