import { ACTION_SHOW_TOOLTIP, ACTION_REMOVE_TOOLTIP } from './Tooltip.constant';

export const actionShowTooltip = ({
    id = '',
    text,
    timeout = 2,
    ref,
    width = 200,
    height = 100,
    margin = 10,
}: {
    id?: string;
    text: any;
    timeout?: number;
    ref: any;
    width?: number;
    height?: number;
    margin?: number;
}) => ({
    type: ACTION_SHOW_TOOLTIP,
    payload: { id, text, timeout, ref, width, height, margin },
});

export const actionRemoveTooltip = (id: string) => ({
    type: ACTION_REMOVE_TOOLTIP,
    payload: id,
});
