import React from 'react';
import { useSelector } from 'react-redux';
import { IBalanceProps, INameProps, ISelectedPrivacy } from './Token.interface';
import { getPrivacyDataByTokenIDSelector } from './Token.selector';
import { FaRegCheckCircle } from 'react-icons/fa';
import { COLORS } from 'src/styles';
import { BalanceStyled, NameStyled, Styled, TextStyled } from './Token.styled';
import format from 'src/utils/format';
import { IPreloadReducer, preloadSelector } from 'src/routes/Preload';

export const Name = React.memo((props: INameProps) => {
  const { tokenId } = props;
  const token: ISelectedPrivacy = useSelector(getPrivacyDataByTokenIDSelector)(
    tokenId
  );

  return (
    <NameStyled>
      <TextStyled className='bold'>{token.name}</TextStyled>
      {token?.isVerified && <FaRegCheckCircle color={COLORS.green} />}
    </NameStyled>
  );
});

export const Balance = React.memo((props: IBalanceProps) => {
  const { tokenId } = props;
  const token: ISelectedPrivacy = useSelector(getPrivacyDataByTokenIDSelector)(
    tokenId
  );
  const preloadState: IPreloadReducer = useSelector(preloadSelector);
  const { decimalSeparator, groupSeparator } = preloadState;
  return (
    <BalanceStyled>
      <TextStyled>
        {format.amount({
          amount: token?.amount,
          decimals: token?.pDecimals,
          decimalSeparator,
          groupSeparator,
        })}
      </TextStyled>
    </BalanceStyled>
  );
});

const Token = (props: any) => {
  return <Styled className='container'></Styled>;
};

export default Token;
