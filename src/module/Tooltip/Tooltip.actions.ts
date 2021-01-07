import { ACTION_SHOW_TOOLTIP, ACTION_REMOVE_TOOLTIP } from './Tooltip.constant';

export const actionShowTooltip = ({
    text,
    timeout = 5,
    ref,
    width = 200,
    height = 100,
    margin = 10,
}: {
    text: any;
    timeout?: number;
    ref: any;
    width?: number;
    height?: number;
    margin?: number;
}) => ({
    type: ACTION_SHOW_TOOLTIP,
    payload: { text, timeout, ref, width, height, margin },
});

export const actionRemoveTooltip = (id: string) => ({
    type: ACTION_REMOVE_TOOLTIP,
    payload: id,
});
