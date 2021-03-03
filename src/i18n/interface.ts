export interface ILanguage {
    [key: string]: any;
    general: IGeneralLanguage;
    home: {
        title: string;
    };
    keychain: IKeychainLanguage;
    wallet: IWalletLanguage;
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
    password: IPasswordLanguage;
    modal: IModalLanguage;
    connect: IConnectLanguage;
    disconnect: IDisconnectLanguage;
    keysExplained: IKeysExplainedLanguage;
    hdWallet: IHDWalletLanguage;
}

export interface IHDWalletLanguage {
    createMasterKeyName: {
        desc1: string;
        desc2: string;
        agreeDesc: string;
        btnReady: string;
    };
    createMasterKeyMnemonic: {
        desc1: string;
        btnSave: string;
    };
    verifyMasterKeyMnemonic: {
        desc1: string;
    };
    importMasterKey: {
        title: string;
    };
    general: {
        qrTitle: string;
        masterKeyNamePlaceholder: string;
        mnemonicPlaceholder: string;
        createBtn: string;
        importBtn: string;
    };
    error: {
        invalidMasterKeyName: string;
        invalidMnemonic: string;
        existMasterKeyName: string;
        existMasterKeyMnemonic: string;
        dupMasterless: string;
    };
    info: {
        title: string;
        revealPhrase: string;
        viewKeys: string;
    };
    showMnemonic: {
        title: string;
        newMnemonic: string;
        newMnemonicBtn: string;
        hiddenText: string;
    };
}

export interface IWalletLanguage {
    headerTitle: string;
    selectAccount: {
        headerTitle: string;
    };
    addCoin: string;
    error: {
        walletNotExisted: string;
        walletIdNotFound: string;
        canNotSwitchWallet: string;
        canNotLoadWallet: string;
    };
    tooltip: {
        refresh: string;
    };
    blockShield: {
        totalShielded: string;
        btnShield: string;
    };
}

export interface IPreloadLanguage {
    title1: string;
    title2: string;
    btnRetry: string;
    openExtension: string;
    openExtensionSub: string;
}

export interface IAddressBookLanguage {
    headerTitle: string;
    name: string;
    address: string;
    networkName: string;
    btnCreate: string;
    btnEdit: string;
    btnRemove: string;
    btnSave: string;
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
    speed: string;
    memo: string;
    placeholderMemo: string;
    placeholderMemoBEP2: string;
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
    cancel: string;
    retryCentralizedMsg: string;
    retryDecentralizedMsg: string;
    inchainFee: string;
    outchainFee: string;
    inchainStatus: string;
    outchainStatus: string;
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
    logout: {
        title: string;
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
        subAllMethods: string;
        btnImportMasterKey: string;
        btnImportKeychainOnly: string;
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
        removeKey: string;
    };
    receive: {
        headerTitle: string;
        hook: string;
    };
    error: {
        create: string;
        import: string;
        canNotCreate: string;
        canNotImport: string;
        canNotRemove: string;
        keychainExisted: string;
        keychainNotExisted: string;
    };
    success: {
        create: string;
        import: string;
    };
    general: {
        placeholderName: string;
        placeholderPrivateKey: string;
    };
}

export interface IKeychainLanguage {
    headerTitle: string;
    yourKeychain: string;
    revealPhraseBtn: string;
    addKeys: {
        title: string;
        addKeychain: string;
        addKeyChainDesc: string;
        importKeyChain: string;
        addMasterKey: string;
        createMasterKey: string;
        importMasterKey: string;
        addKeychainHeaderTitle: string;
        importKeychainHeaderTitle: string;
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
    toolTip: {
        coinInfo: string;
        txInfo: string;
    };
    addManually: {
        headerTitle: string;
        btnAddManually: string;
        selectTokenType: string;
        btnAction: string;
        bep2Placeholder: string;
        erc20Placeholder: string;
        name: string;
        symbol: string;
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
    switched: string;
    removed: string;
    keys: string;
    readyDesc: string;
    cameraReadyDesc: string;
    hasCameraDesc: string;
    scanQrCode: string;
    placeQrCode: string;
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

export interface IWelcomeLanguage {
    newUser: INewUserLanguage;
    oldUser: IOldUserLanguage;
    forgotPass: IForgotPassLanguage;
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
export interface IModalLanguage {
    addKeysModal: string;
    createKeyModal: string;
}

export interface IKeysExplainedLanguage {
    header: string;
    desc: string;
    content: {
        title: string;
        text: string;
    }[];
}
