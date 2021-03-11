import React from 'react';
import styled from 'styled-components';
import Close from 'src/components/Icons/Close';
import { COLORS } from 'src/styles/colors';
import withShield from 'src/module/Shield/Shield.enhance';
import SearchBox from 'src/components/Header/Header.searchBox';
import { ListAllToken, TokenBasic } from 'src/module/Token';

const Wrapper = styled.div`
    padding: 30px 28px 20px;
    height: 557px;
    .close-icon {
        height: 20px;
        width: 20px;
        margin-right: 4px;
    }
    input {
        margin-top: 10px;
        width: 100%;
        height: 51px;
        border: 0.5px solid ${COLORS.colorKeyGrey};
        border-radius: 10px;
        padding: 15px;
        background-color: transparent;
        margin-bottom: 10px;
        ::-webkit-input-placeholder {
        }
    }
    .all-list-token .list-token a:first-child {
        margin-top: 20px;
    }
    .scroll-view {
        max-height: 430px;
    }
`;

const CoinsShieldModal = React.memo((props: any) => {
    const { tokensFactories, toggleUnVerified, onToggleUnVerifiedTokens } = props;
    const renderItem = (tokenId: string) => {
        return <TokenBasic tokenId={tokenId} handleSelectToken={() => {}} />;
    };
    return (
        <Wrapper>
            <Close />
            <SearchBox title="Select a coin to shield" />
            <ListAllToken {...{ tokensFactories, toggleUnVerified, onToggleUnVerifiedTokens, renderItem }} />
        </Wrapper>
    );
});
export default withShield(CoinsShieldModal);
