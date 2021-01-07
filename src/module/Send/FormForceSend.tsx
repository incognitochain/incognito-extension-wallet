import React from 'react';
import { useSelector } from 'react-redux';
import { Field } from 'redux-form';
import { Button, Header } from 'src/components';
import { InputField } from 'src/components/ReduxForm';
import { ISendLanguage } from 'src/i18n';
import { themeSelector, translateByFieldSelector } from 'src/module/Configs';
import { INPUT_FIELD } from 'src/components/ReduxForm/InputField/InputField.constant';
import { ITheme } from 'src/styles';
import { IMergeProps } from './Send.enhance';
import { sendDataSelector, sendSelector } from './Send.selector';
import { ISelectedPrivacy, selectedPrivacySelector } from '../Token';
import { ISendData, ISendReducer } from './Send.interface';
import { Styled, Row } from './Send.styled';
import { FORM_CONFIGS } from './Send.constant';

const EstimateFee = React.memo(() => {
    const { types }: ISendReducer = useSelector(sendSelector);
    const translate: ISendLanguage = useSelector(translateByFieldSelector)('send');
    return (
        <Field
            component={InputField}
            name={FORM_CONFIGS.fee}
            inputType={INPUT_FIELD.leftTitle}
            componentProps={{
                disabled: true,
            }}
            subtitle={translate.fee}
            suffix={types[0].symbol}
        />
    );
});

const FormForceSend = (props: IMergeProps) => {
    const selectedPrivacy: ISelectedPrivacy = useSelector(selectedPrivacySelector);
    const translate: ISendLanguage = useSelector(translateByFieldSelector)('send');
    const theme: ITheme = useSelector(themeSelector);
    const { forceSendTitleBtnSubmit, disabledForm }: ISendData = useSelector(sendDataSelector);
    const { handleSubmit, handleSend, validateAmount, onGoBack } = props;
    return (
        <Styled theme={theme}>
            <Header onGoBack={onGoBack} title={translate.forceSendHeaderTitle} />
            <p className="force-balance fw-regular fs-regular">{`${translate.balance}: ${selectedPrivacy.formatAmount} ${selectedPrivacy.symbol}`}</p>
            <form onSubmit={handleSubmit(handleSend)}>
                <Field
                    component={InputField}
                    name={FORM_CONFIGS.amount}
                    inputType={INPUT_FIELD.leftTitle}
                    componentProps={{
                        disabled: true,
                    }}
                    subtitle="Send"
                    suffix={selectedPrivacy.symbol}
                    validate={validateAmount}
                />
                <EstimateFee />
                <Field
                    component={InputField}
                    name={FORM_CONFIGS.memo}
                    inputType={INPUT_FIELD.leftTitle}
                    componentProps={{
                        placeholder: translate.placeholderMemo,
                    }}
                    subtitle={translate.memo}
                />
                <Row>
                    <Button title={translate.cancel} type="button" onClick={onGoBack} />
                    <Button title={forceSendTitleBtnSubmit} disabled={disabledForm} type="submit" />
                </Row>
            </form>
        </Styled>
    );
};
export default FormForceSend;