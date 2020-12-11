export interface ISetConfigName {
  logMethod?: (message: string) => void;
  chainURL?: string;
  apiURL?: string;
  mainnet?: boolean;
  wasmPath?: string;
}
