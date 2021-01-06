import React from 'react';
import { AppIcon } from 'src/components';
import styled from 'styled-components';
import NewUser from './features/NewUser';
import OldUser from './features/OldUser';
import enhance from './Welcome.enhance';
import { IProps } from './Welcome.interface';

const Styled = styled.div`
    .content {
        margin-top: 30px;
    }
`;

const Welcome = (props: IProps) => {
    const { isInitWallet, isReset, onForgot } = props;
    const renderContent = () => {
        if (isReset || !isInitWallet) {
            return <NewUser isReset={isReset} />;
        }

        return <OldUser onForgot={onForgot} />;
    };

    return (
        <Styled>
            <AppIcon />
            <div className="content">{renderContent()}</div>
        </Styled>
    );
};

export default enhance(React.memo(Welcome));
