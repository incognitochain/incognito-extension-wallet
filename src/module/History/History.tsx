import React from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Header } from 'src/components';
import { IHistoryLanguage } from 'src/i18n';
import { serverSelector } from 'src/module/Preload';
import styled from 'styled-components';
import { translateByFieldSelector } from 'src/module/Configs';
import QrCode from 'src/components/QrCode';
import HistoryItem from './History.item';
import {
    IHistoryItem,
    TxBridgeHistoryModel,
    TxCacheHistoryModel,
    TxHistoryItem,
    TxHistoryReceiveModel,
} from './History.interface';
import {
    getHistoryBridgeByIdSelector,
    getHistoryCacheByTxIdSelector,
    getHistoryReceiveByTxIdSelector,
} from './History.selector';
import { HISTORY_FORMAT_TYPE } from './History.constant';

const Styled = styled.div`
    .confirm-tx-item .hook span.desc-amount {
        max-width: 190px;
    }
    .shield-address {
        margin-top: 50px;
        > p {
            text-align: center;
        }
        .qrcode-container {
            margin: 30px 0;
        }
    }
`;

const History = React.memo(() => {
    const { state }: any = useLocation();
    const { history: h }: { history: TxHistoryItem } = state;
    const historyLanguage: IHistoryLanguage = useSelector(translateByFieldSelector)('history');
    const server = useSelector(serverSelector);
    const getHistoryCacheByTxId = useSelector(getHistoryCacheByTxIdSelector);
    const getHistoryReceiveByTxId = useSelector(getHistoryReceiveByTxIdSelector);
    const getHistoryBridgeById = useSelector(getHistoryBridgeByIdSelector);
    if (!h) {
        return null;
    }
    const getHistoryFactories = () => {
        switch (h.formatType) {
            case HISTORY_FORMAT_TYPE.cache: {
                const history: TxCacheHistoryModel | undefined = getHistoryCacheByTxId(h.id);
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
                        descColor: history?.statusColor,
                    },
                    {
                        title: historyLanguage.time,
                        desc: history?.timeFormated,
                    },
                    {
                        title: historyLanguage.toAddress,
                        desc: history.paymentAddress,
                        copyData: history.paymentAddress,
                    },
                    {
                        title: historyLanguage.coin,
                        desc: history.symbol,
                    },
                ];
            }
            case HISTORY_FORMAT_TYPE.receive: {
                const history: TxHistoryReceiveModel | undefined = getHistoryReceiveByTxId(h.id);
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
                        descColor: history?.statusColor,
                    },
                    {
                        title: historyLanguage.time,
                        desc: history?.timeFormated,
                    },
                ];
            }
            case HISTORY_FORMAT_TYPE.bridge: {
                const history: TxBridgeHistoryModel | undefined = getHistoryBridgeById(h.id);
                if (!history) {
                    return [];
                }
                return [
                    {
                        title: historyLanguage.id,
                        desc: history?.id,
                        copyData: history?.id,
                    },
                    {
                        title: history.type,
                        desc: `${history.amountFormatedNoClip} ${history?.symbol || ''}`,
                        descClassName: 'desc-amount',
                        disabled: !history?.incognitoAmount,
                    },
                    {
                        title: historyLanguage.status,
                        desc: history?.statusMessage,
                        descColor: history?.statusColor,
                        message: history?.statusDetail,
                    },
                    {
                        title: historyLanguage.time,
                        desc: history?.timeFormated,
                    },
                    {
                        title: historyLanguage.expiredAt,
                        desc: history?.expiredAtFormated,
                    },
                    {
                        title: historyLanguage.inchainTxId,
                        desc: history?.inChainTx,
                        link: history?.inChainTx,
                    },
                    {
                        title: historyLanguage.outchainTxId,
                        desc: history?.outChainTx,
                        link: history?.outChainTx,
                    },
                    {
                        title: historyLanguage.toAddress,
                        desc: history?.userPaymentAddress,
                        copyData: history?.userPaymentAddress,
                    },
                    {
                        title: historyLanguage.coin,
                        desc: history?.symbol,
                    },
                    {
                        title: historyLanguage.memo,
                        desc: history?.memo,
                    },
                    {
                        title: historyLanguage.contract,
                        desc: history?.erc20TokenAddress,
                    },
                    {
                        customItem: (
                            <div className="shield-address">
                                <p className="fw-medium">{historyLanguage.shieldingAddress}</p>
                                <QrCode
                                    qrCodeProps={{
                                        size: 150,
                                        value: history?.address,
                                    }}
                                />
                            </div>
                        ),
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
            <div className="scroll-view">
                {historyFactories.map((item, index) => (
                    <HistoryItem key={item?.title || index} {...item} />
                ))}
            </div>
        </Styled>
    );
});

export default React.memo(History);
