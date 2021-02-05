import { v4 } from 'uuid';
import { ACTION_SHOW_TOOLTIP, ACTION_REMOVE_TOOLTIP } from './Tooltip.constant';

export interface ITooltipReducer {
    data: Array<any>;
}

const initialState: ITooltipReducer = {
    data: [],
};

const reducer = (
    state = initialState,
    action: {
        type: string;
        payload: any;
    },
) => {
    switch (action.type) {
        case ACTION_SHOW_TOOLTIP: {
            let { data: tooltips } = state;
            const tooltip = action.payload;

            if (!tooltip.id) {
                tooltip.id = v4();
            }

            const newData = [...tooltips, tooltip];

            return {
                ...state,
                data: newData,
            };
        }
        case ACTION_REMOVE_TOOLTIP: {
            let { data: tooltips } = state;
            const removeTooltipId = action.payload;

            const newData = [...tooltips.filter((item) => item.id !== removeTooltipId)];

            return {
                ...state,
                data: newData,
            };
        }
        default:
            return state;
    }
};

export default reducer;
