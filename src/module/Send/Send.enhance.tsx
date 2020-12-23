import React from 'react';
import { compose } from 'recompose';
import { useDispatch } from 'react-redux';
import ErrorBoundary from 'src/components/ErrorBoundary';
import { withLayout } from 'src/components/Layout';
import { change, focus, InjectedFormProps, reduxForm } from 'redux-form';
import AddressBook, { IAddressBook } from 'src/module/AddressBook';
import { actionToggleModal } from 'src/components/Modal';
import QrReader from 'src/components/QrReader';
import { actionToggleToast, TOAST_CONFIGS } from 'src/components';
import { isString, toString } from 'lodash';
import { route as routeDetail } from 'src/module/Token/features/Detail';
import { useHistory } from 'react-router-dom';
import withSend, { TInner as TInnerSend } from './Send.enhanceSend';
import withValAddress, { TInner as TInnerAddress } from './Send.enhanceAddressValidator';
import withValAmount, { TInner as TInnerAmount } from './Send.enhanceAmountValidator';
import { standardizedAddress } from './Send.utils';
import { actionFetchFeeByMax } from './Send.actions';
import withInit from './Send.enhanceInit';
import withFee from './Send.enhanceFee';
import { FORM_CONFIGS } from './Send.constant';

export interface IMergeProps extends InjectedFormProps<any, any>, TInnerAddress, TInnerAmount, TInnerSend {
    onClickMax: () => any;
    // eslint-disable-next-line no-unused-vars
    onChangeField: (value: string, field: any) => any;
    onClickAddressBook: () => any;
    onClickScan: () => any;
    onGoBack: () => any;
}

const enhance = (WrappedComponent: React.FunctionComponent) => (props: any) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const handleStandardizedAddress = (value: string) => standardizedAddress(value);
    const onChangeField = async (value: string, field: string) => {
        let val: any = value;
        if (field === 'toAddress') {
            val = handleStandardizedAddress(value);
        }
        dispatch(change(FORM_CONFIGS.formName, field, toString(val)));
        dispatch(focus(FORM_CONFIGS.formName, field));
    };

    const onClickMax = async () => {
        try {
            const maxAmountText: any = await dispatch(actionFetchFeeByMax());
            if (maxAmountText) {
                onChangeField(maxAmountText, 'amount');
            }
        } catch (error) {
            dispatch(
                actionToggleToast({
                    toggle: true,
                    value: error,
                    type: TOAST_CONFIGS.error,
                }),
            );
        }
    };

    const onClickAddressBook = () => {
        dispatch(
            actionToggleModal({
                data: (
                    <AddressBook
                        onGoBack={() => dispatch(actionToggleModal({}))}
                        onSelectedAddrBook={(addressBook: IAddressBook) => {
                            onChangeField(addressBook.address, FORM_CONFIGS.toAddress);
                            dispatch(actionToggleModal({}));
                        }}
                    />
                ),
                visible: true,
            }),
        );
    };

    const handleScanQrCode = (value: any) => {
        if (isString(value)) {
            onChangeField(value, FORM_CONFIGS.toAddress);
            dispatch(actionToggleModal({}));
        }
    };

    const onClickScan = () => {
        dispatch(
            actionToggleModal({
                data: <QrReader onScan={handleScanQrCode} />,
                visible: true,
            }),
        );
    };

    const onGoBack = () => {
        history.push(routeDetail);
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
                    onGoBack,
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
