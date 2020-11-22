import { Dispatch } from 'redux';
import { IRootState } from 'src/redux/interface';
import { ACTION_FETCHING, ACTION_FETCHED } from './Preload.constant';
import { IPreloadReducer } from './Preload.reducer';
import { goServices, setConfig } from 'incognito-js/build/web/browser';
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
    await setConfig({
      ...configs,
      wasmPath: `${ENVS.REACT_APP_DOMAIN_URL}/privacy.wasm`,
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
