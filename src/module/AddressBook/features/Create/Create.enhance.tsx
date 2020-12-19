import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { compose } from 'recompose';
import { reduxForm } from 'redux-form';
import { actionToggleToast, TOAST_CONFIGS } from 'src/components';
import ErrorBoundary from 'src/components/ErrorBoundary';
import { withLayout } from 'src/components/Layout';
import {
    isAddressBookExist,
    actionCreate,
    IAddressBook,
    IAddressBookReducer,
    addressBookSelector,
    ADDRESS_BOOK_TYPE,
} from 'src/module/AddressBook';
import { isMainnetSelector } from 'src/module/Preload';

interface IProps {}

interface TInner {
    handleCreate: any;
}

export interface IMergeProps extends IProps, TInner {}

export const FORM_CONFIGS = {
    formName: 'form-create-address-book',
    name: 'name',
    address: 'address',
};

const enhance = (WrappedComponent: React.FunctionComponent) => (props: IProps & any) => {
    const dispatch = useDispatch();
    const mainnet = useSelector(isMainnetSelector);
    const { state }: { state: any } = useLocation();
    const type = state?.type || 1;
    const field = ADDRESS_BOOK_TYPE[type];
    const addressBookState: IAddressBookReducer = useSelector(addressBookSelector);
    const oldAddressedBook: IAddressBook[] = addressBookState[field];
    const handleCreate = async (values: { name: string; address: string }) => {
        try {
            const { name, address } = values;
            const addressBook = { name, address, type, mainnet };
            const isExist = isAddressBookExist(oldAddressedBook, addressBook);
            if (isExist) {
                throw new Error('User is exist!');
            }
            dispatch(
                actionCreate({
                    addressBook,
                    type,
                }),
            );
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
    return (
        <ErrorBoundary>
            <WrappedComponent {...{ ...props, handleCreate }} />
        </ErrorBoundary>
    );
};

export default compose<IMergeProps, any>(
    withLayout,
    reduxForm<any, any>({
        form: FORM_CONFIGS.formName,
    }),
    enhance,
);
