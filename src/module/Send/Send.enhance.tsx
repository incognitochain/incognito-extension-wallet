import React from 'react';
import { compose } from 'recompose';
import ErrorBoundary from 'src/components/ErrorBoundary';
import { withLayout } from 'src/components/Layout';
import { change, focus, InjectedFormProps, reduxForm } from 'redux-form';
// import { IAddressBook } from 'src/module/AddressBook';
// import AddressBook from 'src/module/AddressBook/AddressBook';
import { useDispatch } from 'react-redux';
import withSend, { TInner as TInnerSend } from './Send.enhanceSend';
import withValAddress, { TInner as TInnerAddress } from './Send.enhanceAddressValidator';
import withValAmount, { TInner as TInnerAmount } from './Send.enhanceAmountValidator';
import {
    removeAllSpace,
    // standardizedAddress
} from './Send.utils';
import { actionFetchFeeByMax } from './Send.actions';
import withInit from './Send.enhanceInit';
import withFee from './Send.enhanceFee';
import { FORM_CONFIGS } from './Send.constant';

export interface IMergeProps extends InjectedFormProps<any, any>, TInnerAddress, TInnerAmount, TInnerSend {
    onClickMax: () => any;
    onChangeField: (value: string, field: any) => any;
    onClickAddressBook: () => any;
    onClickScan: () => any;
}

const enhance = (WrappedComponent: React.FunctionComponent) => (props: any) => {
    const dispatch = useDispatch();
    const handleStandardizedAddress = async (value: string) => {
        let val = value;
        try {
            // const copiedValue = await copy;
            // if (copiedValue !== '') {
            //   const isPasted = value.includes(copiedValue);
            //   if (isPasted) {
            //     _value = standardizedAddress(value);
            //   }
            // }
        } catch (e) {
            console.debug('error', e);
        }
        return removeAllSpace(val);
    };

    const onChangeField = async (value: string, field: string) => {
        let val: any = value;
        if (field === 'toAddress') {
            val = await handleStandardizedAddress(value);
        }
        dispatch(change(FORM_CONFIGS.formName, field, String(val)));
        dispatch(focus(FORM_CONFIGS.formName, field));
    };

    const onClickMax = async () => {
        try {
            const maxAmountText: any = await dispatch(actionFetchFeeByMax());
            if (maxAmountText) {
                onChangeField(maxAmountText, 'amount');
            }
        } catch (error) {
            console.debug(error);
        }
    };

    const onClickAddressBook = () => {
        try {
            // dispatch(
            //     actionToggleModal({
            //         data: (
            //             <AddressBook
            //                 onGoBack={() => dispatch(actionToggleModal({ data: null, visible: false }))}
            //                 onSelectedAddrBook={(addressBook: IAddressBook) => {
            //                     onChangeField(addressBook.address, FORM_CONFIGS.toAddress);
            //                 }}
            //             />
            //         ),
            //         visible: true,
            //     }),
            // );
        } catch (error) {
            console.debug(error);
        }
    };

    const onClickScan = () => {
        try {
            console.debug('click scan');
        } catch (error) {
            console.debug(error);
        }
    };

    return (
        <ErrorBoundary>
            <WrappedComponent
                {...{
                    ...props,
                    onClickMax,
                    onChangeField,
                    onClickAddressBook,
                    onClickScan,
                }}
            />
        </ErrorBoundary>
    );
};

export default compose<IMergeProps, any>(
    withLayout,
    reduxForm({
        form: FORM_CONFIGS.formName,
    }),
    withInit,
    withFee,
    withValAddress,
    withValAmount,
    withSend,
    enhance,
);
