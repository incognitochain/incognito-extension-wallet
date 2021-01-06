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
                {(error && <p className="error fs-small fw-regular">{error}</p>) ||
                    (warning && <p className="warning fs-small fw-regular">{warning}</p>)}
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
                    <div className="wrapper large-margin-top">
                        <p className="sub-title fw-medium fs-medium">{subtitle}</p>
                        <div className="input-wrapper">
                            <div className="input-wrap-suffix input-amount align-right">
                                <Input {...{ input, componentProps }} />
                                <p>{suffix}</p>
                            </div>
                            {renderError()}
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
            {inputType !== INPUT_FIELD.leftTitle && renderError()}
        </Styled>
    );
};

export default InputField;
