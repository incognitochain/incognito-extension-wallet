import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Header } from 'src/components';
import { IShieldLanguage } from 'src/i18n';
import styled from 'styled-components';
import { translateByFieldSelector } from 'src/module/Configs';
import { actionSetSelectedToken, ListAllToken, TokenBasic } from 'src/module/Token';
import { useHistory } from 'react-router-dom';
import withShield, { IMergedProps } from './Shield.enhance';
import { route as routeGenShieldAddress } from './features/GenShieldAddress';

const Styled = styled.div``;

const Shield = (props: IMergedProps & any) => {
    const translate: IShieldLanguage = useSelector(translateByFieldSelector)('shield');
    const dispatch = useDispatch();
    const { tokensFactories, toggleUnVerified, onToggleUnVerifiedTokens }: IMergedProps = props;
    const history = useHistory();
    const handleShieldToken = async (tokenId: string) => {
        await dispatch(actionSetSelectedToken(tokenId));
        history.push(routeGenShieldAddress);
    };
    const renderItem = (tokenId: string) => {
        return <TokenBasic tokenId={tokenId} handleSelectToken={() => handleShieldToken(tokenId)} />;
    };
    return (
        <Styled>
            <Header title={translate.headerTitle} canSearch />
            <ListAllToken {...{ tokensFactories, toggleUnVerified, onToggleUnVerifiedTokens, renderItem }} />
        </Styled>
    );
};

export default withShield(Shield);
