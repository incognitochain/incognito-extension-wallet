import { getLocalDecimalSeparator, saveLocalDecimalSeparator } from 'src/services';

export let DECIMAL_SEPARATOR = '.';
export let GROUP_SEPARATOR = ',';

export function setDecimalSeparator(newSeparator: string) {
    if (DECIMAL_SEPARATOR !== newSeparator) {
        GROUP_SEPARATOR = DECIMAL_SEPARATOR;
        DECIMAL_SEPARATOR = newSeparator;
        saveLocalDecimalSeparator(DECIMAL_SEPARATOR);
    }
}

export const loadSeparator = () => {
    const savedDecimalSeparator = getLocalDecimalSeparator();
    if (!savedDecimalSeparator) {
        setDecimalSeparator('.');
        saveLocalDecimalSeparator('.');
    } else {
        DECIMAL_SEPARATOR = savedDecimalSeparator;
        if (savedDecimalSeparator === '.') {
            GROUP_SEPARATOR = ',';
        } else {
            GROUP_SEPARATOR = '.';
        }
    }
};

export function getDecimalSeparator() {
    return DECIMAL_SEPARATOR;
}

export function getGroupSeparator() {
    return GROUP_SEPARATOR;
}
