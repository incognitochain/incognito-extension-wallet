import React from 'react';
import { useSelector } from 'react-redux';
import { Header } from 'src/components';
import { ILanguage } from 'src/i18n';
import { translateSelector } from 'src/routes/Configs';
import styled from 'styled-components';

interface IProps {}

const Styled = styled.div``;

const FollowToken = (props: IProps) => {
  const translate: ILanguage = useSelector(translateSelector);
  const followToken = translate.token.followToken;
  return (
    <Styled>
      <Header title={followToken.headerTitle} canSearch />
    </Styled>
  );
};

export default FollowToken;
