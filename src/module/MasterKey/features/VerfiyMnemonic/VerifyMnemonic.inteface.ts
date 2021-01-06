export interface ISelectableWord {
    text: string;
    isSelected: boolean;
    index: number;
}

export interface IProps {
    masterKeyName: string;
    words: Array<ISelectableWord>;
    selectedWords: string;
    mnemonic: string;
    error: string;
    onToggleWord: (index: number) => void;
    onVerify: () => void;
    isDisabled: boolean;
}
