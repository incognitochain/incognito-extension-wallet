import { ACTION_TOGGLE_MODAL } from './Modal.constant';

export const actionToggleModal = ({
    data = null,
    visible = false,
    isLoadingModal = false,
}: {
    data?: any;
    visible?: boolean;
    isLoadingModal?: boolean;
}) => ({
    type: ACTION_TOGGLE_MODAL,
    payload: { data, visible, isLoadingModal },
});
