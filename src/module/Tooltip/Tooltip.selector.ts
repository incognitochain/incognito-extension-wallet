import { createSelector } from 'reselect';
import { IRootState } from 'src/redux/interface';
import { ITooltipReducer } from './Tooltip.reducer';

export const tooltipSelector = createSelector(
    (state: IRootState) => state.tooltip,
    (tooltip: ITooltipReducer) => tooltip.data,
);
