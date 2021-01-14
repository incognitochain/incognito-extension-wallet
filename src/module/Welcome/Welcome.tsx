import React from 'react';
import styled from 'styled-components';
import NewUser from './features/NewUser';
import OldUser from './features/OldUser';
import enhance from './Welcome.enhance';
import { IProps } from './Welcome.interface';

const Styled = styled.div``;

const Welcome = (props: IProps) => {
    const { isInitWallet, isReset, onForgot, onBack } = props;
    const renderContent = () => {
        if (isReset || !isInitWallet) {
            return <NewUser isReset={isReset} onBack={onBack} />;
        }

        return <OldUser onForgot={onForgot} />;
    };

    return (
        <Styled>
            <div>{renderContent()}</div>
        </Styled>
    );
};

export default enhance(React.memo(Welcome));
