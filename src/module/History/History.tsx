import React from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Header } from 'src/components';
import { IHistoryLanguage } from 'src/i18n';
import { serverSelector } from 'src/module/Preload';
import styled from 'styled-components';
import { translateByFieldSelector } from 'src/module/Configs';
import HistoryItem from './History.item';
import { IHistoryItem, TxCacheHistoryModel, TxHistoryItem, TxHistoryReceiveModel } from './History.interface';
import { getHistoryCacheByTxIdSelector, getHistoryReceiveByTxIdSelector } from './History.selector';
import { HISTORY_FORMAT_TYPE } from './History.constant';

const Styled = styled.div`
    .confirm-tx-item .hook span.desc-amount {
        max-width: 190px;
    }
`;

const History = React.memo(() => {
    const { state }: any = useLocation();
    const { history: h }: { history: TxHistoryItem } = state;
    const historyLanguage: IHistoryLanguage = useSelector(translateByFieldSelector)('history');
    const server = useSelector(serverSelector);
    const getHistoryCacheByTxId = useSelector(getHistoryCacheByTxIdSelector);
    const getHistoryReceiveByTxId = useSelector(getHistoryReceiveByTxIdSelector);
    if (!h) {
        return null;
    }
    const getHistoryFactories = () => {
        switch (h.formatType) {
            case HISTORY_FORMAT_TYPE.cache: {
                const history: TxCacheHistoryModel | undefined = getHistoryCacheByTxId(h.txId);
                if (!history) {
                    return [];
                }
                return [
                    {
                        title: historyLanguage.id,
                        desc: history?.txId,
                        copyData: history?.txId,
                        link: history?.isIncognitoTx ? `${server.exploreChainURL}/tx/${history?.txId}` : '',
                    },
                    {
                        title: history.type,
                        desc: `${history.amountFormatedNoClip} ${history?.symbol || ''}`,
                        descClassName: 'desc-amount',
                    },
                    {
                        title: historyLanguage.fee,
                        desc: `${history?.feeFormated} ${history?.feeSymbol || ''}`,
                        descClassName: 'desc-amount',
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
            }
            case HISTORY_FORMAT_TYPE.receive: {
                const history: TxHistoryReceiveModel | undefined = getHistoryReceiveByTxId(h.txId);
                if (!history) {
                    return [];
                }
                return [
                    {
                        title: historyLanguage.id,
                        desc: history?.txId,
                        copyData: history?.txId,
                        link: history?.txId ? `${server.exploreChainURL}/tx/${history?.txId}` : '',
                    },
                    {
                        title: history.type,
                        desc: `${history.amountFormatedNoClip} ${history?.symbol || ''}`,
                        descClassName: 'desc-amount',
                    },
                    {
                        title: historyLanguage.status,
                        desc: history?.statusMessage,
                    },
                    {
                        title: historyLanguage.time,
                        desc: history?.timeFormated,
                    },
                ];
            }
            default:
                break;
        }
        return [];
    };
    const historyFactories: IHistoryItem[] = getHistoryFactories();
    return (
        <Styled>
            <Header title={historyLanguage.headerTitle} />
            {historyFactories.map((item) => (
                <HistoryItem key={item.title} {...item} />
            ))}
        </Styled>
    );
});

export default React.memo(History);
