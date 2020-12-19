import { http } from 'src/http';
import { cachePromise } from 'src/services';

export const apiGetPTokenList = (apiURL: string) =>
    cachePromise('ptoken', () => http.get(`${apiURL}/ptoken/list`).then((res: any) => res));

export const apiGetPCustomTokenList = (apiURL: string) =>
    cachePromise('pcustomtoken', () => http.get(`${apiURL}/pcustomtoken/list`).then((res: any) => res));
