import { ACTION_FETCHED, ACTION_TOGGLE_HOME_CONFIGS } from './Setting.constant';

export const actionFetched = (payload: object) => ({
  type: ACTION_FETCHED,
  payload,
});

export const actionToggleHomeConfigs = () => ({
  type: ACTION_TOGGLE_HOME_CONFIGS,
});
