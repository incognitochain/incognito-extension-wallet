import { createSelector } from 'reselect';
import { IRootState } from 'src/redux/interface';
import { selectedPrivacySelector } from 'src/module/Token/Token.selector';
import { getSendData } from './Send.utils';

export const sendSelector = createSelector(
    (state: IRootState) => state.send,
    (send) => send,
);

export const sendDataSelector = createSelector(
    sendSelector,
    selectedPrivacySelector,
    (state: IRootState) => state,
    (send, selectedPrivacy, state) =>
        getSendData({
            send,
            selectedPrivacy,
            state,
        }),
);

export const forceSendDataSelector = createSelector(sendSelector, (send) => send.defaultForceSend);

export const userFeesSelector = createSelector(sendSelector, (send) => send.userFees);
