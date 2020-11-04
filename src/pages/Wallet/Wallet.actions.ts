import { ACTION_FETCHED } from './Wallet.constant';

export const actionFetched = (payload: object) => ({
  type: ACTION_FETCHED,
  payload,
});

export const actionInitWallet = () => async (dispatch: any, getState: any) => {
  try {
  } catch (error) {}
};
