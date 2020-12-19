import toLower from 'lodash/toLower';
import trim from 'lodash/trim';
import { formValueSelector } from 'redux-form';
import { createSelector } from 'reselect';
import { IRootState } from 'src/redux/interface';
import { FORM_CONFIGS } from './Header.searchBox';

export const keySearchSelector = createSelector(
    (state: IRootState) => state,
    (state) => {
        const selector = formValueSelector(FORM_CONFIGS.formName);
        const searchBoxValue = selector(state, FORM_CONFIGS.searchBox);
        return trim(toLower(searchBoxValue)) || '';
    },
);
