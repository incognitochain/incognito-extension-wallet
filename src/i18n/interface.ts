export interface ILanguage {
    [key: string]: any;
    general: IGeneralLanguage;
    home: {
        title: string;
    };
    keychain: IKeychainLanguage;
    wallet: {
        headerTitle: string;
        selectAccount: {
            headerTitle: string;
        };
        addCoin: string;
        error: {
            walletNotExisted: string;
        };
        blockShield: {
            totalShielded: string;
            btnShield: string;
        };
    };
    token: ITokenLanguage;
    account: IAccountLanguage;
    setting: ISettingLanguage;
    history: IHistoryLanguage;
    send: ISendLanguage;
    addressBook: IAddressBookLanguage;
    preload: IPreloadLanguage;
    shield: IShieldLanguage;
    welcome: IWelcomeLanguage;
    error: IErrorLanguage;
    masterKey: IMasterKeyLanguage;
    password: IPasswordLanguage;
    modal: IModalLanguage;
    connect: IConnectLanguage;
    disconnect: IDisconnectLanguage;
}

export interface IPreloadLanguage {
    title1: string;
    title2: string;
    btnRetry: string;
}

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

export interface IConfirmTxLanguage {
    headerTitle: string;
    txId: string;
    fee: string;
    time: string;
    toAddress: string;
    amount: string;
    sent: string;
}

export interface ISendLanguage {
    headerTitle: string;
    forceSendHeaderTitle: string;
    cancel: string;
    amount: string;
    toAddress: string;
    incognitoAddress: string;
    fee: string;
    memo: string;
    placeholderMemo: string;
    confirm: IConfirmTxLanguage;
    balance: string;
}

export interface IHistoryLanguage {
    headerTitle: string;
    id: string;
    fee: string;
    status: string;
    time: string;
    toAddress: string;
    coin: string;
    expiredAt: string;
    inchainTxId: string;
    outchainTxId: string;
    shieldingAddress: string;
    memo: string;
    contract: string;
    resume: string;
    retryCentralizedMsg: string;
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
    keychain: {
        title: string;
        desc: string;
    };
    decimalDigits: {
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
        index: string;
        shard: string;
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
    addKeys: {
        title: string;
        addKeychain: string;
        addKeyChainDesc: string;
        importKeyChain: string;
        addMasterKey: string;
        createMasterKey: string;
        importMasterKey: string;
    };
}

export interface IConnectLanguage {
    headerTitle: string;
}

export interface IDisconnectLanguage {
    headerTitle: string;
    subTitle: string;
}

export interface ITokenLanguage {
    followToken: {
        headerTitle: string;
        addManually: string;
        dontSeeYourCoin: string;
    };
    addToken: {
        headerTitle: string;
        added: string;
    };
    detail: {
        headerTitle: string;
        btnSend: string;
        btnReceive: string;
    };
    infoToken: {
        headerTitle: string;
    };
    error: {
        tokenIdRequired: string;
    };
}

export interface IGeneralLanguage {
    copied: string;
    copy: string;
    seeKey: string;
    lostNetwork: string;
    btnReload: string;
    loadingTx: string;
    btnRetry: string;
}

export interface IShieldLanguage {
    headerTitle: string;
    placeholder: string;
    whyShield: {
        headerTitle: string;
        content: string;
    };
    genShieldAddress: {
        headerTitle: string;
        title1: string;
        title2: string;
        title3: string;
        title4: string;
        title5: string;
        title6: string;
        error1: string;
        error2: string;
        tooltip: string;
    };
}

export interface INewUserLanguage {
    title1: string;
    title2: string;
    createPass: string;
    confirmCreatePass: string;
    createKey: string;
    importKey: string;
    getStartedTitle: string;
    getStartedDesc: string;
    getStartedBtn: string;
}

export interface IForgotPassLanguage {
    title1: string;
    title2: string;
    createPass: string;
    confirmCreatePass: string;
    createKey: string;
    importKey: string;
}

export interface IOldUserLanguage {
    title: string;
    input: string;
    btn: string;
    forgotPass: string;
}

export interface IImportMnemonicLanguage {
    title: string;
    nameInput: string;
    mnemonicInput: string;
    btn: string;
}

export interface INewMasterKeyLanguage {
    createMasterKeyName: string;
    content: string;
    content2: string;
    createKey: string;
    checkbox: string;
}

export interface IVerifyMnemonicLanguage {
    title: string;
    createBtn: string;
    importBtn: string;
}

export interface IWelcomeLanguage {
    newUser: INewUserLanguage;
    oldUser: IOldUserLanguage;
    forgotPass: IForgotPassLanguage;
}

export interface IShowMnemonicLanguage {
    title: string;
    newMnemonic: string;
    newMnemonicBtn: string;
    hiddenText: string;
}

export interface IPasswordLanguage {
    enterPasswordInput: string;
    enterPasswordBtn: string;
}

export interface IErrorLanguage {
    invalidMasterKeyName: string;
    invalidMnemonic: string;
    tokenIdRequired: string;
    invalidPassword: string;
    invalidPasswordLength: string;
}

export interface IMasterKeyLanguage {
    verifyMnemonic: IVerifyMnemonicLanguage;
    importMnemonic: IImportMnemonicLanguage;
    showMnemonic: IShowMnemonicLanguage;
    newMasterKey: INewMasterKeyLanguage;
    info: {
        title: string;
        revealPhrase: string;
        viewKeys: string;
        revealPhraseBtn: string;
    };
}

export interface IModalLanguage {
    addKeysModal: string;
    createKeyModal: string;
}
