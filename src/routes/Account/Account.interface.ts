import { AccountInstance } from 'incognito-js/build/web/browser';

export interface IProps {}

export interface IAccount {
  name: string;
  value: number | string;
  paymentAddress: string;
  readonlyKey: string;
  privateKey: string;
  publicKey: string;
  publicKeyCheckEncode: string;
  publicKeyBytes: string;
  blsPublicKey: string;
  validatorKey: string;
  derivatorToSerialNumberCache: string;
}

export interface IAccountReducer {
  list: AccountInstance[];
  defaultAccountName: string;
  isGettingBalance: any[];
  switch: boolean;
  create: boolean;
  import: boolean;
}
