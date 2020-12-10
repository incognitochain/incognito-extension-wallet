import React from 'react';
import { useSelector } from 'react-redux';
import { Header } from 'src/components';
import { ILanguage } from 'src/i18n';
import { translateSelector } from 'src/routes/Configs';
import styled from 'styled-components';
import { ListAllToken } from 'src/routes/Token';
import { TokenBasic } from 'src/routes/Token';
import { IAllListTokenInner } from 'src/routes/Token';
import withAddToken, { TInner } from './AddToken.enhance';
const Styled = styled.div``;

const AddToken = (props: TInner & IAllListTokenInner & any) => {
  const translate: ILanguage = useSelector(translateSelector);
  const addTokenTranslate = translate.token.addToken;
  const { handleToggleFollowTokenById } = props;
  const renderItem = (tokenId: string) => {
    return (
      <TokenBasic
        tokenId={tokenId}
        handleSelectToken={() => handleToggleFollowTokenById(tokenId)}
        showFollowed
      />
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
