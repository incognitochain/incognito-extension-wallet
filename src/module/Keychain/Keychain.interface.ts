import { AccountInstance } from 'incognito-js/build/web/browser';

export interface IProps {}

export interface IAccountItem {
  account: AccountInstance;
}

export interface IHook {
  title: string;
  desc: string;
  path: string;
}
