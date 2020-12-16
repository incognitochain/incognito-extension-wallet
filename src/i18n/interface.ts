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

export interface IAccountLanguage {
  create: {
    title: string;
    desc: string;
  };
  import: {
    title: string;
    desc: string;
  };
  backup: {
    headerTitle: string;
    title: string;
    desc: string;
    copyAll: string;
    copied: string;
  };
  accountDetail: {
    title1: string;
    title2: string;
    title3: string;
    title4: string;
    title5: string;
    title6: string;
    title7: string;
    title8: string;
    keychain: string;
    delete: string;
  };
  receive: {
    headerTitle: string;
    hook: string;
  };
  error: {
    create: string;
    import: string;
    accountNotExisted: string;
  };
  success: {
    create: string;
    import: string;
  };
}

export interface IKeychainLanguage {
  headerTitle: string;
  yourKeychain: string;
}
