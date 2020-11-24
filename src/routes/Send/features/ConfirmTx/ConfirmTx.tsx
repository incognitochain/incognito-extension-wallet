import React from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Header } from 'src/components';
import { withLayout } from 'src/components/Layout';
import {
  decimalSeparatorSelector,
  groupSeparatorSelector,
} from 'src/routes/Preload';
import { selectedPrivacySelector } from 'src/routes/Token';
import { COLORS, FONT_SIZES } from 'src/styles';
import format from 'src/utils/format';
import styled from 'styled-components';

interface IProps {}

const Styled = styled.div`
  p.title {
    font-size: ${FONT_SIZES.superMedium}px;
    line-height: ${FONT_SIZES.superMedium + 5}px;
    color: ${COLORS.black};
    font-weight: 500;
    text-align: center;
    margin-bottom: 50px;
  }
  .confirm-tx-item {
    display: flex;
    flex-direction: row;
    align-items: 'center';
    margin-bottom: 30px;
  }
  .confirm-tx-item label {
    font-size: ${FONT_SIZES.regular}px;
    line-height: ${FONT_SIZES.regular + 5}px;
    color: ${COLORS.black};
    font-weight: 200;
    flex-basis: 30%;
  }
  .confirm-tx-item span {
    font-size: ${FONT_SIZES.regular}px;
    line-height: ${FONT_SIZES.regular + 5}px;
    color: ${COLORS.colorGreyBold};
    font-weight: 200;
    flex-basis: 70%;
  }
`;

const ConfirmTxItem = React.memo((props: { title: string; desc: string }) => {
  const { title, desc } = props;
  return (
    <div className='confirm-tx-item'>
      <label htmlFor=''>{title}</label>
      <span className='ellipsis'>{desc}</span>
    </div>
  );
});
const ConfirmTx = (props: IProps) => {
  const location = useLocation();
  const state: {
    tx: any;
    isNativeToken: boolean;
  } & any = location.state;
  const { tx, isNativeToken } = state;
  const nativeTokenInfo = tx?.nativeTokenInfo;
  const groupSeparator = useSelector(decimalSeparatorSelector);
  const decimalSeparator = useSelector(decimalSeparatorSelector);
  const selectedPrivacy = useSelector(selectedPrivacySelector);
  return (
    <Styled>
      <Header title={`Confirm Tx`} />
      <p className='title'>Sent.</p>
      <ConfirmTxItem title={`TxID:`} desc={tx?.txId} />
      <ConfirmTxItem
        title={`Amount:`}
        desc={format.formatAmount({
          amount: nativeTokenInfo.amount,
          decimalSeparator,
          groupSeparator,
          decimals: selectedPrivacy.pDecimals,
          clipAmount: false,
          decimalDigits: false,
        })}
      />
      <ConfirmTxItem
        title={`Fee:`}
        desc={format.formatAmount({
          amount: nativeTokenInfo.fee,
          decimalSeparator,
          groupSeparator,
          decimals: selectedPrivacy.pDecimals,
          clipAmount: false,
          decimalDigits: false,
        })}
      />
    </Styled>
  );
};

export default withLayout(ConfirmTx);
