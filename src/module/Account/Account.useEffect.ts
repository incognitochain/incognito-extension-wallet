import lowerCase from 'lodash/lowerCase';
import { useSelector } from 'react-redux';
import { required } from 'src/components/ReduxForm';
import { formValueSelector, isValid } from 'redux-form';
import trim from 'lodash/trim';
import { listAccountSelector } from './Account.selector';

interface IProps {
  form: {
    formName: string;
    accountName: string;
    privateKey?: string;
  };
}

export const useAccount = (props: IProps) => {
  const { form } = props;
  const accountList = useSelector(listAccountSelector);
  const isFormValid = useSelector((state) => isValid(form?.formName)(state));
  const selector = formValueSelector(form?.formName);
  const accountNameToLowercase = lowerCase(
    trim(useSelector((state) => selector(state, form?.accountName || '')))
  );
  const privateKey = trim(
    useSelector((state) => selector(state, form.privateKey || ''))
  );
  const isPrivateKeyExist = accountList.find(
    (account) => account.key.keySet.privateKeySerialized === privateKey
  );
  const isAccountExist = accountList.find(
    (account) => lowerCase(account?.name) === accountNameToLowercase
  );
  const getPrivateKeyValidator = () => {
    const validate = [required];
    return validate;
  };
  return {
    isFormValid,
    getPrivateKeyValidator,
    isAccountExist,
    isPrivateKeyExist,
  };
};
