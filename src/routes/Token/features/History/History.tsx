import { TxHistoryModel } from 'incognito-js/build/web/browser';
import React from 'react';
import { useLocation } from 'react-router-dom';
import { IObject } from 'src/utils';
import styled from 'styled-components';
import { IHistory } from './History.interface';

interface IProps {}

const Styled = styled.div``;

const History = (props: IProps) => {
  const location: any = useLocation();
  const state: {
    history: IHistory & TxHistoryModel;
  } = location.state;
  const { history } = state;
  const historyFactories = [
    {
      label: 'ID',
      disabled: !history?.txId,
      //   copyable: true,
      //   openUrl: !!history?.isIncognitoTx,
      valueText: `#${history?.txId}`,
      //   handleOpenLink: () =>
      //     history?.isIncognitoTx
      //       ? linkingService.openUrl(
      //         `${CONSTANT_CONFIGS.EXPLORER_CONSTANT_CHAIN_URL}/tx/${history?.id}`,
      //       )
      //       : null,
    },
    {
      label: typeText,
      valueText: `${amountStr} ${history.symbol}`,
      disabled: !amount,
    },
    {
      label: 'Fee',
      valueText: `${formatFee} ${feeUnit}`,
      disabled: !fee,
    },
    {
      label: 'Status',
      valueText: statusMessage,
      valueTextStyle: { color: statusColor },
      disabled: !toggleHistoryDetail && !statusMessage,
      canRetryExpiredDeposit: history?.canRetryExpiredDeposit,
      handleRetryExpiredDeposit: onRetryExpiredDeposit,
      message: history?.statusDetail,
      handleRetryHistoryStatus: onRetryHistoryStatus,
      showReload,
      fetchingHistory,
    },
    {
      label: 'Time',
      valueText: formatUtil.formatDateTime(history?.time),
      disabled: !history?.time,
    },
    {
      label: 'Expired at',
      valueText: formatUtil.formatDateTime(history?.expiredAt),
      disabled: history?.decentralized ? true : !history?.expiredAt,
    },
    {
      label: 'TxID',
      valueText: `${CONSTANT_CONFIGS.EXPLORER_CONSTANT_CHAIN_URL}/tx/${history.incognitoTxID}`,
      openUrl: true,
      disabled:
        history?.id === history?.incognitoTxID ||
        !history.incognitoTxID ||
        includes(history?.inchainTx, history.incognitoTxID) ||
        (!!history?.isUnshieldTx && selectedPrivacy?.isDecentralized),
    },
    {
      label: 'Inchain TxID',
      valueText: history?.inchainTx,
      openUrl: true,
      disabled: !history?.inchainTx,
    },
    {
      label: 'Outchain TxID',
      valueText: history?.outchainTx,
      openUrl: true,
      disabled: !history?.outchainTx,
    },
    {
      label: 'To address',
      valueText: history?.toAddress,
      copyable: true,
      disabled: !history?.toAddress,
    },
    {
      label: 'Coin',
      valueText: history.symbol,
      disabled: !history?.symbol,
    },
    {
      label: 'Contract',
      valueText: history.erc20TokenAddress,
      copyable: true,
      disabled: !history?.erc20TokenAddress,
    },
  ];
  return <Styled></Styled>;
};

export default History;
