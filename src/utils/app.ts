export const getActiveTabs = () => {
    return new Promise((resolve) => {
        chrome.tabs.query({ active: true }, (tabs) => {
            return resolve(tabs);
        });
    });
};

export const getLastFocusedWindow = () => {
    return new Promise((resolve) => {
        chrome.windows.getLastFocused((windowObject) => {
            return resolve(windowObject);
        });
    });
};

export const queryCurrentActiveTab = () => {
    return new Promise((resolve) => {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            const [activeTab] = tabs;
            const { url = '' } = activeTab;
            const parsedUrl = new URL(url) || {};
            const { origin, pathname } = parsedUrl;
            if (!origin || origin === 'null' || pathname === '/index.html') {
                resolve(null);
                return;
            }
            resolve(activeTab);
        });
    });
};
export const getURL = (url?: string) => {
    if (!url) return null;
    return new URL(url);
};
