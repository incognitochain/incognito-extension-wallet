import { http } from 'src/http';
import {
  IApiEstimateUserFees,
  IApiGenCenUnShieldAddr,
  IApiUnShield,
  IApiUpdatePTokenFee,
} from './Send.interface';

export const apiGetEstimateFeeFromChain = (
  apiURL: string,
  data: {
    Prv: number;
    TokenID: string;
  }
) => http.post(`${apiURL}/chain/estimatefee`, data);

export const apiCheckIfValidAddressETH = (apiURL: string, address: string) =>
  http.get(`${apiURL}/eta/is-eth-account?address=${address}`);

export const apiCheckValidAddress = (
  apiURL: string,
  address: string,
  currencyType: number
) => http.get(`${apiURL}/ota/valid/${currencyType}/${address}`);

export const apiGenCenUnShieldAddr = (
  apiURL: string,
  data: IApiGenCenUnShieldAddr
) => http.post(`${apiURL}/ota/generate`, data);

export const apiUnShield = (apiURL: string, data: IApiUnShield) =>
  http.post(`${apiURL}/eta/add-tx-withdraw`, data);

export const apiUpdatePTokenFee = (apiURL: string, data: IApiUpdatePTokenFee) =>
  http.post(`${apiURL}/ota/update-fee`, data);

export const apiEstimateUserFees = (
  apiURL: string,
  data: IApiEstimateUserFees
) => http.post(`${apiURL}/eta/estimate-fees`, data);
