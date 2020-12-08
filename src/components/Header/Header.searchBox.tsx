import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Input } from 'src/components/ReduxForm/InputField/InputField';

interface IProps {
  title: string;
}

export const FORM_CONFIGS = {
  formName: 'form-create-header-search-box',
  searchBox: 'searchBox',
};

const SearchBox = (props: IProps) => {
  const { title } = props;
  return (
    <Field
      name={FORM_CONFIGS.searchBox}
      component={(props: any) => {
        return (
          <Input
            input={props?.input}
            componentProps={{
              placeholder: title,
              autoFocus: true,
            }}
          />
        );
      }}
    />
  );
};

export default reduxForm<{}, any>({
  form: FORM_CONFIGS.formName,
})(React.memo(SearchBox));
