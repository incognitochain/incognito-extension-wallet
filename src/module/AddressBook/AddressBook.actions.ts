import {
    ACTION_CREATE,
    ACTION_DELETE,
    ACTION_UPDATE,
    ACTION_SELECTED,
    ACTION_REMOVE_SELECTED,
} from './AddressBook.constant';
import { IPayload } from './AddressBook.interface';

export const actionCreate = (payload: IPayload) => ({
    type: ACTION_CREATE,
    payload,
});

export const actionUpdate = (payload: IPayload) => ({
    type: ACTION_UPDATE,
    payload,
});

export const actionDelete = (payload: IPayload) => ({
    type: ACTION_DELETE,
    payload,
});
export const actionSelectedReceiver = (payload: IPayload) => ({
    type: ACTION_SELECTED,
    payload,
});

export const actionRemoveSelectedReceiver = () => ({
    type: ACTION_REMOVE_SELECTED,
});
