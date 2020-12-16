import { ILanguage } from '.';

const en: ILanguage = {
  general: {
    copied: 'Copied',
    copy: 'Copy',
  },
  home: {
    title: 'Incognito Wallet',
  },
  keychain: {
    headerTitle: 'Keychain',
    yourKeychain: 'Your keychains',
  },
  wallet: {
    headerTitle: 'Assets',
    selectAccount: {
      headerTitle: 'Search keychains',
    },
    addCoin: 'Add a coin +',
    error: {
      walletNotExisted: 'Wallet is not exist',
    },
    blockShield: {
      totalShielded: 'Shielded Balance',
      btnShield: 'Shield my crypto',
    },
  },
  token: {
    followToken: {
      headerTitle: 'Add a coin',
      addManually: 'Add manually +',
      dontSeeYourCoin: `Don't see your coin?`,
    },
    addToken: {
      headerTitle: 'Add a coin',
      added: 'Added',
    },
    detail: {
      headerTitle: '',
      btnSend: 'Send',
      btnReceive: 'Receive',
    },
    error: {
      tokenIdRequired: 'Token id is required',
    },
  },
  account: {
    create: {
      title: 'Create',
      desc: 'Create a new keychain',
    },
    import: {
      title: 'Import',
      desc: 'Import an existing keychain',
    },
    backup: {
      title: 'Back up',
      desc: 'Backup your private keys',
      headerTitle: 'Backup your private keys',
      copyAll: 'Copy all',
      copied: 'Copied',
    },
    accountDetail: {
      title1: 'Your incognito address',
      title2: 'Private key',
      title3: 'Public key',
      title4: 'Readonly key',
      title5: 'Validator key',
      title6: 'Bls key',
      title7: 'Device token',
      title8: 'Shard',
      keychain: 'keychain',
      delete: 'Delete',
    },
    receive: {
      headerTitle: 'Receive anonymously',
      hook: `This is your address.\nUse it to receive any cryptocurrency\nfrom another Incognito address.`,
    },
    error: {
      create: 'Keychain was not created! Please try again.',
      import: 'Import keychain failed, please try again.',
      accountNotExisted: 'Account is not exist',
    },
    success: {
      create: 'Create keychain successful.',
      import: 'Import keychain successful.',
    },
  },
  setting: {
    headerTitle: 'Settings',
    network: {
      title: 'Network',
    },
    dev: {
      title: 'Dev Sections',
      homeConfigs: 'Use staging home configs',
    },
    addressBook: {
      title: 'Address Book',
      desc: 'Manage your saved addresses',
    },
  },
  send: {
    headerTitle: 'Send',
    amount: 'Amount',
    toAddress: 'To',
    incognitoAddress: 'Incognito Address',
    fee: 'Fee',
    memo: 'Memo',
    placeholderMemo: 'Add a note (optional)',
    confirm: {
      headerTitle: 'Back',
      txId: 'TxID',
      fee: 'Fee',
      time: 'Time',
      toAddress: 'To address',
      amount: 'Amount',
    },
  },
  history: {
    headerTitle: 'History',
    id: 'ID',
    fee: 'Fee',
    status: 'Status',
    time: 'Time',
    toAddress: 'To address',
    coin: 'Coin',
  },
  addressBook: {
    headerTitle: 'Address book',
    name: 'Name',
    address: 'Address',
    networkName: 'Network',
    btnCreate: 'Create',
    btnEdit: 'Edit',
    btnRemove: 'Remove',
    msgExist: 'Address book is exist!',
    keychains: 'Your keychains',
    incognito: 'Incognito addresses',
    external: 'External addresses',
    headerTitleCreate: 'Create',
    headerTitleEdit: 'Edit',
  },
};

export default en;
