'use strict';

const EXTENSION_URL = 'chrome-extension://dackgmpbcfpcbjdjkndjfgebhfgcojfo/index.html';
const NOTIFICATION_HEIGHT = 598;
const NOTIFICATION_WIDTH = 355;

const INCOGNITO_EXTENSION_SEND_DATA 
= 'INCOGNITO_EXTENSION_SEND_DATA';

// MESSAGE CONTENT LISTEN
const CONTENT_LISTEN = {
    CONNECT_TO_ACCOUNT_SUCCESS: 'CONTENT_CONNECT_TO_ACCOUNT_SUCCESS',
    DISCONNECT_ACCOUNT: 'CONTENT_DISCONNECT_ACCOUNT',
    SEND_TX_FINISH: 'CONTENT_SEND_TX_FINISH',
    CANCEL_SEND_TX: 'CONTENT_CANCEL_SEND_TX',
};


// MESSAGE EXTENSION LISTEN
const EXTENSION_LISTEN = {
    MOVE_TO_CONNECT_ACCOUNT: 'EXTENSION_MOVE_TO_CONNECT_ACCOUNT',
    MOVE_TO_SEND_TX: 'EXTENSION_MOVE_TO_SEND_TX',
};

// MESSAGE BACKGROUND LISTEN
const BACKGROUND_LISTEN = {
    SELECTED_CONNECT_ACCOUNT: 'BACKGROUND_SELECTED_CONNECT_ACCOUNT',
    LOADED_FOLLOWED_BALANCE: 'BACKGROUND_LOADED_FOLLOWED_BALANCE',
    REQUEST_CONNECT_ACCOUNT: 'BACKGROUND_REQUEST_CONNECT_ACCOUNT',
    REQUEST_SEND_TX: 'BACKGROUND_REQUEST_SEND_TX',
    REQUEST_RELOAD_ACCOUNT: 'BACKGROUND_REQUEST_RELOAD_ACCOUNT',
    DISCONNECT_ACCOUNT: 'BACKGROUND_DISCONNECT_ACCOUNT',
    CHECK_IS_CONNECTED: 'BACKGROUND_CHECK_IS_CONNECTED',
    SEND_TX_FINISH: 'BACKGROUND_SEND_TX_FINISH',
    CLEAR_SEND_CURRENT_REQUEST: 'BACKGROUND_CLEAR_SEND_CURRENT_REQUEST',
    GET_PASS_WORK: 'BACKGROUND_GET_PASS_WORK',
    UPDATE_PASS_WORK: 'BACKGROUND_UPDATE_PASS_WORK',
};

const apis = [
  'alarms',
  'bookmarks',
  'browserAction',
  'commands',
  'contextMenus',
  'cookies',
  'downloads',
  'events',
  'extension',
  'extensionTypes',
  'history',
  'i18n',
  'idle',
  'notifications',
  'pageAction',
  'runtime',
  'storage',
  'tabs',
  'webNavigation',
  'webRequest',
  'windows',
];

const hasChrome = typeof chrome !== 'undefined';
const hasWindow = typeof window !== 'undefined';
const hasBrowser = typeof browser !== 'undefined';

class Browser {
  constructor() {
    const _this = this;

    apis.forEach(function (api) {

      _this[api] = null;

      if (hasChrome) {
        try {
          if (chrome[api]) {
            _this[api] = chrome[api];
          }
        } catch (e) {
        }
      }

      if (hasWindow) {
        try {
          if (window[api]) {
            _this[api] = window[api];
          }
        } catch (e) {
        }
      }

      if (hasBrowser) {
        try {
          if (browser[api]) {
            _this[api] = browser[api];
          }
        } catch (e) {
        }
        try {
          _this.api = browser.extension[api];
        } catch (e) {
        }
      }
    });

    if (hasBrowser) {
      try {
        if (browser && browser.runtime) {
          this.runtime = browser.runtime;
        }
      } catch (e) {
      }

      try {
        if (browser && browser.browserAction) {
          this.browserAction = browser.browserAction;
        }
      } catch (e) {
      }
    }
  }
}

const checkForError = () => {
    const { lastError } = extension.runtime;
    if (!lastError) {
      return undefined
    }
    // if it quacks like an Error, its an Error
    if (lastError.stack && lastError.message) {
      return lastError
    }
    // repair incomplete error object (eg chromium v77)
    return new Error(lastError.message)
};

const extension = new Browser();

const sendMessage = (data) => {
  return new Promise((resolve, reject) => {
    extension.runtime.sendMessage(data, (response) => {
      const error = checkForError();
      if (error) {
        return reject(error)
      }
      return resolve(response)
    });
  })
};
  
const openWindow = (options) => {
  return new Promise((resolve, reject) => {
    extension.windows.create(options, (newWindow) => {
      const error = checkForError();
      if (error) {
        return reject(error)
      }
      return resolve(newWindow)
    });
  })
};

const updateWindowPosition = (windowId, left, top) => {
  return new Promise((resolve, reject) => {
    extension.windows.update(windowId, { left, top }, () => {
      const error = checkForError();
      if (error) {
        return reject(error)
      }
      return resolve()
    });
  })
};

const getLastFocusedWindow = () => {
  return new Promise((resolve, reject) => {
    extension.windows.getLastFocused((windowObject) => {
      const error = checkForError();
      if (error) {
        return reject(error)
      }
      return resolve(windowObject)
    });
  })
};

const closeCurrentWindow = () => {
  return extension.windows.getCurrent((windowDetails) => {
    return extension.windows.remove(windowDetails.id)
  })
};

const getActiveTabs = () => {
  return new Promise((resolve, reject) => {
    extension.tabs.query({ active: true }, (tabs) => {
      const error = checkForError();
      if (error) {
        return reject(error)
      }
      return resolve(tabs)
    });
  })
};

const getAllTabs = () => {
  return new Promise((resolve, reject) => {
    extension.tabs.query({}, (tabs) => {
      const error = checkForError();
      if (error) {
        return reject(error)
      }
      return resolve(tabs)
    });
  })
};

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
let pass = null;

const isOpenPopup = async () => {
    const tabs = await getActiveTabs();
    const isOpenPopup = Boolean(
      tabs.find((tab) => EXTENSION_URL === tab.url),
    );
    return isOpenPopup;
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
        };

        // current request tab
        const tab = await getCurrentRequestTab(origin);

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
        Object.keys(requestAccount).forEach(async(origin) => {
            const lastAccount = requestAccount[origin];
            if (lastAccount && account.name === lastAccount.name) {
                requestAccount = { 
                    ...requestAccount,
                    [origin]: account
                };
                const tab = tabs.find(tab => getOriginalURL(tab) === origin);
                // If orign is open, send new account to this page
                if (tab) handleConnectAccount(account, origin, false);
            }
        });
    }
};

const openPopup = async () => {
    try {
        // Open new window
        const lastFocused = await getLastFocusedWindow();
        tabWindow = await openWindow(popupOptions);

        // Position window in top right corner of lastFocused window.
        if (lastFocused) {
            const top = lastFocused.top;
            const left = lastFocused.left + (lastFocused.width - NOTIFICATION_WIDTH);
            await updateWindowPosition(tabWindow.id, left, top);
        }
        return tabWindow;
    } catch (error) {
        console.debug('OPEN POP UP WITH ERROR: ', error);
    }
};

const postCurrentRequestToExtension = (data) => {
    if (!currentRequest) return;
    const { request, origin } = currentRequest;
    setTimeout(() => {
        switch (request) {
            // move to connect account screen
            case BACKGROUND_LISTEN.REQUEST_CONNECT_ACCOUNT:
                sendMessage({ name: EXTENSION_LISTEN.MOVE_TO_CONNECT_ACCOUNT, origin });
                break;
            case BACKGROUND_LISTEN.REQUEST_SEND_TX:
                sendMessage({ name: EXTENSION_LISTEN.MOVE_TO_SEND_TX, origin, data });
                break;
        }
    }, 500);
};

const requestConnectAccount = async (sender) => {
    // check popup did open
    const popupDidOpen = await isOpenPopup();
    if (!sender || popupDidOpen) return;

    // request URL
    const origin = getOriginalURL(sender);

    // url did connect with extension
    if (requestAccount[origin]) {
        handleConnectAccount(requestAccount[origin], origin, false);
        return;
    }

    // handle Open popup
    const popup = await openPopup();

    if (popup) {
        currentRequest = { origin, request: BACKGROUND_LISTEN.REQUEST_CONNECT_ACCOUNT };
    }

    postCurrentRequestToExtension();
};

const checkIsConnected = (tab) => {
    try {
        const origin = getOriginalURL(tab);
        if (!origin) return false;
        let isConnect = false;
        Object.keys(requestAccount).forEach(connectOrigin => {
            if (connectOrigin === origin && requestAccount[origin]) isConnect = true;
        });
        return isConnect;
    } catch (error) {
        /*Ignored error*/
    }
};

const postMessageDisableAccount = async (origin) => {
    const params = { 
        name: INCOGNITO_EXTENSION_SEND_DATA, 
        key: CONTENT_LISTEN.DISCONNECT_ACCOUNT, 
        origin,
    };

    // current request tab
    const tab = await getCurrentRequestTab(origin);

    if (!tab) return;
    // send data to client
    tabSendMessage(tab.id, params); 
};

const handleDisconnectAccount = (origin) => {
    try {
        if (requestAccount) {
            Object.keys(requestAccount).forEach(connectOrigin => {
                if (connectOrigin === origin && requestAccount[origin]) {
                    delete requestAccount[origin];
                    postMessageDisableAccount(origin);
                }
            });
        }
    } catch (error) {
        /*Ignored error*/
    }
};

const handleRequestSendTx = async (sender, request) => {
    // check popup did open
    const popupDidOpen = await isOpenPopup();
    if (!sender || popupDidOpen) return;

    // request URL
    const origin = getOriginalURL(sender);

    // account not connect with origin
    if (!requestAccount[origin]) return;

    // handle Open popup
    const popup = await openPopup();

    if (popup) {
        currentRequest = { origin, request: BACKGROUND_LISTEN.REQUEST_SEND_TX };
    }

    postCurrentRequestToExtension(request);
};

const getTabWithOrigin = async (origin) => {
    const tabs = await getAllTabs();
    const tab = tabs.find(tab => getOriginalURL(tab) === origin);
    return tab;
};

const handleHandleConnectFinish = async (data) => {
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
        };    
        // send data to client    
        tabSendMessage(tab.id, params);
    } catch (error) {/*Ignored error*/}
};

const handleCancelSendTx = async () => {
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
        data: { error, txInfo }
    };
    tabSendMessage(tab.id, params);
};

extension.runtime.onMessage.addListener(async(request, sender, sendResponse) => {
    const { name, data } = request;
    switch (name) {
        // Client request connect account
        case BACKGROUND_LISTEN.REQUEST_CONNECT_ACCOUNT: {
            requestConnectAccount(sender);
            return sendResponse(sender);
        }        // Client request send tx
        case BACKGROUND_LISTEN.REQUEST_SEND_TX: {
            handleRequestSendTx(sender, request);
            return sendResponse(sender);
        }        // Update balance when loaded account
        case BACKGROUND_LISTEN.LOADED_FOLLOWED_BALANCE: {
            const { account } = data || {};
            if (!account) return;
            updateBalanceToConnectedPage(account);
            break;
        }        // Connected with account
        case BACKGROUND_LISTEN.SELECTED_CONNECT_ACCOUNT: {
            if (!currentRequest) return;
            const { account } = data;
            handleConnectAccount(account, currentRequest.origin, true);
            break;
        }        case BACKGROUND_LISTEN.CHECK_IS_CONNECTED: {
            const { tab } = data;
            return sendResponse(checkIsConnected(tab));
        }        case BACKGROUND_LISTEN.DISCONNECT_ACCOUNT: {
            const { origin } = data;
            handleDisconnectAccount(origin);
            return sendResponse(checkIsConnected(origin));
        }        // send tx finish
        case BACKGROUND_LISTEN.SEND_TX_FINISH: {
            handleHandleConnectFinish(data);
            break;
        }        case BACKGROUND_LISTEN.CLEAR_SEND_CURRENT_REQUEST: {
            handleCancelSendTx();
            break;
        }        case BACKGROUND_LISTEN.GET_PASS_WORK: {
            return sendResponse(pass);
        }        case BACKGROUND_LISTEN.UPDATE_PASS_WORK: {
            const { passwork } = data;
            pass = passwork;
            break;
        }    }
    sendResponse(sender);
    return true;
});

// Remove current request
chrome.tabs.onRemoved.addListener(function(tabId, info) {
    const { tabs } = tabWindow;
    if (tabWindow && tabs.length > 0) {
        const isCloseIncognitExtensionTab = Boolean(
            tabs.find((tab) => tab && tab.id === tabId),
        );
        if (isCloseIncognitExtensionTab) {
            currentRequest = null;
            tabWindow = null;
        }
    }
});
