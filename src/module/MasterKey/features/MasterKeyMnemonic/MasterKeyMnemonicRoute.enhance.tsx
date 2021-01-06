import React from 'react';
import { compose } from 'recompose';
import { withLayout } from 'src/components/Layout';
import { useSelector } from 'react-redux';
import { IProps } from './MasterKeyMnemonic.inteface';
import { walletMnemonicSelector } from '../../../Wallet';

const enhance = (WrappedComponent: any) => (props: IProps) => {
    const mnemonic = useSelector(walletMnemonicSelector);

    return <WrappedComponent {...props} mnemonic={mnemonic} />;
};

export default compose<IProps, any>(withLayout, enhance);
