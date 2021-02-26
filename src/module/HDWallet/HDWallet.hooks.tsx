import { useSelector } from 'react-redux';
import { useFormValue } from 'src/hooks';
import { IHDWalletLanguage } from 'src/i18n';
import { translateByFieldSelector } from 'src/module/Configs';
import { isMasterKeyMnemonicExistSelector, isMasterKeyNameExistSelector } from './HDWallet.selector';
import { isDupMasterless, validateMnemonic } from './HDWallet.utils';

interface IProps {
    formName: string;
    field: string;
}

export const useMasterKeyName = (props: IProps) => {
    const { formName, field } = props;
    const translate: IHDWalletLanguage = useSelector(translateByFieldSelector)('hdWallet');
    const { existMasterKeyName, dupMasterless } = translate.error;
    const [masterKeyName] = useFormValue({ formName, field });
    const isMasterKeyNameExist = useSelector(isMasterKeyNameExistSelector);
    const getErrorCustom = () => {
        if (isDupMasterless(masterKeyName)) {
            return dupMasterless;
        }
        if (isMasterKeyNameExist(masterKeyName)) {
            return existMasterKeyName;
        }
        return '';
    };
    const error = getErrorCustom();
    return {
        masterKeyName,
        error,
    };
};

export const useMasterKeyMnemonic = (props: IProps) => {
    const { formName, field } = props;
    const translate: IHDWalletLanguage = useSelector(translateByFieldSelector)('hdWallet');
    const { existMasterKeyMnemonic, invalidMnemonic } = translate.error;
    const [mnemonic] = useFormValue({ formName, field });
    const isMasterKeyMnemonicExist = useSelector(isMasterKeyMnemonicExistSelector);
    const getErrorCustom = () => {
        if (isMasterKeyMnemonicExist(mnemonic)) {
            return existMasterKeyMnemonic;
        }
        if (!validateMnemonic(mnemonic)) {
            return invalidMnemonic;
        }
        return '';
    };
    const error = getErrorCustom();
    return {
        mnemonic,
        error,
    };
};
