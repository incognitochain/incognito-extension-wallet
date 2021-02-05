import React from 'react';
import { useSelector } from 'react-redux';
import { Header } from 'src/components';
import { ILanguage } from 'src/i18n';
import { translateSelector } from 'src/module/Configs';
import styled from 'styled-components';
import { ListAllToken, TokenBasic, IAllListTokenInner } from 'src/module/Token';

import withAddToken, { TInner } from './AddToken.enhance';

const Styled = styled.div``;

const AddToken = (props: TInner & IAllListTokenInner & any) => {
    const translate: ILanguage = useSelector(translateSelector);
    const addTokenTranslate = translate.token.addToken;
    const { handleToggleFollowTokenById } = props;
    const renderItem = (tokenId: string) => {
        return (
            <TokenBasic tokenId={tokenId} handleSelectToken={() => handleToggleFollowTokenById(tokenId)} showFollowed />
        );
    };
    return (
        <Styled>
            <Header title={addTokenTranslate.headerTitle} canSearch />
            <ListAllToken {...{ ...props, renderItem }} />
        </Styled>
    );
};

export default withAddToken(AddToken);
