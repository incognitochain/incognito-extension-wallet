import {
    BACKGROUND_LISTEN,
    CONTENT_LISTEN,
    EXTENSION_LISTEN,
    EXTENSION_URL,
    INCOGNITO_EXTENSION_SEND_DATA,
    NOTIFICATION_HEIGHT,
    NOTIFICATION_WIDTH,
} from "./consts";
import {
    closeCurrentWindow,
    extension,
    getActiveTabs,
    getAllTabs,
    getLastFocusedWindow,
    openWindow,
    sendMessage,
    updateWindowPosition
} from "./extension";

const popupOptions = {
    url: EXTENSION_URL,
    type: 'popup',
    width: NOTIFICATION_WIDTH,
    height: NOTIFICATION_HEIGHT,
    left: 0,
    top: 0
};

let tabWindow = null;
let requestAccount = {};
let currentRequest = null;
let pass = {};
let tabRequest = null;

const isOpenPopup = async () => {
    const tabs = await getActiveTabs()
    return Boolean(
      tabs.find((tab) => EXTENSION_URL === tab.url),
    );
};

const tabSendMessage = (tabId, params) => {
    try {
        extension.tabs.sendMessage(tabId, params, () => {});  
    } catch (error) {/*Ignore error*/}
};

const getOriginalURL = (sender) => {
    try {
        const url = new URL(sender.url);
        return url.origin;
    } catch (error) {/*Ignore error*/}
};

const getCurrentRequestTab = async (origin) => {
    try {
        const tabs = await getActiveTabs();
        return tabs.find(tab => getOriginalURL(tab) === origin);
    } catch (error) {/*Ignore error*/}
};

// When user accept connect account
// @params {object} account
// @params {string} account.name
// @params {string} account.paymentAddress
// @params {tokens} account.tokens
const handleConnectAccount = async (account, origin, closeWindow) => {
    try {
        if (!origin) return;
        const params = { 
            name: INCOGNITO_EXTENSION_SEND_DATA, 
            key: CONTENT_LISTEN.CONNECT_TO_ACCOUNT_SUCCESS, 
            origin,
            data: account
        }

        // current request tab
        const tab = await getCurrentRequestTab(origin)

        if (!tab) return;

        // send data to client
        tabSendMessage(tab.id, params); 

        // save account with origin connected
        requestAccount[origin] = account;

        // close window
        setTimeout(() => {
            if (!closeWindow) return;
            closeCurrentWindow();
        }, 1000); 

    } catch (error) {
        console.debug('CONNECT TO: ', account.name, 'FAIL ERROR: ', error);
    }
};

const updateBalanceToConnectedPage = async (account) => {
    // To do update balance to connected page
    if (requestAccount) {
        const tabs = await getActiveTabs();
        for (const origin of Object.keys(requestAccount)) {
            const lastAccount = requestAccount[origin];
            if (lastAccount && account.name === lastAccount.name) {
                requestAccount = {
                    ...requestAccount,
                    [origin]: account
                }
                const tab = tabs.find(tab => getOriginalURL(tab) === origin);
                // If origin is open, send new account to this page
                if (tab) handleConnectAccount(account, origin, false).then();
            }
        }
    }
};

const openPopup = async (sender) => {
    try {
        // Open new window
        tabRequest = sender.tab;
        const lastFocused = await getLastFocusedWindow()
        tabWindow = await openWindow(popupOptions);

        // Position window in top right corner of lastFocused window.
        if (lastFocused) {
            const top = lastFocused.top;
            const left = lastFocused.left + (lastFocused.width - NOTIFICATION_WIDTH)
            await updateWindowPosition(tabWindow.id, left, top)
        }
        return tabWindow;
    } catch (error) {
        console.debug('OPEN POP UP WITH ERROR: ', error)
    }
};

const postCurrentRequestToExtension = (data) => {
    if (!currentRequest) return;
    const { request, origin } = currentRequest;
    setTimeout(() => {
        switch (request) {
            // move to connect account screen
            case BACKGROUND_LISTEN.REQUEST_CONNECT_ACCOUNT:
                sendMessage({ name: EXTENSION_LISTEN.MOVE_TO_CONNECT_ACCOUNT, origin }).then()
                break;
            case BACKGROUND_LISTEN.REQUEST_SEND_TX:
                sendMessage({ name: EXTENSION_LISTEN.MOVE_TO_SEND_TX, origin, data }).then();
                break;
            default:
                break;
        }
    }, 500);
};

const requestConnectAccount = async (sender) => {
    // check popup did open
    const popupDidOpen = await isOpenPopup()
    if (!sender || popupDidOpen) return;

    // request URL
    const origin = getOriginalURL(sender);

    // url did connect with extension
    if (requestAccount[origin]) {
        handleConnectAccount(requestAccount[origin], origin, false).then();
        return;
    }

    // handle Open popup
    const popup = await openPopup(sender);

    if (popup) {
        currentRequest = { origin, request: BACKGROUND_LISTEN.REQUEST_CONNECT_ACCOUNT };
    }

    postCurrentRequestToExtension();
};

const checkIsConnected = (tab, accountName) => {
    try {
        if (!tab) tab = tabRequest;
        const origin = getOriginalURL(tab)
        if (!origin) return false;
        let isConnect = false;
        Object.keys(requestAccount).forEach(connectOrigin => {
            if (connectOrigin === origin
              && requestAccount[origin]
              && requestAccount[origin]?.name === accountName
            ) isConnect = true
        });
        return { isConnect, origin };
    } catch (error) {/*Ignored error*/}
};

const postMessageDisableAccount = async (origin) => {
    const params = { 
        name: INCOGNITO_EXTENSION_SEND_DATA, 
        key: CONTENT_LISTEN.DISCONNECT_ACCOUNT, 
        origin,
    }

    // current request tab
    const tab = await getCurrentRequestTab(origin)

    if (!tab) return;
    // send data to client
    tabSendMessage(tab.id, params); 
}

const handleDisconnectAccount = (origin) => {
    try {
        if (requestAccount) {
            Object.keys(requestAccount).forEach(connectOrigin => {
                if (connectOrigin === origin && requestAccount[origin]) {
                    delete requestAccount[origin];
                    postMessageDisableAccount(origin).then();
                }
            });
        }
    } catch (error) {
        /*Ignored error*/
    }
};

const handleRequestSendTx = async (sender, request) => {
    // check popup did open
    const popupDidOpen = await isOpenPopup()
    if (!sender || popupDidOpen) return;

    // request URL
    const origin = getOriginalURL(sender);

    // account not connect with origin
    if (!requestAccount[origin]) return;

    // handle Open popup
    const popup = await openPopup(sender);

    if (popup) {
        currentRequest = { origin, request: BACKGROUND_LISTEN.REQUEST_SEND_TX };
    }

    postCurrentRequestToExtension(request);
};

const getTabWithOrigin = async (origin) => {
    const tabs = await getAllTabs();
    return tabs.find(tab => getOriginalURL(tab) === origin);
};

const handleSendTxFinish = async (data) => {
    try {
        if (!currentRequest) return;
        const { origin } = currentRequest;
        const { error, txInfo } = data;
        const tab = await getTabWithOrigin(origin);
        if (!tab) return;
        const params = { 
            name: INCOGNITO_EXTENSION_SEND_DATA, 
            key: CONTENT_LISTEN.SEND_TX_FINISH, 
            origin,
            data: { error, txInfo }
        }
        currentRequest = null;
        // send data to client
        tabSendMessage(tab.id, params);
    } catch (error) {/*Ignored error*/}
};

const handleCancelSendTx = async () => {
    try {
        if (!currentRequest) return;
        const { origin } = currentRequest;
        const tab = await getTabWithOrigin(origin);
        currentRequest = null;
        if (!tab) return;
        currentRequest = null;
        const params = {
            name: INCOGNITO_EXTENSION_SEND_DATA,
            key: CONTENT_LISTEN.CANCEL_SEND_TX,
            origin,
        }
        tabSendMessage(tab.id, params);
    } catch (e) {/*Ignored error*/}
};

const handleCheckConnectAccount = async (sender) => {
    const origin = getOriginalURL(sender);
    const tab = await getTabWithOrigin(origin);
    if (!tab) return;
    const account = requestAccount[origin];
    let params = {
        name: INCOGNITO_EXTENSION_SEND_DATA,
        origin,
        key: account ? CONTENT_LISTEN.CONNECT_TO_ACCOUNT_SUCCESS : CONTENT_LISTEN.DISCONNECT_ACCOUNT,
        data: account
    };
    tabSendMessage(tab.id, params);
};

extension.runtime.onMessage.addListener(async(request, sender, sendResponse) => {
    const { name, data } = request;
    switch (name) {
        // Client request connect account
        case BACKGROUND_LISTEN.REQUEST_CONNECT_ACCOUNT: {
            requestConnectAccount(sender).then();
            return sendResponse(sender);
        }
        // Client request send tx
        case BACKGROUND_LISTEN.REQUEST_SEND_TX: {
            handleRequestSendTx(sender, request).then();
            return sendResponse(sender);
        }
        // Update balance when loaded account
        case BACKGROUND_LISTEN.LOADED_FOLLOWED_BALANCE: {
            const { account } = data || {};
            if (!account) return;
            updateBalanceToConnectedPage(account).then();
            break;
        }
        // Connected with account
        case BACKGROUND_LISTEN.SELECTED_CONNECT_ACCOUNT: {
            if (!currentRequest) return;
            const { account } = data;
            handleConnectAccount(account, currentRequest.origin, true).then();
            break;
        }
        case BACKGROUND_LISTEN.CHECK_IS_CONNECTED: {
            const { tab, accountName } = data;
            return sendResponse(checkIsConnected(tab, accountName))
        }
        case BACKGROUND_LISTEN.DISCONNECT_ACCOUNT: {
            const { origin } = data;
            handleDisconnectAccount(origin)
            break;
        }
        // send tx finish
        case BACKGROUND_LISTEN.SEND_TX_FINISH: {
            handleSendTxFinish(data).then();
            break;
        }
        case BACKGROUND_LISTEN.CLEAR_SEND_CURRENT_REQUEST: {
            handleCancelSendTx().then();
            break;
        }
        case BACKGROUND_LISTEN.GET_PASS_WORD: {
            const { chainURL } = data;
            return sendResponse(pass[chainURL]);
        }
        case BACKGROUND_LISTEN.UPDATE_PASS_WORD: {
            const { password, chainURL } = data;
            pass = {
                ...pass,
                [chainURL]: password
            };
            break;
        }
        case BACKGROUND_LISTEN.CHECK_CONNECT_ACCOUNT: {
            handleCheckConnectAccount(sender).then();
            break;
        }
        case BACKGROUND_LISTEN.CHECK_WALLET_HAVE_CONNECTION: {
            return sendResponse(requestAccount);
        }
        default:
            break;
    }
    sendResponse(sender);
    return true;
});

// Remove current request
chrome.tabs.onRemoved.addListener(function(tabId, info) {
    if (tabWindow) {
        const { tabs } = tabWindow;
        if (tabs.length <= 0) return;
        const isCloseIncognitoExtensionTab = Boolean(
            tabs.find((tab) => tab && tab.id === tabId),
        );
        if (isCloseIncognitoExtensionTab) {
            currentRequest = null;
            tabWindow = null;
            tabRequest = null;
        }
    }
});
