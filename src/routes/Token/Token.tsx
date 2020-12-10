import React from 'react';
import { useSelector } from 'react-redux';
import { ITokenChildProps, ISelectedPrivacy } from './Token.interface';
import { getPrivacyDataByTokenIDSelector } from './Token.selector';
import { FaRegCheckCircle } from 'react-icons/fa';
import { COLORS } from 'src/styles';
import {
  AmountStyled,
  BalanceStyled,
  NameStyled,
  TextStyled,
  TokenStyled as Styled,
} from './Token.styled';
import { ILanguage } from 'src/i18n';
import { translateSelector } from 'src/routes/Configs';
import withToken, { IMergePropsToken } from './Token.enhance';

export const Name = React.memo((props: ITokenChildProps) => {
  const { tokenId, classNameCustom } = props;
  const token: ISelectedPrivacy = useSelector(getPrivacyDataByTokenIDSelector)(
    tokenId
  );
  return (
    <NameStyled className={classNameCustom}>
      <TextStyled className='fontsize-medium fontweight-bold ellipsis'>
        {token.name}
      </TextStyled>
      {token?.isVerified && (
        <div className='verified-icon'>
          <FaRegCheckCircle color={COLORS.green} />
        </div>
      )}
    </NameStyled>
  );
});

export const Amount = React.memo((props: ITokenChildProps) => {
  const { tokenId, classNameCustom } = props;
  const token: ISelectedPrivacy = useSelector(getPrivacyDataByTokenIDSelector)(
    tokenId
  );
  return (
    <AmountStyled className={classNameCustom}>
      <TextStyled className='fontsize-medium fontweight-bold right-text ellipsis'>{`${
        token.formatAmount
      } ${token.symbol || token?.pSymbol}`}</TextStyled>
    </AmountStyled>
  );
});

export const Balance = React.memo((props: ITokenChildProps) => {
  const { tokenId, classNameCustom } = props;
  const token: ISelectedPrivacy = useSelector(getPrivacyDataByTokenIDSelector)(
    tokenId
  );
  return (
    <BalanceStyled className={classNameCustom}>
      <TextStyled className='fontsize-medium fontweight-medium right-text ellipsis'>
        {`$${token.formatBalanceByUsd}`}
      </TextStyled>
    </BalanceStyled>
  );
});

export const Price = React.memo((props: ITokenChildProps) => {
  const { tokenId, classNameCustom } = props;
  const token: ISelectedPrivacy = useSelector(getPrivacyDataByTokenIDSelector)(
    tokenId
  );
  return (
    <BalanceStyled className={classNameCustom}>
      <TextStyled className='fontsize-medium fontweight-medium  ellipsis'>{`$${token.formatPriceByUsd}`}</TextStyled>
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
      <TextStyled className='fontsize-medium fontweight-normal'>
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
    <TextStyled className='fontsize-medium fontweight-medium  ellipsis'>
      {token.symbol || token.pSymbol}
    </TextStyled>
  );
});

const Token = (props: IMergePropsToken) => {
  const { tokenId, handleOnClick } = props;
  return (
    <Styled to='#' onClick={handleOnClick}>
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
