import React from 'react';
import { compose } from 'recompose';
import trim from 'lodash/trim';
import { useDispatch, useSelector } from 'react-redux';
import { useAccount } from 'src/routes/Account';
import { change, reduxForm } from 'redux-form';
import { randomName as handleRandomName } from 'src/utils/randomName';
import {
  actionFetchImportAccount,
  listAccountNameSelector,
} from 'src/routes/Account';
import { withLayout } from 'src/components/Layout';
import { useHistory, useLocation } from 'react-router-dom';

export interface TOutter {
  disabledForm: boolean;
  handleImportAccount: (values: {
    accountName: string;
    privateKey: string;
  }) => void;
  readOnlyName: boolean;
  randomName: string;
  handleChangeRandomName: () => void;
}

export const FORM_CONFIGS = {
  formName: 'form-import-account',
  accountName: 'accountName',
  privateKey: 'privateKey',
};

const enhance = (WrappedComponent: React.FunctionComponent) => (props: any) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location: any = useLocation();
  const params: {
    onGoBack?: () => void;
  } = location.state;
  const accountNameList = useSelector(listAccountNameSelector);
  const [state, setState] = React.useState({
    readOnlyName: true,
  });
  const { readOnlyName } = state;
  const { isFormValid, isAccountExist, isPrivateKeyExist } = useAccount({
    form: FORM_CONFIGS,
  });
  const disabledForm = !isFormValid;
  const randomName = React.useMemo(() => {
    return handleRandomName(accountNameList);
  }, [accountNameList]);
  const handleImportAccount = async (values: {
    accountName: string;
    privateKey: string;
  }) => {
    try {
      if (disabledForm) {
        return;
      }
      if (isAccountExist || isPrivateKeyExist) {
        throw new Error('Account is exist');
      }
      const { accountName, privateKey } = values;
      await dispatch(
        actionFetchImportAccount(
          trim(readOnlyName ? randomName : accountName),
          trim(privateKey)
        )
      );
      if (typeof params?.onGoBack === 'function') {
        params?.onGoBack();
      } else {
        history.goBack();
      }
    } catch (error) {
      console.debug(error);
    }
  };

  const handleChangeRandomName = () =>
    setState({ ...state, readOnlyName: false });

  React.useEffect(() => {
    dispatch(
      change(FORM_CONFIGS.formName, FORM_CONFIGS.accountName, randomName)
    );
  }, []);

  return (
    <WrappedComponent
      {...{
        ...props,
        readOnlyName,
        randomName,
        handleImportAccount,
        handleChangeRandomName,
        disabledForm,
      }}
    />
  );
};

export default compose(
  withLayout,
  reduxForm<{}, TOutter>({
    form: FORM_CONFIGS.formName,
  }),
  enhance
);
