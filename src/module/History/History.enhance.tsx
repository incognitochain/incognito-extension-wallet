import React, { HTMLAttributes } from 'react';
import ErrorBoundary from 'src/components/ErrorBoundary';
import { translateByFieldSelector } from 'src/module/Configs';
import QrCode from 'src/components/QrCode';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { IHistoryLanguage } from 'src/i18n';
import { serverSelector } from 'src/module/Preload';
import { IHistoryItem } from 'src/module/History/features/HistoryItem/HistoryItem.interface';
import { actionToggleToast, Button, TOAST_CONFIGS } from 'src/components';
import {
    checkCachedHistoryById,
    getBridgeHistoryById,
    rpcClient,
    TxHistoryModelParam,
} from 'incognito-js/build/web/browser';
import { delay } from 'src/utils';
import { camelCaseKeys } from 'src/utils/object';
import { compose } from 'redux';
import withHeaderApp from 'src/components/Header/Header.enhanceApp';
import toString from 'lodash/toString';
import { signPublicKeyEncodeSelector } from 'src/module/Account/Account.selector';
import HistoryItem from './features/HistoryItem';
import {
    // actionRemoveShieldBridgeToken,
    actionRetryShieldBridgeToken,
} from './History.actions';
import { HISTORY_FORMAT_TYPE } from './History.constant';
import {
    getHistoryBridgeByIdSelector,
    getHistoryBridgeDetailSelector,
    getHistoryCacheDetailSelector,
    getHistoryReceiveByTxIdSelector,
} from './History.selector';
import { TxBridgeHistoryModel, TxHistoryItem, TxHistoryReceiveModel } from './History.interface';

interface IProps {}

interface TInner {
    historyLanguage: IHistoryLanguage;
    historyFactories: IHistoryItem[];
    handleRefreshHistory: () => any;
    refreshing: boolean;
    historyData: any;
}

export interface IMergeProps extends IProps, TInner {}

export interface IState {
    fetching: boolean;
    data: any;
    historyFactories: IHistoryItem[];
}

const ShieldSub = React.memo((props: { history: TxBridgeHistoryModel }) => {
    const { history } = props;
    // const [removingBridgeTx, setRemoveBridgeTx] = React.useState(false);
    const [retry, setRetry] = React.useState(false);
    const historyLanguage: IHistoryLanguage = useSelector(translateByFieldSelector)('history');
    const dispatch = useDispatch();
    const { goBack } = useHistory();
    if (!history) {
        return null;
    }
    // const handleRemoveTxHistory = async () => {
    //     try {
    //         if (removingBridgeTx) {
    //             return;
    //         }
    //         await setRemoveBridgeTx(true);
    //         const removed: any = await dispatch(actionRemoveShieldBridgeToken(history.id));
    //         if (removed) {
    //             goBack();
    //             dispatch(
    //                 actionToggleToast({
    //                     value: 'Canceled',
    //                     type: TOAST_CONFIGS.success,
    //                     toggle: true,
    //                 }),
    //             );
    //         }
    //     } catch (error) {
    //         dispatch(
    //             actionToggleToast({
    //                 value: error,
    //                 type: TOAST_CONFIGS.error,
    //                 toggle: true,
    //             }),
    //         );
    //     } finally {
    //         await setRemoveBridgeTx(false);
    //     }
    // };
    const handleRetryShield = async (history: TxBridgeHistoryModel) => {
        try {
            if (retry) {
                return;
            }
            await setRetry(true);
            await dispatch(actionRetryShieldBridgeToken(history.id));
            dispatch(
                actionToggleToast({
                    type: TOAST_CONFIGS.success,
                    value: history.isDecentralized
                        ? historyLanguage.retryDecentralizedMsg
                        : historyLanguage.retryCentralizedMsg,
                    toggle: true,
                }),
            );

            goBack();
        } catch (error) {
            dispatch(
                actionToggleToast({
                    type: TOAST_CONFIGS.error,
                    value: error,
                    toggle: true,
                }),
            );
        } finally {
            setRetry(false);
        }
    };
    if (history.canRetryExpiredShield) {
        return (
            <Button
                className="btn-sub-shield fs-small"
                disabled={retry}
                onClick={() => handleRetryShield(history)}
                title={`${historyLanguage.resume}${retry ? '...' : ''}`}
            />
        );
    }
    // if (history.canRemovePendingShield) {
    //     return (
    //         <Button
    //             className="btn-sub-shield fs-small"
    //             disabled={removingBridgeTx}
    //             onClick={handleRemoveTxHistory}
    //             title={`${historyLanguage.cancel}${removingBridgeTx ? '...' : ''}`}
    //         />
    //     );
    // }
    return null;
});

const enhance = (WrappedComponent: React.FunctionComponent) => (props: IProps & HTMLAttributes<HTMLElement>) => {
    const { state: stateLocation }: any = useLocation();
    const { id }: { id: string } = useParams();
    const { history: h }: { history: TxHistoryItem } = stateLocation;
    const historyLanguage: IHistoryLanguage = useSelector(translateByFieldSelector)('history');
    const server = useSelector(serverSelector);
    const dispatch = useDispatch();
    const getHistoryCacheDetail = useSelector(getHistoryCacheDetailSelector);
    const getHistoryReceiveByTxId = useSelector(getHistoryReceiveByTxIdSelector);
    const getHistoryBridgeDetail = useSelector(getHistoryBridgeDetailSelector);
    const getHistoryBridgeById = useSelector(getHistoryBridgeByIdSelector);
    const signPublicKey: string = useSelector(signPublicKeyEncodeSelector);
    const [fetching, setFetching] = React.useState(false);
    const [historyFactories, setHistoryFactories] = React.useState<any>([]);
    const [historyData, setHistoryData] = React.useState<any>({});
    if (!h) {
        return null;
    }

    const handleFetchHistory = async () => {
        try {
            if (!id || fetching) {
                return;
            }
            setFetching(true);
            await delay(50);
            let _historyData;
            switch (h.formatType) {
                case HISTORY_FORMAT_TYPE.cache:
                    {
                        const historyCache: TxHistoryModelParam = await checkCachedHistoryById(id);
                        const history = getHistoryCacheDetail(historyCache);
                        _historyData = history;
                        await setHistoryFactories([
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
                                title: historyLanguage.inchainFee,
                                desc: `${history?.feeFormated} ${history?.feeSymbol || ''}`,
                                descClassName: 'desc-amount',
                            },
                            {
                                title: historyLanguage.inchainStatus,
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
                            {
                                title: historyLanguage.memo,
                                desc: history.memo,
                                copyData: history?.memo,
                            },
                        ]);
                    }
                    break;
                case HISTORY_FORMAT_TYPE.receive: {
                    const history: TxHistoryReceiveModel | undefined = getHistoryReceiveByTxId(id);
                    if (!history) {
                        return [];
                    }
                    const historyReceive: any = await rpcClient.getTransactionByHash(id);
                    const memo = historyReceive?.Info;
                    _historyData = { ...history, memo };
                    await setHistoryFactories([
                        {
                            title: historyLanguage.inchainTxId,
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
                        {
                            title: historyLanguage.coin,
                            desc: history.symbol,
                        },
                        {
                            title: historyLanguage.memo,
                            desc: memo,
                            copyData: history?.memo,
                        },
                    ]);
                    break;
                }
                case HISTORY_FORMAT_TYPE.bridge: {
                    const historyBridge: TxBridgeHistoryModel | any = getHistoryBridgeById(id);
                    const historyData: any = await getBridgeHistoryById({
                        id: Number(id),
                        currencyType: historyBridge.currencyType,
                        decentralized: historyBridge.decentralized,
                        signPublicKey,
                    });
                    const history: TxBridgeHistoryModel | undefined = getHistoryBridgeDetail({
                        ...camelCaseKeys(historyData),
                        id: toString(id),
                    });
                    if (!history) {
                        return [];
                    }
                    _historyData = history;
                    if (history.isShieldTx) {
                        await setHistoryFactories([
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
                                customItem: (
                                    <HistoryItem
                                        title={historyLanguage.status}
                                        desc={history?.statusMessage}
                                        descColor={history?.statusColor}
                                        message={history?.statusDetail}
                                        sub={<ShieldSub history={history} />}
                                        hookClassName="shield-hook"
                                    />
                                ),
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
                        ]);
                    }
                    if (history.isUnShieldTx) {
                        await setHistoryFactories([
                            {
                                title: historyLanguage.id,
                                desc: history?.id,
                                copyData: history?.id,
                            },
                            {
                                title: history.type,
                                desc: `${history.amountFormatedNoClip} ${history?.symbol}`,
                                descClassName: 'desc-amount',
                                disabled: !history?.amountFormatedNoClip,
                            },
                            {
                                title: historyLanguage.status,
                                desc: history?.statusMessage,
                                descColor: history?.statusColor,
                                message: history?.statusDetail,
                                retryShield: true,
                            },
                            {
                                title: historyLanguage.inchainFee,
                                desc: `${history?.inchainFeeFormatedNoClip} ${history?.feeSymbol}`,
                                disabled: !history?.inchainFeeFormatedNoClip,
                            },
                            {
                                title: historyLanguage.outchainFee,
                                desc: `${history?.outchainFeeFormatedNoClip} ${history?.feeSymbol}`,
                                disabled: !history?.outchainFeeFormatedNoClip,
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
                                copyData: history?.memo,
                            },
                            {
                                title: historyLanguage.contract,
                                desc: history?.erc20TokenAddress,
                                copyData: history?.erc20TokenAddress,
                            },
                        ]);
                    }
                    break;
                }
                default:
                    break;
            }
            await setHistoryData(_historyData);
        } catch (error) {
            dispatch(
                actionToggleToast({
                    toggle: true,
                    value: error,
                    type: TOAST_CONFIGS.error,
                }),
            );
        } finally {
            await setFetching(false);
        }
    };
    React.useEffect(() => {
        handleFetchHistory();
    }, [id]);
    return (
        <ErrorBoundary>
            <WrappedComponent
                {...{
                    ...props,
                    historyFactories,
                    historyLanguage,
                    canRemovePendingShield: !!historyData?.canRemovePendingShield,
                    handleRefreshHistory: handleFetchHistory,
                    refreshing: fetching,
                    showReloadBalance: true,
                    handleRefresh: handleFetchHistory,
                    historyData,
                    rightHeaderAppMenu: false,
                    showConnectStatus: true,
                }}
            />
        </ErrorBoundary>
    );
};

export default compose(enhance, withHeaderApp);
