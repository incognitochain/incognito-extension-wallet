import { http } from 'src/http';
import { cachePromise } from 'src/services';

export const apiGetPTokenList = (apiURL: string, noCache: boolean) =>
    noCache ? http.get(`${apiURL}/ptoken/list`) : cachePromise('ptoken', () => http.get(`${apiURL}/ptoken/list`));

export const apiGetPCustomTokenList = (apiURL: string, noCache: boolean) =>
    noCache
        ? http.get(`${apiURL}/pcustomtoken/list`)
        : cachePromise('pcustomtoken', () => http.get(`${apiURL}/pcustomtoken/list`));
