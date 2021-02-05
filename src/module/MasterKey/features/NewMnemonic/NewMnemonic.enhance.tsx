import React, { useCallback, useState } from 'react';
import { compose } from 'recompose';
import { withLayout } from 'src/components/Layout';
import { mnemonicService } from 'incognito-js/build/web/browser';
import { IProps } from './NewMnemonic.interface';

const enhance = (WrappedComponent: any) => (props: IProps) => {
    const { onChangeMnemonic, mnemonic: oldMnemonic } = props;

    const [mnemonic] = useState(oldMnemonic || mnemonicService.newMnemonic());

    const handleNext = useCallback(() => {
        onChangeMnemonic(mnemonic);
    }, [mnemonic]);

    return <WrappedComponent {...props} onNext={handleNext} mnemonic={mnemonic} />;
};

export default compose<IProps, any>(withLayout, enhance);
