import { IObject } from 'src/utils';

export const caches: IObject = {};

export const cache = (key: string, data: any, expiredTime: number) => {
    caches[key] = {
        data,
        expiredTime: new Date().getTime() + expiredTime,
    };
};

export function getCache(key: string) {
    const cacheData = caches[key];
    if (cacheData && cacheData.expiredTime > new Date().getTime()) {
        return cacheData.data;
    }
    return null;
}

export const clearCache = (key: string) => {
    if (!caches[key]) {
        return;
    }
    delete caches[key];
};

export const cachePromise = async (key: string, promiseFunc: any, expiredTime?: number) => {
    const cachedData = getCache(key);
    if (cachedData !== null) {
        return cachedData;
    }
    const data = await promiseFunc();
    cache(key, data, expiredTime || 40000);
    return data;
};
