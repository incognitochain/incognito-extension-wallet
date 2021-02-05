import React, { useCallback, useState } from 'react';
import { compose } from 'recompose';
import { withLayout } from 'src/components/Layout';
import { IProps } from './NewMasterKey.inteface';

const enhance = (WrappedComponent: any) => (props: IProps) => {
    const { onBack } = props;

    const [masterKeyName, setMasterKeyName] = useState('');
    const [mnemonic, setMnemonic] = useState('');
    const [agree, setAgree] = useState(false);
    const [step, setStep] = useState(0);

    const handleChangeName = useCallback(
        (name: string) => {
            setMasterKeyName(name);
            setStep(step + 1);
        },
        [step],
    );

    const handleChangeMnemonic = useCallback(
        (newMnemonic: string) => {
            setMnemonic(newMnemonic);
            setStep(step + 1);
        },
        [step],
    );

    const handleBack = useCallback(() => {
        if (step === 0) {
            onBack();
        } else if (step === 1) {
            setMnemonic('');
            setStep(step - 1);
        } else {
            setStep(step - 1);
        }
    }, [step]);

    return (
        <WrappedComponent
            {...props}
            mnemonic={mnemonic}
            masterKeyName={masterKeyName}
            onChangeMasterKeyName={handleChangeName}
            onChangeMnemonic={handleChangeMnemonic}
            onAgree={() => setAgree(true)}
            agree={agree}
            step={step}
            onBack={handleBack}
        />
    );
};

export default compose<IProps, any>(withLayout, enhance);
