import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { compose } from 'recompose';
import { change, formValueSelector, isValid, reduxForm } from 'redux-form';
import { actionToggleToast, TOAST_CONFIGS } from 'src/components';
import ErrorBoundary from 'src/components/ErrorBoundary';
import { withLayout } from 'src/components/Layout';
import { ERROR_MESSAGE } from 'src/constants/error';
import { route as routeWallet } from 'src/module/Wallet';
import {
    isAddressBookExist,
    actionCreate,
    IAddressBook,
    IAddressBookReducer,
    isAddressBookExistByName,
    actionUpdate,
    ADDRESS_BOOK_TYPE,
} from 'src/module/AddressBook';
import { addressBookSelector, selectedAddressBookSelector } from 'src/module/AddressBook/AddressBook.selector';
import { isMainnetSelector } from 'src/module/Preload/Preload.selector';
import { selectedPrivacySelector } from 'src/module/Token/Token.selector';
import { ISelectedPrivacy } from 'src/module/Token';
import isEqual from 'lodash/isEqual';
import trim from 'lodash/trim';
import toLower from 'lodash/toLower';

interface IProps {}

interface TInner {
    handleCreate: any;
    isCreate: boolean;
    handleAction: () => any;
    disabledForm: boolean;
}

export interface IMergeProps extends IProps, TInner {}

export const FORM_CONFIGS = {
    formName: 'form-address-book',
    name: 'name',
    address: 'address',
};

const enhance = (WrappedComponent: React.FunctionComponent) => (props: IProps & any) => {
    const dispatch = useDispatch();
    const mainnet = useSelector(isMainnetSelector);
    const history = useHistory();
    const { tokenId, networkName, rootNetworkName }: ISelectedPrivacy = useSelector(selectedPrivacySelector);
    const { state: locationState }: { state: any } = useLocation();
    const { type = 1, address = '' }: { type?: number; address?: string } = locationState;
    const selectedAddrBook: IAddressBook = useSelector(selectedAddressBookSelector);
    const state = useSelector((state) => state);
    const valid = isValid(FORM_CONFIGS.formName)(state);
    const field = ADDRESS_BOOK_TYPE[type];
    const addressBookState: IAddressBookReducer = useSelector(addressBookSelector);
    const oldAddressedBook: IAddressBook[] = addressBookState[field];
    const isCreate = !!address;
    const isEdit = !isCreate && !!selectedAddrBook;
    const selector = formValueSelector(FORM_CONFIGS.formName);
    const nameInput = useSelector((state) => trim(selector(state, FORM_CONFIGS.name) || ''));
    const addressInput = useSelector((state) => trim(selector(state, FORM_CONFIGS.address || '')));
    const shouldEdit = selectedAddrBook && !isEqual(toLower(selectedAddrBook?.name), toLower(nameInput));
    const disabledForm = !valid || (isEdit && !shouldEdit);
    const handleCreate = () => {
        const name = trim(nameInput);
        const address = trim(addressInput);
        const addressBook = { name, address, type, mainnet, networkName, rootNetworkName, tokenId };
        const isExist = isAddressBookExist(oldAddressedBook, addressBook);
        if (isExist) {
            throw new Error(ERROR_MESSAGE.ADDRESS_BOOK_IS_EXIST);
        }
        dispatch(
            actionCreate({
                addressBook,
            }),
        );
        history.push(routeWallet);
    };
    const handleEdit = () => {
        const name = trim(nameInput);
        const addressBook = { ...selectedAddrBook, name };
        const isExist = isAddressBookExistByName(oldAddressedBook, name);
        if (isExist) {
            throw new Error(ERROR_MESSAGE.ADDRESS_BOOK_IS_EXIST);
        }
        dispatch(
            actionUpdate({
                addressBook,
            }),
        );
        history.goBack();
    };
    const handleAction = () => {
        try {
            if (disabledForm) {
                return;
            }
            if (isCreate) {
                handleCreate();
            } else {
                handleEdit();
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
    React.useEffect(() => {
        if (isCreate) {
            dispatch(change(FORM_CONFIGS.formName, FORM_CONFIGS.address, address));
        } else {
            // edit
            dispatch(change(FORM_CONFIGS.formName, FORM_CONFIGS.address, selectedAddrBook?.address));
            dispatch(change(FORM_CONFIGS.formName, FORM_CONFIGS.name, selectedAddrBook?.name));
        }
    }, [selectedAddrBook, address]);
    return (
        <ErrorBoundary>
            <WrappedComponent {...{ ...props, handleAction, isCreate, disabledForm }} />
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
