export interface IProps {}

export interface IReducer {
    masterKeyName: string;
    agree: boolean;
    step: number;
    mnemonic: string;
    randomWords: string[];
    selectedWordsIndex: number[];
}
