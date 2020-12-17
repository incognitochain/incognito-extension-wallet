import React from 'react';
import { useSelector } from 'react-redux';
import Spinner from 'react-bootstrap/esm/Spinner';
import { ITokenChildProps, ISelectedPrivacy } from './Token.interface';
import { getPrivacyDataByTokenIDSelector } from './Token.selector';
import {
  AmountStyled,
  BalanceStyled,
  NameStyled,
  TextStyled,
  TokenStyled as Styled,
} from './Token.styled';
import { ILanguage } from 'src/i18n';
import { translateSelector } from 'src/module/Configs';
import withToken, { IMergePropsToken } from './Token.enhance';
import { VerifiedIcon } from 'src/components/Icons';
import { replace, round } from 'lodash';
import { COLORS } from 'src/styles';
import { isGettingBalanceByTokenIdSelector } from 'src/redux';

export const Name = React.memo((props: ITokenChildProps) => {
  const { tokenId, classNameCustom, classNameTextCustom } = props;
  const token: ISelectedPrivacy = useSelector(getPrivacyDataByTokenIDSelector)(
    tokenId
  );
  return (
    <NameStyled className={classNameCustom}>
      <TextStyled className={`fw-medium  ellipsis ${classNameTextCustom}`}>
        {token.name}
      </TextStyled>
      {token?.isVerified && <VerifiedIcon />}
    </NameStyled>
  );
});

export const Amount = React.memo((props: ITokenChildProps) => {
  const { tokenId, classNameCustom, classNameTextCustom } = props;
  const token: ISelectedPrivacy = useSelector(getPrivacyDataByTokenIDSelector)(
    tokenId
  );
  const loadingBalance = useSelector(isGettingBalanceByTokenIdSelector)(
    token.tokenId
  );
  if (loadingBalance) {
    return <Spinner animation='border' size='sm' />;
  }
  return (
    <AmountStyled className={classNameCustom}>
      <TextStyled
        className={`fw-medium right-text ellipsis ${classNameTextCustom}`}
      >{`${token.formatAmount} ${token.symbol || token?.pSymbol}`}</TextStyled>
    </AmountStyled>
  );
});

export const Balance = React.memo((props: ITokenChildProps) => {
  const { tokenId, classNameCustom, classNameTextCustom } = props;
  const token: ISelectedPrivacy = useSelector(getPrivacyDataByTokenIDSelector)(
    tokenId
  );
  return (
    <BalanceStyled className={classNameCustom}>
      <TextStyled
        className={`sub-text right-text ellipsis ${classNameTextCustom}`}
      >
        {`$${token.formatBalanceByUsd}`}
      </TextStyled>
    </BalanceStyled>
  );
});

export const PerChange = React.memo((props: ITokenChildProps) => {
  const { tokenId, classNameCustom } = props;
  const token: ISelectedPrivacy = useSelector(getPrivacyDataByTokenIDSelector)(
    tokenId
  );
  const { change } = token;
  const isTokenDecrease = change[0] === '-';
  const changeToNumber = Number(replace(change, '-', ''));
  if (changeToNumber === 0) {
    return null;
  }
  const tokenChange = `${isTokenDecrease ? '-' : '+'}${round(
    changeToNumber,
    2
  )}%`;
  return (
    <TextStyled
      className={`per-change ${classNameCustom}`}
      style={{
        color: isTokenDecrease ? COLORS.red : COLORS.green,
      }}
    >
      {tokenChange}
    </TextStyled>
  );
});

export const Price = React.memo((props: ITokenChildProps) => {
  const { tokenId, classNameCustom } = props;
  const token: ISelectedPrivacy = useSelector(getPrivacyDataByTokenIDSelector)(
    tokenId
  );
  return (
    <BalanceStyled className={classNameCustom}>
      <TextStyled className='sub-text ellipsis price'>
        {`$${token.formatPriceByUsd}`}
        <PerChange tokenId={tokenId} />
      </TextStyled>
    </BalanceStyled>
  );
});

export const Followed = React.memo((props: ITokenChildProps) => {
  const { tokenId } = props;
  const token: ISelectedPrivacy = useSelector(getPrivacyDataByTokenIDSelector)(
    tokenId
  );
  const translate: ILanguage = useSelector(translateSelector);
  const addTokenTs = translate.token.addToken;
  if (token.isFollowed) {
    return (
      <TextStyled className='fs-medium fw-normal'>
        {addTokenTs.added}
      </TextStyled>
    );
  }
  return null;
});

export const Symbol = React.memo((props: ITokenChildProps) => {
  const { tokenId } = props;
  const token: ISelectedPrivacy = useSelector(getPrivacyDataByTokenIDSelector)(
    tokenId
  );
  return (
    <TextStyled className='sub-text ellipsis'>
      {token.symbol || token.pSymbol}
    </TextStyled>
  );
});

const Token = (props: IMergePropsToken) => {
  const { tokenId, handleOnClick } = props;
  return (
    <Styled to='#' className='token-container' onClick={handleOnClick}>
      <div className='extra'>
        <Name classNameCustom={'extra-item'} tokenId={tokenId} />
        <Amount classNameCustom={'extra-item'} tokenId={tokenId} />
      </div>
      <div className='extra extra-bottom'>
        <Price tokenId={tokenId} classNameCustom={'extra-item'} />
        <Balance tokenId={tokenId} classNameCustom={'extra-item'} />
      </div>
    </Styled>
  );
};

export default withToken(Token);
