import React, { SyntheticEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Field } from 'redux-form';
import { Button, FastFeeIcon, Header } from 'src/components';
import { InputField } from 'src/components/ReduxForm';
import { ISendLanguage } from 'src/i18n';
import { themeSelector, translateByFieldSelector } from 'src/module/Configs';
import { INPUT_FIELD } from 'src/components/ReduxForm/InputField/InputField.constant';
import { ITheme } from 'src/styles';
import LoadingContainer from 'src/components/LoadingContainer';
import { IMergeProps } from './Send.enhance';
import { sendDataSelector, sendSelector } from './Send.selector';
import { ISelectedPrivacy, selectedPrivacySelector } from '../Token';
import { IFeeTypes, ISendData, ISendReducer } from './Send.interface';
import { actionChangeFeeType, actionToggleFastFee } from './Send.actions';
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

export const ErrorBlock = React.memo(() => {
    const { feeError }: ISendData = useSelector(sendDataSelector);
    const { errorMessage }: ISendReducer = useSelector(sendSelector);
    if (errorMessage || feeError) {
        return (
            <div className="error-block">
                <p className="error fs-small">{errorMessage || feeError}</p>
            </div>
        );
    }
    return null;
});

export const EstimateFee = React.memo(() => {
    const { totalFeeText, hasMultiLevel }: ISendData = useSelector(sendDataSelector);
    const { fast2x } = useSelector(sendSelector);
    const translate: ISendLanguage = useSelector(translateByFieldSelector)('send');
    const dispatch = useDispatch();
    const handleToggleFastFee = () => dispatch(actionToggleFastFee());
    const renderFee = () => (
        <div className="estimate-fee flex fw-medium">
            <div className="left">
                <p className="fee">{translate.fee}</p>
            </div>
            <div className="right flex">
                <p className="fee">{totalFeeText}</p>
                <FeeTypes />
            </div>
        </div>
    );
    const renderPriorityFee = () => (
        <div className="estimate-fee flex fw-medium">
            <div className="left">
                <p className="fee">{translate.fast}</p>
            </div>
            <div className="right flex">
                <FastFeeIcon handleClick={handleToggleFastFee} className="fastfee-icon" fast2x={fast2x} />
            </div>
        </div>
    );
    return (
        <>
            {hasMultiLevel && renderPriorityFee()}
            {renderFee()}
        </>
    );
});

const FormSend = (props: IMergeProps) => {
    const selectedPrivacy: ISelectedPrivacy = useSelector(selectedPrivacySelector);
    const translate: ISendLanguage = useSelector(translateByFieldSelector)('send');
    const theme: ITheme = useSelector(themeSelector);
    const { titleBtnSubmit, disabledForm }: ISendData = useSelector(sendDataSelector);
    const {
        isInitingForm,
        handleSubmit,
        handleSend,
        validateAddress,
        validateAmount,
        onChangeField,
        onClickMax,
        onClickAddressBook,
        onClickScan,
        onGoBack,
        warningAddress,
    } = props;
    const renderForm = () => {
        if (isInitingForm) {
            return <LoadingContainer />;
        }
        return (
            <>
                <p className="balance">{`${translate.balance}: ${selectedPrivacy.formatAmountNoClip}`}</p>
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
                        warning={warningAddress}
                    />
                    <Field
                        component={InputField}
                        name={FORM_CONFIGS.memo}
                        componentProps={{
                            placeholder: translate.placeholderMemo,
                        }}
                    />
                    <EstimateFee />
                    <ErrorBlock />
                    <Button title={titleBtnSubmit} disabled={disabledForm} type="submit" />
                </form>
            </>
        );
    };
    return (
        <Styled theme={theme}>
            <Header
                onGoBack={onGoBack}
                title={`${translate.headerTitle} ${selectedPrivacy.symbol || selectedPrivacy.pSymbol}`}
            />
            {renderForm()}
        </Styled>
    );
};
export default React.memo(FormSend);
