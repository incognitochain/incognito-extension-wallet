import { Dispatch } from 'redux';
import { IRootState } from 'src/redux/interface';
import {
  ACTION_FETCHING,
  ACTION_FETCHED,
  ACTION_SET_SERVER,
  ACTION_SET_CONFIGS,
} from './Preload.constant';
import { IPreloadConfigs, IPreloadReducer } from './Preload.reducer';
import {
  goServices,
  setConfig,
  storageService,
} from 'incognito-js/build/web/browser';
import {
  actionHandleLoadWallet,
  actionInitWallet,
  IWalletReducer,
  walletSelector,
} from 'src/routes/Wallet';
import { preloadSelector } from './Preload.selector';
import { actionFetch as actionLoadHomeConfigs } from 'src/routes/Home';
import { ENVS } from 'src/configs';
import {
  actionFetchPCustomTokenList,
  actionFetchPTokenList,
} from 'src/routes//Token';
import { IServer } from 'src/services';

export const actionFetching = () => ({
  type: ACTION_FETCHING,
});

export const actionFetched = (payload: any) => ({
  type: ACTION_FETCHED,
  payload,
});

export const actionFetch = () => async (
  dispatch: Dispatch,
  getState: () => IRootState
) => {
  const state: IRootState = getState();
  const preload: IPreloadReducer = preloadSelector(state);
  const walletState: IWalletReducer = walletSelector(state);
  const { configs } = preload;
  const { mainnet } = configs;
  const field = mainnet ? 'mainnet' : 'testnet';
  const init = walletState[field].init;
  try {
    await dispatch(actionFetching());
    storageService.implement({
      setMethod: async (key: string, data: any) => {
        return localStorage.setItem(key, data);
      },
      getMethod: async (key: string) => {
        return localStorage.getItem(key);
      },
      removeMethod: async (key: string) => localStorage.removeItem(key),
      namespace: 'EXTENSION_WALLET',
    });
    await setConfig({
      ...configs,
      wasmPath: `${ENVS.REACT_APP_DOMAIN_URL}/privacy.wasm`,
      logMethod: (message: string) => console.debug(`MESSAGE`, message),
    });
    await goServices.implementGoMethodUseWasm();
    let task: any[] = [
      actionLoadHomeConfigs()(dispatch, getState),
      actionFetchPTokenList()(dispatch, getState),
      actionFetchPCustomTokenList()(dispatch, getState),
    ];
    if (!init) {
      task = [...task, actionInitWallet()(dispatch, getState)];
    } else {
      task = [...task, actionHandleLoadWallet()(dispatch, getState)];
    }
    await Promise.all(task);
  } catch (error) {
    console.debug(error);
  } finally {
    dispatch(actionFetched({}));
  }
};

export const actionSetServer = (payload: IServer) => ({
  type: ACTION_SET_SERVER,
  payload,
});

export const actionSetConfigs = (payload: IPreloadConfigs) => ({
  type: ACTION_SET_CONFIGS,
  payload,
});
