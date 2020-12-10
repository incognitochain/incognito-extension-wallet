import { TxHistoryModel } from 'incognito-js/build/web/browser';
import React from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Header } from 'src/components';
import { withLayout } from 'src/components/Layout';
import { serverSelector } from 'src/routes/Preload';
import styled from 'styled-components';
import { IHistory } from './History.interface';

interface IProps {}

interface IHistoryItem {
  label: string;
  desc: string;
  disabled?: boolean;
  copyable?: boolean;
  link?: string;
}

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

const HistoryItem = React.memo((props: { item: IHistoryItem }) => {
  const { item } = props;
  return (
    <div className='item'>
      <div className='hook-row'>
        <p className='bold-text'>{item.label}</p>
        <p className='medium-text ellipsis'>{item.desc}</p>
      </div>
    </div>
  );
});

const History = (props: IProps) => {
  const location: any = useLocation();
  const server = useSelector(serverSelector);
  const state: any = location.state;
  const { history }: { history: IHistory & TxHistoryModel } = state;
  const historyFactories: IHistoryItem[] = [
    {
      label: 'ID',
      desc: `#${history?.txId}`,
      disabled: !history?.txId,
      copyable: true,
      link: !!history?.isIncognitoTx
        ? `${server.exploreChainURL} /tx/${history?.txId}`
        : '',
    },
    {
      label: history.type,
      desc: `${history.amountFormated} ${history.symbol}`,
      disabled: !history.amountFormated,
    },
    {
      label: 'Fee',
      // desc: `${history?.feeFormated} ${feeUnit}`,
      desc: `${history?.feeFormated}`,
      disabled: !history?.feeFormated,
    },
    {
      label: 'Status',
      desc: history?.status,
      disabled: !history?.status,
      // canRetryExpiredDeposit: history?.canRetryExpiredDeposit,
      // handleRetryExpiredDeposit: onRetryExpiredDeposit,
      // message: history?.statusDetail,
      // handleRetryHistoryStatus: onRetryHistoryStatus,
      // showReload,
      // fetchingHistory,
    },
    {
      label: 'Time',
      desc: history?.timeFormated,
      disabled: !history?.timeFormated,
    },
    // {
    //   label: 'Expired at',
    //   desc: formatUtil.formatDateTime(history?.expiredAt),
    //   disabled: history?.decentralized ? true : !history?.expiredAt,
    // },
    // {
    //   label: 'TxID',
    //   desc: `${CONSTANT_CONFIGS.EXPLORER_CONSTANT_CHAIN_URL}/tx/${history.incognitoTxID}`,
    //   openUrl: true,
    //   disabled:
    //     history?.id === history?.incognitoTxID ||
    //     !history.incognitoTxID ||
    //     includes(history?.inchainTx, history.incognitoTxID) ||
    //     (!!history?.isUnshieldTx && selectedPrivacy?.isDecentralized),
    // },
    // {
    //   label: 'Inchain TxID',
    //   desc: history?.inchainTx,
    //   openUrl: true,
    //   disabled: !history?.inchainTx,
    // },
    // {
    //   label: 'Outchain TxID',
    //   desc: history?.outchainTx,
    //   openUrl: true,
    //   disabled: !history?.outchainTx,
    // },
    // {
    //   label: 'To address',
    //   desc: history?.toAddress,
    //   copyable: true,
    //   disabled: !history?.toAddress,
    // },
    {
      label: 'Coin',
      desc: history.symbol,
      disabled: !history?.symbol,
    },
    // {
    //   label: 'Contract',
    //   desc: history.erc20TokenAddress,
    //   copyable: true,
    //   disabled: !history?.erc20TokenAddress,
    // },
  ];
  return (
    <Styled>
      <Header />
      {historyFactories.map((item, index) => (
        <HistoryItem key={index} item={item} />
      ))}
    </Styled>
  );
};

export default withLayout(History);
