import React, { SyntheticEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Field } from 'redux-form';
import { Button, Header } from 'src/components';
import { InputField } from 'src/components/ReduxForm';
import { ISendLanguage } from 'src/i18n';
import { translateByFieldSelector } from 'src/module/Configs';
import withSend, { FORM_CONFIGS, IMergeProps } from './Send.enhance';
import { sendDataSelector, sendSelector } from './Send.selector';
import { ISelectedPrivacy, selectedPrivacySelector } from '../Token';
import { IFeeTypes, ISendData } from './Send.interface';
import { ISendReducer } from './Send.reducer';
import { actionChangeFeeType } from './Send.actions';
import { Link } from 'react-router-dom';
import { INPUT_FIELD } from 'src/components/ReduxForm/InputField/InputField.constant';
import { Styled } from './Send.styled';

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
    <Link
      to='#'
      className={`fee-type ${selected ? 'selected' : ''} fs-small`}
      onClick={handleChangeFeeTypes}
    >
      {symbol}
    </Link>
  );
});

const FeeTypes = React.memo(() => {
  const { types }: ISendReducer = useSelector(sendSelector);
  return (
    <div className='fee-types flex'>
      {types.map((type) => (
        <FeeType {...type} key={type.tokenId} />
      ))}
    </div>
  );
});

const EstimateFee = React.memo(() => {
  const { totalFeeText }: ISendData = useSelector(sendDataSelector);
  const translate: ISendLanguage = useSelector(translateByFieldSelector)(
    'send'
  );
  return (
    <div className='estimate-fee flex'>
      <div className='left'>
        <p className='fee'>{`${translate.fee}: ${totalFeeText}`}</p>
      </div>
      <div className='right'>
        <FeeTypes />
      </div>
    </div>
  );
});

const Send = (props: IMergeProps) => {
  const selectedPrivacy: ISelectedPrivacy = useSelector(
    selectedPrivacySelector
  );
  const translate: ISendLanguage = useSelector(translateByFieldSelector)(
    'send'
  );
  const { titleBtnSubmit }: ISendData = useSelector(sendDataSelector);
  const {
    handleSubmit,
    handleSend,
    valid,
    submitting,
    validateAddress,
    validateAmount,
    onChangeField,
    onClickMax,
    onClickAddressBook,
    onClickScan,
  } = props;
  return (
    <Styled>
      <Header
        title={`${translate.headerTitle} ${
          selectedPrivacy.symbol || selectedPrivacy.pSymbol
        }`}
      />
      <p className='balance'>{`${translate.balance}: ${selectedPrivacy.formatAmount}`}</p>
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
        <Button
          title={titleBtnSubmit}
          disabled={!valid || submitting}
          type='submit'
        />
      </form>
    </Styled>
  );
};

export default withSend(Send);
