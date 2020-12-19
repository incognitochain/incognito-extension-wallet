import { ACTION_TOGGLE_MODAL } from './Modal.constant';

export const actionToggleModal = ({ data, visible }: { data: any; visible: boolean }) => ({
    type: ACTION_TOGGLE_MODAL,
    payload: { data, visible },
});
