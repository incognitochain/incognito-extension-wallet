import React from 'react';
import { useSelector } from 'react-redux';
import { Header } from 'src/components';
import { ILanguage } from 'src/i18n';
import { translateSelector } from 'src/routes/Configs';
import styled from 'styled-components';
import withAddToken from './AddToken.enhance';
import { ListAllToken } from 'src/routes/Token';
import { ISelectedPrivacy } from '../../Token.interface';
import { TokenBasic } from 'src/routes/Token';

// interface IProps {}

const Styled = styled.div``;

const AddToken = (props: any) => {
  const translate: ILanguage = useSelector(translateSelector);
  const addTokenTranslate = translate.token.addToken;
  const renderItem = (token: ISelectedPrivacy) => {
    return <TokenBasic tokenId={token?.tokenId} />;
  };
  return (
    <Styled>
      <Header title={addTokenTranslate.headerTitle} canSearch />
      <ListAllToken {...{ ...props, renderItem }} />
    </Styled>
  );
};

export default withAddToken(AddToken);
