import React, { SyntheticEvent } from 'react';
import { Styled } from './InputField.styled';

interface IProps {
  label: string;
  input: {
    value: string;
    onChange: (e: SyntheticEvent) => void;
  };
}

const Input = (props: any) => {
  const {
    input: { value, onChange, onFocus },
    componentProps,
    rightLabel,
  } = props;
  return (
    <div className='input-container'>
      <input
        type='text'
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        {...componentProps}
      />
      {rightLabel}
    </div>
  );
};

const InputField = (props: any & IProps & React.FunctionComponent) => {
  const { input, meta, label, ...rest } = props;
  const { error, warning } = meta;
  return (
    <Styled>
      <label>{label}</label>
      <Input {...rest} input={input} />
      {(error && <span className='error'>{error}</span>) ||
        (warning && <span className='warning'>{warning}</span>)}
    </Styled>
  );
};

export default InputField;
