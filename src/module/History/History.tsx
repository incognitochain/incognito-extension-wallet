import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Header } from 'src/components';
import { withLayout } from 'src/components/Layout';
import { IHistoryLanguage } from 'src/i18n';
import { serverSelector } from 'src/module/Preload';
import styled from 'styled-components';
import { HistoryItem } from '.';
import { translateByFieldSelector } from '../Configs';
import { ICacheHistoryTokenSelector, IHistoryItem } from './History.interface';
import { historyCacheByTxIdSelector } from './History.selector';

interface IProps {}

const Styled = styled.div`
  .hook-row {
    margin-top: 15px;
    > p {
      :first-child {
        flex: 1 0 20%;
      }
      :last-child {
        flex: 1 0 60%;
      }
    }
  }
`;

const History = (props: IProps) => {
  const params: any = useParams();
  const { txId }: { txId: string } = params;
  const historyLanguage: IHistoryLanguage = useSelector(
    translateByFieldSelector
  )('history');
  const server = useSelector(serverSelector);
  const history: ICacheHistoryTokenSelector | undefined = useSelector(
    historyCacheByTxIdSelector
  )(txId);
  if (!history) {
    return null;
  }
  const historyFactories: IHistoryItem[] = [
    {
      title: historyLanguage.id,
      desc: history?.txId,
      copyData: history?.txId,
      link: !!history?.isIncognitoTx
        ? `${server.exploreChainURL}/tx/${history?.txId}`
        : '',
    },
    {
      title: history.type,
      desc: `${history.amountFormated} ${history.symbol}`,
    },
    {
      title: historyLanguage.fee,
      desc: `${history?.feeFormated} ${history.feeSymbol}`,
    },
    {
      title: historyLanguage.status,
      desc: history?.statusMessage,
      // canRetryExpiredDeposit: history?.canRetryExpiredDeposit,
      // handleRetryExpiredDeposit: onRetryExpiredDeposit,
      // message: history?.statusDetail,
      // handleRetryHistoryStatus: onRetryHistoryStatus,
      // showReload,
      // fetchingHistory,
    },
    {
      title: historyLanguage.time,
      desc: history?.timeFormated,
    },
    // {
    //   title: 'Expired at',
    //   desc: formatUtil.formatDateTime(history?.expiredAt),

    // },
    // {
    //   title: 'TxID',
    //   desc: `${CONSTANT_CONFIGS.EXPLORER_CONSTANT_CHAIN_URL}/tx/${history.incognitoTxID}`,
    //   openUrl: true,

    //     history?.id === history?.incognitoTxID ||
    //     !history.incognitoTxID ||
    //     includes(history?.inchainTx, history.incognitoTxID) ||
    //     (!!history?.isUnshieldTx && selectedPrivacy?.isDecentralized),
    // },
    // {
    //   title: 'Inchain TxID',
    //   desc: history?.inchainTx,
    //   openUrl: true,

    // },
    // {
    //   title: 'Outchain TxID',
    //   desc: history?.outchainTx,
    //   openUrl: true,

    // },
    {
      title: historyLanguage.toAddress,
      desc: history.paymentAddress,
      copyData: history.paymentAddress,
    },
    {
      title: historyLanguage.coin,
      desc: history.symbol,
    },
    // {
    //   title: 'Contract',
    //   desc: history.erc20TokenAddress,

    // },
  ];
  return (
    <Styled>
      <Header title={historyLanguage.headerTitle} />
      {historyFactories.map((item, index) => (
        <HistoryItem key={index} {...item} />
      ))}
    </Styled>
  );
};

export default withLayout(History);
