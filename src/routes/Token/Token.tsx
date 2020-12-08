import React from 'react';
import { useSelector } from 'react-redux';
import { ITokenProps, ISelectedPrivacy } from './Token.interface';
import { getPrivacyDataByTokenIDSelector } from './Token.selector';
import { FaRegCheckCircle } from 'react-icons/fa';
import { COLORS } from 'src/styles';
import {
  AmountStyled,
  BalanceStyled,
  NameStyled,
  Styled,
  TextStyled,
} from './Token.styled';

export const Name = React.memo((props: ITokenProps) => {
  const { tokenId, classNameCustom } = props;
  const token: ISelectedPrivacy = useSelector(getPrivacyDataByTokenIDSelector)(
    tokenId
  );
  return (
    <NameStyled className={classNameCustom}>
      <TextStyled className='text ellipsis bold'>{token.name}</TextStyled>
      {token?.isVerified && (
        <div className='verified-icon'>
          <FaRegCheckCircle color={COLORS.green} />
        </div>
      )}
    </NameStyled>
  );
});

export const Amount = React.memo((props: ITokenProps) => {
  const { tokenId, classNameCustom } = props;
  const token: ISelectedPrivacy = useSelector(getPrivacyDataByTokenIDSelector)(
    tokenId
  );
  return (
    <AmountStyled className={classNameCustom}>
      <TextStyled className='text ellipsis bold'>{`${token.formatAmount} ${
        token.symbol || token?.pSymbol
      }`}</TextStyled>
    </AmountStyled>
  );
});

export const Balance = React.memo((props: ITokenProps) => {
  const { tokenId, classNameCustom } = props;
  const token: ISelectedPrivacy = useSelector(getPrivacyDataByTokenIDSelector)(
    tokenId
  );
  return (
    <BalanceStyled className={classNameCustom}>
      <TextStyled className='text ellipsis'>
        {`$${token.formatBalanceByUsd}`}
      </TextStyled>
    </BalanceStyled>
  );
});

export const Price = React.memo((props: ITokenProps) => {
  const { tokenId, classNameCustom } = props;
  const token: ISelectedPrivacy = useSelector(getPrivacyDataByTokenIDSelector)(
    tokenId
  );
  return (
    <BalanceStyled className={classNameCustom}>
      <TextStyled className='text ellipsis'>{`$${token.formatPriceByUsd}`}</TextStyled>
    </BalanceStyled>
  );
});

const Token = (props: any) => {
  return <Styled className='container'></Styled>;
};

export default Token;
