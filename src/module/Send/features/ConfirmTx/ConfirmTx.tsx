import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { Header } from 'src/components';
import { withLayout } from 'src/components/Layout';
import {
  historyCacheByTxIdSelector,
  ICacheHistoryTokenSelector,
  IHistoryItem,
  HistoryItem,
} from 'src/module/History';
import { serverSelector } from 'src/module/Preload';
import { translateByFieldSelector } from 'src/module/Configs';
import { ISendLanguage } from 'src/i18n';

interface IProps {}

const Styled = styled.div`
  p.title {
    text-align: center;
    margin-bottom: 50px;
  }
`;

const ConfirmTx = (props: IProps) => {
  const { state }: { state: any } = useLocation();
  const { txId }: { txId: string } = state;
  const server = useSelector(serverSelector);
  const confirmLanguage: {
    headerTitle: string;
    txId: string;
    fee: string;
    time: string;
    toAddress: string;
    amount: string;
  } = useSelector(translateByFieldSelector)('send.confirm');
  const tx: ICacheHistoryTokenSelector | undefined = useSelector(
    historyCacheByTxIdSelector
  )(txId);
  if (!tx || !confirmLanguage) {
    return <Redirect to='/' />;
  }
  const itemsFactories: IHistoryItem[] = [
    {
      title: confirmLanguage.txId,
      desc: txId,
      copyData: tx.txId,
      link: `${server.exploreChainURL}/tx/${tx.txId}`,
    },
    {
      title: confirmLanguage.toAddress,
      desc: tx.paymentAddress,
      copyData: tx.paymentAddress,
    },
    {
      title: confirmLanguage.time,
      desc: tx.timeFormated,
    },
    {
      title: confirmLanguage.amount,
      desc: `${tx.amountFormated} ${tx.symbol}`,
    },
    {
      title: confirmLanguage.fee,
      desc: `${tx.feeFormated} ${tx.feeSymbol}`,
    },
  ];
  return (
    <Styled>
      <Header title={`Confirm Tx`} />
      <p className='title fw-bold fs-supermedium center-text'>
        Sent.
      </p>
      {itemsFactories.map((item: IHistoryItem) => (
        <HistoryItem key={item.title} {...item} />
      ))}
    </Styled>
  );
};

export default withLayout(React.memo(ConfirmTx));
