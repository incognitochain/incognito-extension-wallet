import React from 'react';
import { WrappedFieldInputProps, WrappedFieldMetaProps } from 'redux-form';
import { AddressBookIcon, InfiniteIcon, ScanIcon } from 'src/components/Icons';
import { INPUT_FIELD } from './InputField.constant';
import { Styled } from './InputField.styled';

export interface IInputFieldProps {
  meta: WrappedFieldMetaProps;
  input: WrappedFieldInputProps;
  componentProps: React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >;
  inputType?: number;
  onClickMax?: () => any;
  onClickAddressBook?: () => any;
  onClickScan?: () => any;
}

interface IInputProps {
  input: WrappedFieldInputProps;
  componentProps: React.InputHTMLAttributes<HTMLInputElement>;
}

export const Input = (props: IInputProps) => {
  const { input: inputProps, componentProps } = props;
  return <input type='text' {...inputProps} {...componentProps} />;
};

const InputField = (props: IInputFieldProps) => {
  const {
    meta,
    input,
    componentProps,
    inputType,
    onClickMax,
    onClickAddressBook,
    onClickScan,
  } = props;
  const { error, warning } = meta;
  const renderInput = () => {
    switch (inputType) {
      case INPUT_FIELD.amount:
        return (
          <div className='input-container input-amount'>
            <Input {...{ input, componentProps }} />
            <div className='sub-icon'>
              <InfiniteIcon onClick={onClickMax} />
            </div>
          </div>
        );
      case INPUT_FIELD.address:
        return (
          <div className='input-container input-address'>
            <Input {...{ input, componentProps }} />
            <div className='sub-icon'>
              <AddressBookIcon onClick={onClickAddressBook} />
            </div>
            <div className='sub-icon'>
              <ScanIcon onClick={onClickScan} />
            </div>
          </div>
        );
      default:
        return (
          <div className='input-container'>
            <Input {...{ input, componentProps }} />
          </div>
        );
    }
  };
  return (
    <Styled>
      {renderInput()}
      {(error && <p className='error fs-small fw-regular'>{error}</p>) ||
        (warning && <p className='warning fs-small fw-regular'>{warning}</p>)}
    </Styled>
  );
};

export default InputField;
