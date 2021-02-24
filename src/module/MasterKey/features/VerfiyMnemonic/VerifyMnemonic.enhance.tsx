import React, { useMemo, useState } from 'react';
import { compose } from 'recompose';
import shuffle from 'lodash/shuffle';
import { withLayout } from 'src/components/Layout';
import { useDispatch, useSelector } from 'react-redux';
import { ILanguage } from 'src/i18n';
import { translateSelector } from 'src/module/Configs';
import { actionImportWallet } from 'src/module/Wallet';
import { newPasswordSelector, passwordSelector } from 'src/module/Password';
import { IProps } from './VerifyMnemonic.inteface';

const enhance = (WrappedComponent: any) => (props: IProps) => {
    const { mnemonic, masterKeyName } = props;
    const [error, setError] = useState('');
    const [selectedOrder, setSelectedOrder] = useState<Array<number>>([]);
    const translate: ILanguage = useSelector(translateSelector);
    const currentPass = useSelector(passwordSelector);
    const newPass = useSelector(newPasswordSelector);

    const pass = newPass || currentPass;
    const dispatch = useDispatch();

    // eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars
    const errorDictionary = translate.error;

    const randomWords = useMemo(() => {
        return shuffle(mnemonic.split(' '));
    }, [mnemonic]);

    const words = useMemo(() => {
        const newWords = [...randomWords].map((item, index) => ({
            text: item,
            index,
            isSelected: selectedOrder.includes(index),
        }));

        return newWords;
    }, [selectedOrder]);

    const selectedWords = useMemo(() => {
        const selected = selectedOrder.map((item) => words[item].text);
        return selected.join(' ');
    }, [selectedOrder]);

    const isDisabled = useMemo(() => {
        return !!error || words.some((item) => !item.isSelected);
    }, [words, error]);

    const handleToggleWord = (index: number) => {
        setError('');
        setSelectedOrder((oldOrders) => {
            let newSelectedOrders;

            if (oldOrders.includes(index)) {
                newSelectedOrders = oldOrders.filter((item) => item !== index);
            } else {
                newSelectedOrders = [...oldOrders, index];
            }
            return [...newSelectedOrders];
        });
    };

    const handleVerify = () => {
        if (mnemonic !== selectedWords) {
            return setError(errorDictionary.invalidMnemonic);
        }
        dispatch(actionImportWallet(masterKeyName, mnemonic, pass));
    };

    return (
        <WrappedComponent
            {...props}
            words={words}
            selectedWords={selectedWords}
            onToggleWord={handleToggleWord}
            onVerify={handleVerify}
            isDisabled={isDisabled}
            error={error}
        />
    );
};

export default compose<IProps, any>(withLayout, enhance);
