import { apiGetProfile, getToken } from 'incognito-js/build/web/browser';
import { Dispatch } from 'redux';
import { IRootState } from 'src/redux/interface';
import { camelCaseKeys } from 'src/utils/object';
import { authTokenSelector } from 'src/module/Preload';
import { ACTION_FETCHED, ACTION_FETCH_FAIL } from './Profile.constant';

export const actionFetched = (payload: any) => ({
    type: ACTION_FETCHED,
    payload,
});

export const actionFetchFail = () => ({
    type: ACTION_FETCH_FAIL,
});

export const actionFetchProfile = () => async (dispatch: Dispatch, getState: () => IRootState) => {
    try {
        const state = getState();
        let profile;
        let token;
        const userProfile: any = await apiGetProfile();
        profile = {
            ...camelCaseKeys(userProfile),
        };
        const { deviceId, deviceToken } = authTokenSelector(state);
        if (deviceId && deviceToken) {
            token = await getToken(deviceId, deviceToken);
        }
        dispatch(actionFetched({ ...profile, token }));
    } catch (error) {
        dispatch(actionFetchFail());
        throw error;
    }
};
