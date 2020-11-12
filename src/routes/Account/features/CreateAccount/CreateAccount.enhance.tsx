import React from 'react';
import { useDispatch } from 'react-redux';
import { useAccount, actionFetchCreateAccount } from 'src/routes/Account';
import trim from 'lodash/trim';
import { useHistory } from 'react-router-dom';
import { compose } from 'recompose';
import { reduxForm } from 'redux-form';
import { withLayout } from 'src/components/Layout';

interface IProps {}

export interface TOutter {
  disabledForm: boolean;
  getAccountValidator: () => any[];
  handleCreateAccount: (props: any) => void;
}

export const FORM_CONFIGS = {
  formName: 'form-create-account',
  accountName: 'accountName',
};

const enhance = (WrappedComponent: React.FunctionComponent) => (props: any) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { isFormValid, isAccountExist } = useAccount({
    form: FORM_CONFIGS,
  });
  const disabledForm = !isFormValid;
  const handleCreateAccount = async (values: { accountName: string }) => {
    try {
      const { accountName } = values;
      if (disabledForm) {
        return;
      }
      if (isAccountExist) {
        throw new Error('Account is existed!');
      }
      await dispatch(actionFetchCreateAccount(trim(accountName)));
      history.goBack();
    } catch (e) {
      console.debug(e);
    }
  };
  return (
    <WrappedComponent {...{ ...props, disabledForm, handleCreateAccount }} />
  );
};

export default compose<IProps, TOutter>(
  enhance,
  reduxForm<{}, TOutter>({
    form: FORM_CONFIGS.formName,
  }),
  withLayout
);
