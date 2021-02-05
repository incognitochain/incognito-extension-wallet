import { createSelector } from 'reselect';

export const templateSelector = createSelector(
    (state: any) => state.template,
    (template) => template,
);
