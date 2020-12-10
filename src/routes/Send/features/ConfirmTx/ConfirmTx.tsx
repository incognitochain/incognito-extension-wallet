import BigNumber from 'bignumber.js';
import { TxHistoryModel } from 'incognito-js/build/web/browser';
import React from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Header } from 'src/components';
import { withLayout } from 'src/components/Layout';
import { COINS } from 'src/constants';
import { decimalSeparatorSelector, serverSelector } from 'src/routes/Preload';
import { selectedPrivacySelector } from 'src/routes/Token';
import { FONT_SIZES } from 'src/styles';
import format, { formatUnixDateTime } from 'src/utils/format';
import styled from 'styled-components';

interface IProps {}

const Styled = styled.div`
  p.title {
    font-size: ${FONT_SIZES.superMedium}px;
    line-height: ${FONT_SIZES.superMedium + 5}px;
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

    font-weight: 200;
    flex-basis: 30%;
  }
  .confirm-tx-item span {
    font-size: ${FONT_SIZES.regular}px;
    line-height: ${FONT_SIZES.regular + 5}px;

    font-weight: 200;
    flex-basis: 70%;
  }
`;
interface IFactoriesItem {
  title: string;
  desc: string;
}

const ConfirmTxItem = React.memo((props: IFactoriesItem) => {
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
  const state: any = location.state;
  const { tx }: { tx: TxHistoryModel } = state;
  const groupSeparator = useSelector(decimalSeparatorSelector);
  const decimalSeparator = useSelector(decimalSeparatorSelector);
  const selectedPrivacy = useSelector(selectedPrivacySelector);
  const server = useSelector(serverSelector);
  const itemsFactories: IFactoriesItem[] = [
    {
      title: `TxID:`,
      desc: tx.txId,
    },
    {
      title: `Time:`,
      desc: formatUnixDateTime(tx.lockTime),
    },
    {
      title: `Amount:`,
      desc: `${format.formatAmount({
        originalAmount: new BigNumber(tx.amount).toNumber(),
        decimalSeparator,
        groupSeparator,
        decimals: selectedPrivacy.pDecimals,
        clipAmount: false,
        decimalDigits: false,
      })} ${selectedPrivacy.symbol}`,
    },
    {
      title: `Fee:`,
      desc: `${format.formatAmount({
        originalAmount: new BigNumber(tx.fee).toNumber(),
        decimalSeparator,
        groupSeparator,
        decimals: selectedPrivacy.pDecimals,
        clipAmount: false,
        decimalDigits: false,
      })} ${tx.useNativeFee ? COINS.PRV.symbol : selectedPrivacy.symbol}`,
    },
    {
      title: `TxID`,
      desc: `${server.exploreChainURL}/tx/${tx.txId}`,
    },
  ];
  return (
    <Styled>
      <Header title={`Confirm Tx`} />
      <p className='title'>Sent.</p>
      {itemsFactories.map((item: IFactoriesItem) => (
        <ConfirmTxItem key={item.title} title={item.title} desc={item.desc} />
      ))}
    </Styled>
  );
};

export default withLayout(ConfirmTx);
