import { persistReducer } from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/es/stateReconciler/autoMergeLevel2';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import {
  ACTION_CREATE,
  ACTION_DELETE,
  ACTION_UPDATE,
  ACTION_SELECTED,
  ACTION_REMOVE_SELECTED,
} from './AddressBook.constant';
import { isAddressBookExist } from './AddressBook.utils';
import { isEqual, toLower } from 'lodash';
import {
  IAddressBook,
  IAddressBookReducer,
  IPayload,
} from './AddressBook.interface';
import { ADDRESS_BOOK_TYPE } from './AddressBook.utils';

const initialState: IAddressBookReducer = {
  incognitoAddress: [],
  externalAddress: [],
};

const addressBookReducer = (
  state = initialState,
  action: { type: string; payload: any }
) => {
  switch (action.type) {
    case ACTION_CREATE: {
      const { addressBook, type }: IPayload = action.payload;
      let field = ADDRESS_BOOK_TYPE[type];
      const oldAddressedBook: IAddressBook[] = state[field];
      return {
        ...state,
        [field]: [
          ...oldAddressedBook,
          { ...addressBook, createdAt: new Date().getTime() },
        ],
      };
    }
    case ACTION_UPDATE: {
      const { addressBook, type }: IPayload = action.payload;
      let field = ADDRESS_BOOK_TYPE[type];
      const oldAddressedBook: IAddressBook[] = state[field];
      const isNameExisted = oldAddressedBook
        .filter((item) => item?.address !== addressBook?.address)
        .some((item) =>
          isEqual(toLower(item?.name), toLower(addressBook?.name))
        );
      if (isNameExisted) {
        throw new Error('User name is exist!');
      }
      return {
        ...state,
        [field]: [
          ...oldAddressedBook.map((item) =>
            item.address === addressBook.address
              ? { ...item, ...addressBook, updatedAt: new Date().getTime() }
              : item
          ),
        ],
      };
    }
    case ACTION_DELETE: {
      const { addressBook, type }: IPayload = action.payload;
      let field = ADDRESS_BOOK_TYPE[type];
      const oldAddressedBook: IAddressBook[] = state[field];
      const isExist = isAddressBookExist(oldAddressedBook, addressBook);
      if (!isExist) {
        return state;
      }
      return {
        ...state,
        [field]: [
          ...oldAddressedBook.filter(
            (item) => item.address !== addressBook.address
          ),
        ],
      };
    }
    case ACTION_SELECTED: {
      const { addressBook, type }: IPayload = action.payload;
      let field = ADDRESS_BOOK_TYPE[type];
      const oldAddressedBook: IAddressBook[] = state[field];
      const selected = oldAddressedBook?.find(
        (item) => item?.address === addressBook.address
      );
      return {
        ...state,
        selected,
      };
    }
    case ACTION_REMOVE_SELECTED: {
      return {
        ...state,
        selected: null,
      };
    }
    default:
      return state;
  }
};

const persistConfig = {
  key: 'addressBook',
  storage,
  whitelist: ['incognitoAddress', 'externalAddress'],
  stateReconciler: autoMergeLevel2,
};

export default persistReducer(persistConfig, addressBookReducer);
