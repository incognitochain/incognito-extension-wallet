import React from 'react';
import { formValueSelector, reset } from 'redux-form';
import { FORM_CONFIGS } from './Header.searchBox';
import { useSelector, useDispatch } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import toLower from 'lodash/toLower';
import { trim } from 'lodash';
import { useLocation } from 'react-router-dom';

interface IProps {
  data: any[];
  handleFilter: () => any[];
}

export interface ISearchBox {
  result: any[];
  keySearch: string;
  handleFilter: () => any[];
}

export const useSearchBox = (props: IProps) => {
  const { data, handleFilter } = props;
  const location = useLocation();
  const dispatch = useDispatch();
  const selector = formValueSelector(FORM_CONFIGS.formName);
  const searchBoxValue = useSelector((state) =>
    selector(state, FORM_CONFIGS.searchBox)
  );
  const keySearch: string = trim(toLower(searchBoxValue)) || '';
  const isKeyEmpty = isEmpty(keySearch);
  const result: any[] = isKeyEmpty ? data : handleFilter();
  React.useEffect(() => {
    dispatch(reset(FORM_CONFIGS.formName));
  }, [location]);
  return {
    result,
    keySearch,
    handleFilter,
  };
};
