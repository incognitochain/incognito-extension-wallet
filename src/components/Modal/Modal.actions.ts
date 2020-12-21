import { ACTION_TOGGLE_MODAL } from './Modal.constant';

export const actionToggleModal = ({ data = null, visible = false }: { data?: any; visible?: boolean }) => ({
    type: ACTION_TOGGLE_MODAL,
    payload: { data, visible },
});
