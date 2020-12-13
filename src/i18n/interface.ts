export interface IAddressBookLanguage {
  headerTitle: string;
  name: string;
  address: string;
  networkName: string;
  btnCreate: string;
  btnEdit: string;
  btnRemove: string;
  msgExist: string;
  keychains: string;
  incognito: string;
  external: string;
  headerTitleCreate: string;
  headerTitleEdit: string;
}

export interface ISendLanguage {
  headerTitle: string;
  amount: string;
  toAddress: string;
  incognitoAddress: string;
  fee: string;
  memo: string;
  placeholderMemo: string;
  confirm: {
    headerTitle: string;
    txId: string;
    fee: string;
    time: string;
    toAddress: string;
    amount: string;
  };
}

export interface IHistoryLanguage {
  headerTitle: string;
  id: string;
  fee: string;
  status: string;
  time: string;
  toAddress: string;
  coin: string;
}

export interface ISettingLanguage {
  headerTitle: string;
  network: {
    title: string;
  };
  dev: {
    title: string;
    homeConfigs: string;
  };
  addressBook: {
    title: string;
    desc: string;
  };
}
