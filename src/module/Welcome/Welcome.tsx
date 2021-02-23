import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { isInitWalletSelector } from '../Wallet';
import NewUser from './features/NewUser';
import OldUser from './features/OldUser';
import withWelcome from './Welcome.enhance';
import { IProps } from './Welcome.interface';

const Styled = styled.div`
    .header {
        margin-top: 0;
    }
`;

const Welcome = (props: IProps) => {
    const { isReset, onForgot, onBack } = props;
    const isInitWallet = useSelector(isInitWalletSelector);
    const renderContent = () => {
        if (isReset || !isInitWallet) {
            return <NewUser isReset={isReset} onBack={onBack} />;
        }
        return <OldUser onForgot={onForgot} />;
    };
    return <Styled>{renderContent()}</Styled>;
};

export default withWelcome(React.memo(Welcome));
