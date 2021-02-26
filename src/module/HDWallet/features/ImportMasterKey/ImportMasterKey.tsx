import React from 'react';
import { Field } from 'redux-form';
import {
    AppIcon,
    Button,
    Header,
    // ScanIcon
} from 'src/components';
import { InputField, validator } from 'src/components/ReduxForm';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { IHDWalletLanguage } from 'src/i18n';
import { translateByFieldSelector } from 'src/module/Configs';
import { useValidator } from 'src/hooks';
import { INPUT_FIELD } from 'src/components/ReduxForm/InputField';
import withImportMasterKey, { IMergeProps } from './ImportMasterKey.enhance';
import { FORM_CONFIGS } from './ImportMasterKey.constant';

const Styled = styled.div`
    .scan-qrcode {
        justify-content: flex-end;
    }
`;

const ImportMasterKey = (props: IMergeProps & any) => {
    const translate: IHDWalletLanguage = useSelector(translateByFieldSelector)('hdWallet');
    const {
        onGoBack,
        disabled,
        errorCustomName,
        errorCustomMnemonic,
        onImportMasterKey,
        // handleScanMnemonic
    } = props;
    const { masterKeyNamePlaceholder, mnemonicPlaceholder, importBtn } = translate.general;
    const { invalidMasterKeyName } = translate.error;
    const { title } = translate.importMasterKey;
    const [validateMasterKeyName]: any[] = useValidator({
        validator: [validator.required, validator.validateAlphaNumericText(invalidMasterKeyName)],
    });
    const [validateMnemonic]: any[] = useValidator({
        validator: [validator.required],
    });
    return (
        <Styled className="scroll-view">
            <Header title=" " onGoBack={onGoBack} />
            <AppIcon />
            <p className="fs-medium fw-bold">{title}</p>
            <form className="m-t-30">
                <Field
                    component={InputField}
                    name={FORM_CONFIGS.masterKeyName}
                    validate={[...validateMasterKeyName]}
                    componentProps={{
                        placeholder: masterKeyNamePlaceholder,
                    }}
                    errorCustom={errorCustomName}
                />
                <Field
                    component={InputField}
                    name={FORM_CONFIGS.mnemonic}
                    validate={[...validateMnemonic]}
                    componentProps={{
                        placeholder: mnemonicPlaceholder,
                    }}
                    errorCustom={errorCustomMnemonic}
                    inputType={INPUT_FIELD.textArea}
                />
                {/* <div className="scan-qrcode flex">
                    <ScanIcon onClick={handleScanMnemonic} />
                </div> */}
            </form>
            <Button
                disabled={disabled}
                title={importBtn}
                type="button"
                className="m-t-30"
                onClick={onImportMasterKey}
            />
        </Styled>
    );
};

export default withImportMasterKey(React.memo(ImportMasterKey));
