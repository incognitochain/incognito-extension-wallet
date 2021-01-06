import React, { SyntheticEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
import { IFeeTypes, ISendData, ISendReducer } from './Send.interface';
import { actionChangeFeeType } from './Send.actions';
import { Styled } from './Send.styled';
import { FORM_CONFIGS } from './Send.constant';

const FeeType = React.memo((props: IFeeTypes) => {
    const { symbol, tokenId } = props;
    const { feeUnitByTokenId }: ISendData = useSelector(sendDataSelector);
    const dispatch = useDispatch();
    const selected = feeUnitByTokenId === tokenId;
    const handleChangeFeeTypes = (e: SyntheticEvent) => {
        e.preventDefault();
        if (!selected) {
            dispatch(actionChangeFeeType(tokenId));
        }
    };
    return (
        <button
            type="button"
            className={`fee-type ${selected ? 'selected' : ''} fs-small fw-regular`}
            onClick={handleChangeFeeTypes}
        >
            {symbol}
        </button>
    );
});

const FeeTypes = React.memo(() => {
    const { types }: ISendReducer = useSelector(sendSelector);
    return (
        <div className="fee-types flex">
            {types.map((type) => (
                <FeeType {...type} key={type.tokenId} />
            ))}
        </div>
    );
});

const EstimateFee = React.memo(() => {
    const { totalFeeText }: ISendData = useSelector(sendDataSelector);
    const translate: ISendLanguage = useSelector(translateByFieldSelector)('send');
    return (
        <div className="estimate-fee flex">
            <div className="left">
                <p className="fee">{`${translate.fee}: ${totalFeeText}`}</p>
            </div>
            <div className="right">
                <FeeTypes />
            </div>
        </div>
    );
});

const FormSend = (props: IMergeProps) => {
    const selectedPrivacy: ISelectedPrivacy = useSelector(selectedPrivacySelector);
    const translate: ISendLanguage = useSelector(translateByFieldSelector)('send');
    const theme: ITheme = useSelector(themeSelector);
    const { titleBtnSubmit, disabledForm }: ISendData = useSelector(sendDataSelector);
    const {
        handleSubmit,
        handleSend,
        validateAddress,
        validateAmount,
        onChangeField,
        onClickMax,
        onClickAddressBook,
        onClickScan,
        onGoBack,
    } = props;
    return (
        <Styled theme={theme}>
            <Header
                onGoBack={onGoBack}
                title={`${translate.headerTitle} ${selectedPrivacy.symbol || selectedPrivacy.pSymbol}`}
            />
            <p className="balance">{`${translate.balance}: ${selectedPrivacy.formatAmount}`}</p>
            <form onSubmit={handleSubmit(handleSend)}>
                <Field
                    component={InputField}
                    name={FORM_CONFIGS.amount}
                    inputType={INPUT_FIELD.amount}
                    componentProps={{
                        placeholder: translate.amount,
                        autoFocus: true,
                    }}
                    onClickMax={onClickMax}
                    validate={validateAmount}
                />
                <Field
                    component={InputField}
                    name={FORM_CONFIGS.toAddress}
                    componentProps={{
                        placeholder: translate.incognitoAddress,
                        onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
                            onChangeField(e.target.value, FORM_CONFIGS.toAddress),
                    }}
                    inputType={INPUT_FIELD.address}
                    onClickAddressBook={onClickAddressBook}
                    onClickScan={onClickScan}
                    validate={validateAddress}
                />
                <Field
                    component={InputField}
                    name={FORM_CONFIGS.memo}
                    componentProps={{
                        placeholder: translate.placeholderMemo,
                    }}
                />
                <EstimateFee />
                <Button title={titleBtnSubmit} disabled={disabledForm} type="submit" />
            </form>
        </Styled>
    );
};
export default FormSend;
