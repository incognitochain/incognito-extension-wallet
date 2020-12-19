import axios from 'axios';
import { CustomError, ErrorCode, ExHandler } from './exception';

const HEADERS = { 'Content-Type': 'application/json' };
const TIMEOUT = 20000;
let currentAccessToken = '';

const instance = axios.create({
    timeout: TIMEOUT,
    headers: {
        ...HEADERS,
        Authorization: '',
    },
});
let pendingSubscribers = [];
let isAlreadyFetchingAccessToken = false;

function onAccessTokenFetched(accessToken) {
    pendingSubscribers = pendingSubscribers.filter((callback) => callback(accessToken));
}

function addSubscriber(callback) {
    pendingSubscribers.push(callback);
}

// Add a request interceptor
instance.interceptors.request.use(
    (config) => {
        return {
            ...config,
            headers: {
                ...config.headers,
                Authorization: `Bearer ${currentAccessToken}`,
            },
        };
    },
    (error) => {
        return Promise.reject(error);
    },
);

export const setTokenHeader = (token) => {
    try {
        currentAccessToken = token;
        axios.defaults.headers.Authorization = `Bearer ${token}`;
    } catch {
        throw new Error('Can not set token request');
    }
};

instance.interceptors.response.use(
    (res) => {
        const result = res?.data?.Result;
        return Promise.resolve(result);
    },
    (errorData) => {
        const errResponse = errorData?.response;
        const originalRequest = errorData?.config;
        // can not get response, alert to user
        if (errorData?.isAxiosError && !errResponse) {
            return new ExHandler(new CustomError(ErrorCode.network_make_request_failed)).throw();
        }

        // Unauthorized
        if (errResponse?.status === 401) {
            console.log('Token was expired');
            if (!isAlreadyFetchingAccessToken) {
                isAlreadyFetchingAccessToken = true;
                if (typeof global.login === 'function') {
                    global.login().then((token) => {
                        isAlreadyFetchingAccessToken = false;
                        onAccessTokenFetched(token);
                    });
                } else {
                    console.debug('Token was expired, but can not re-new it!');
                }
            }

            const retryOriginalRequest = new Promise((resolve) => {
                addSubscriber((accessToken) => {
                    originalRequest.headers.Authorization = `Bearer ${accessToken}`;
                    setTokenHeader(accessToken);
                    resolve(instance(originalRequest));
                });
            });

            return retryOriginalRequest;
        }

        // get response of error
        // wrap the error with CustomError to custom error message, or logging
        const data = errResponse?.data;
        if (data && data.Error) {
            throw new CustomError(data.Error?.Code, {
                name: CustomError.TYPES.API_ERROR,
                message: data.Error?.Message,
            });
        }

        return Promise.reject(errorData);
    },
);

export const setRenewToken = (fn) => {
    if (typeof fn !== 'function') throw new Error('setRenewToken must be recieved a function');
};

export default instance;
