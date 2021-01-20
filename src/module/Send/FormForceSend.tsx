import React from 'react';
import { useSelector } from 'react-redux';
import { Field } from 'redux-form';
import { Button, Header } from 'src/components';
import { InputField } from 'src/components/ReduxForm';
import { ISendLanguage } from 'src/i18n';
import { themeSelector, translateByFieldSelector } from 'src/module/Configs';
import { INPUT_FIELD } from 'src/components/ReduxForm/InputField/InputField.constant';
import { ITheme } from 'src/styles';
import { ellipsisCenter } from 'src/utils';
import { IMergeProps } from './Send.enhance';
import { sendDataSelector, sendSelector } from './Send.selector';
import { ISelectedPrivacy, selectedPrivacySelector } from '../Token';
import { ISendData, ISendReducer } from './Send.interface';
import { Styled, Row } from './Send.styled';
import { FORM_CONFIGS } from './Send.constant';

const EstimateFee = React.memo(() => {
    const { types }: ISendReducer = useSelector(sendSelector);
    const translate: ISendLanguage = useSelector(translateByFieldSelector)('send');
    const { errorMessage }: ISendData = useSelector(sendDataSelector);
    const getErrorMessage = () => errorMessage || undefined;
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
            validate={[getErrorMessage]}
        />
    );
});

const FormForceSend = (props: IMergeProps & any) => {
    const { originUrl, handleSubmit, handleSend, validateAmount, validateAddress, onGoBack } = props;
    const selectedPrivacy: ISelectedPrivacy = useSelector(selectedPrivacySelector);
    const translate: ISendLanguage = useSelector(translateByFieldSelector)('send');
    const theme: ITheme = useSelector(themeSelector);
    const { forceSendTitleBtnSubmit, disabledForm, inputMemo, inputAddress }: ISendData = useSelector(sendDataSelector);
    return (
        <Styled theme={theme}>
            <Header onGoBack={onGoBack} title={translate.forceSendHeaderTitle} />
            <p className="sub-text origin-url fw-regular fs-regular">{originUrl}</p>
            <p className="force-balance fw-regular fs-regular">{`${translate.balance}: ${selectedPrivacy.formatAmount} ${selectedPrivacy.symbol}`}</p>
            <form onSubmit={handleSubmit(handleSend)}>
                <Field
                    component={InputField}
                    name={FORM_CONFIGS.amount}
                    inputType={INPUT_FIELD.leftTitle}
                    componentProps={{
                        disabled: true,
                    }}
                    subtitle="Amount"
                    suffix={selectedPrivacy.symbol}
                    validate={validateAmount}
                />
                <Field
                    component={InputField}
                    name={FORM_CONFIGS.toAddress}
                    inputType={INPUT_FIELD.leftTitle}
                    componentProps={{
                        disabled: true,
                        value: ellipsisCenter({
                            str: inputAddress || '',
                            limit: 10,
                        }),
                    }}
                    validate={validateAddress}
                    subtitle="Address"
                />
                {!!inputMemo && (
                    <Field
                        component={InputField}
                        name={FORM_CONFIGS.memo}
                        inputType={INPUT_FIELD.leftTitle}
                        componentProps={{
                            placeholder: translate.placeholderMemo,
                            disabled: true,
                        }}
                        subtitle={translate.memo}
                    />
                )}
                <EstimateFee />
                <Row>
                    <Button title={translate.cancel} type="button" onClick={onGoBack} />
                    <Button title={forceSendTitleBtnSubmit} disabled={disabledForm} type="submit" />
                </Row>
            </form>
        </Styled>
    );
};
export default FormForceSend;
