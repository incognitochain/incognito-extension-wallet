import {
  ACTION_FETCHING,
  ACTION_FETCHED,
  ACTION_FETCH_FAIL,
} from './Home.constant';
import { apiGetHomeConfigs } from './Home.services';

export const actionFetching = () => ({
  type: ACTION_FETCHING,
});

export const actionFetched = (payload: any) => ({
  type: ACTION_FETCHED,
  payload,
});

export const actionFetchFail = () => ({
  type: ACTION_FETCH_FAIL,
});

export const actionFetch = () => async (dispatch: any, getState: any) => {
  const { isFetching } = getState()?.home;
  if (isFetching) {
    return;
  }
  let categories = [];
  let headerTitle = '';
  try {
    await dispatch(actionFetching());
    const { data } = await apiGetHomeConfigs();
    categories = data?.categories || [];
    headerTitle = data?.headerTitle?.title.replace('\\n', '\n') || '';
  } catch (error) {
    console.debug('error', error);
  } finally {
    await dispatch(
      actionFetched({
        configs: {
          categories,
          headerTitle,
        },
      })
    );
  }
};
