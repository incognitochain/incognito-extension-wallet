import React from 'react';
import { WrappedFieldInputProps, WrappedFieldMetaProps } from 'redux-form';
import { AddressBookIcon, InfiniteIcon, ScanIcon } from 'src/components/Icons';
import { INPUT_FIELD } from './InputField.constant';
import { Styled } from './InputField.styled';

export interface IInputFieldProps {
    meta: WrappedFieldMetaProps;
    input: WrappedFieldInputProps;
    componentProps: React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;
    inputType?: number;
    subtitle?: boolean;
    suffix?: string;
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
    return <input type="text" autoComplete="off" {...inputProps} {...componentProps} />;
};

const InputField = (props: IInputFieldProps) => {
    const {
        meta,
        input,
        componentProps,
        inputType,
        subtitle,
        suffix,
        onClickMax,
        onClickAddressBook,
        onClickScan,
    } = props;
    const { error, warning } = meta;
    const renderError = () => {
        return (
            <>
                {(error && (
                    <p
                        className={`error fs-small fw-regular ${
                            inputType === INPUT_FIELD.leftTitle ? 'align-right' : ''
                        }`}
                    >
                        {error}
                    </p>
                )) ||
                    (warning && (
                        <p
                            className={`warning fs-small fw-regular ${
                                inputType === INPUT_FIELD.leftTitle ? 'align-right' : ''
                            }`}
                        >
                            {warning}
                        </p>
                    ))}
            </>
        );
    };
    const renderInput = () => {
        switch (inputType) {
            case INPUT_FIELD.amount:
                return (
                    <div className="input-container input-amount">
                        <Input {...{ input, componentProps }} />
                        <div className="sub-icon">
                            <InfiniteIcon onClick={onClickMax} />
                        </div>
                    </div>
                );
            case INPUT_FIELD.address:
                return (
                    <div className="input-container input-address">
                        <Input {...{ input, componentProps }} />
                        <div className="sub-icon">
                            <AddressBookIcon onClick={onClickAddressBook} />
                        </div>
                        <div className="sub-icon">
                            <ScanIcon onClick={onClickScan} />
                        </div>
                    </div>
                );
            case INPUT_FIELD.leftTitle:
                return (
                    <div className="wrapper">
                        <div className="flex">
                            <p className="sub-title fw-medium fs-medium ellipsis">{subtitle}</p>
                            <div className={`input-container input-address ${!suffix ? 'input-not-suffix' : ''}`}>
                                <Input {...{ input, componentProps }} />
                                {suffix && <p className="center-abs-ver suffix ellipsis">{suffix}</p>}
                            </div>
                        </div>
                    </div>
                );
            default:
                return (
                    <div className="input-container">
                        <Input {...{ input, componentProps }} />
                    </div>
                );
        }
    };
    return (
        <Styled>
            {renderInput()}
            {renderError()}
        </Styled>
    );
};

export default InputField;
