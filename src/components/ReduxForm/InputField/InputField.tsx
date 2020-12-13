import React, { SyntheticEvent } from 'react';
import { Styled } from './InputField.styled';

interface IProps {
  label: string;
  input: {
    value: string;
    onChange: (e: SyntheticEvent) => void;
  };
}

export const Input = (
  props: React.InputHTMLAttributes<HTMLInputElement> & any
) => {
  const {
    input: { value, onChange, onFocus },
    componentProps,
    rightLabel,
  } = props;
  const readOnly = !!componentProps?.readOnly;
  return (
    <div className='input-container'>
      <input
        type='text'
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        className={`fw-medium fs-medium ${readOnly && 'readonly'}`}
        {...componentProps}
      />
      {rightLabel}
    </div>
  );
};

const InputField = (
  props: React.InputHTMLAttributes<HTMLInputElement> &
    IProps &
    React.FunctionComponent &
    any
) => {
  const { meta, label, ...rest } = props;
  const { error, warning } = meta;
  return (
    <Styled>
      <label className='fw-bold fs-medium'>{label}</label>
      <Input {...rest} />
      {(error && <span className='error fs-small fw-regular'>{error}</span>) ||
        (warning && (
          <span className='warning fs-small fw-regular'>{warning}</span>
        ))}
    </Styled>
  );
};

export default InputField;
