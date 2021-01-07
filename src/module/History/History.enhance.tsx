import React, { HTMLAttributes } from 'react';
import ErrorBoundary from 'src/components/ErrorBoundary';
import { translateByFieldSelector } from 'src/module/Configs';
import QrCode from 'src/components/QrCode';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { IHistoryLanguage } from 'src/i18n';
import { serverSelector } from 'src/module/Preload';
import { IHistoryItem } from 'src/module/History/features/HistoryItem/HistoryItem.interface';
import { TxBridgeHistoryModel, TxCacheHistoryModel, TxHistoryItem, TxHistoryReceiveModel } from './History.interface';
import {
    getHistoryBridgeByIdSelector,
    getHistoryCacheByTxIdSelector,
    getHistoryReceiveByTxIdSelector,
} from './History.selector';
import { HISTORY_FORMAT_TYPE } from './History.constant';

interface IProps {}

interface TInner {
    historyLanguage: IHistoryLanguage;
    historyFactories: IHistoryItem[];
}

export interface IMergeProps extends IProps, TInner {}

const enhance = (WrappedComponent: React.FunctionComponent) => (props: IProps & HTMLAttributes<HTMLElement>) => {
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
                        retryShield: true,
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
                        copyData: history?.erc20TokenAddress,
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
        <ErrorBoundary>
            <WrappedComponent {...{ ...props, historyFactories, historyLanguage }} />
        </ErrorBoundary>
    );
};

export default enhance;
