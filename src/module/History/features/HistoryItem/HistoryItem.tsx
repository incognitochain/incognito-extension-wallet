import React from 'react';
import copy from 'copy-to-clipboard';
import { actionToggleToast, Button, TOAST_CONFIGS } from 'src/components';
import { useDispatch, useSelector } from 'react-redux';
import { ArrowDownIcon, ArrowUpIcon, CopyIcon, OpenLinkIcon } from 'src/components/Icons';
import { IHistoryLanguage } from 'src/i18n';
import { translateByFieldSelector } from 'src/module/Configs';
import { TxBridgeHistoryModel } from 'src/module/History';
import { useHistory, useParams } from 'react-router-dom';
import { getHistoryBridgeByIdSelector } from 'src/module/History/History.selector';
import { actionRetryShieldBridgeToken } from 'src/module/History/History.actions';
import { IHistoryItem } from './HistoryItem.interface';
import { Styled } from './HistoryItem.styled';

const RetryShield = React.memo(() => {
    const historyLanguage: IHistoryLanguage = useSelector(translateByFieldSelector)('history');
    const params: any = useParams();
    const dispatch = useDispatch();
    const useHistoryHooks = useHistory();
    const { id } = params;
    const history: TxBridgeHistoryModel | undefined = useSelector(getHistoryBridgeByIdSelector)(id);
    const [retry, setRetry] = React.useState(false);
    if (!history || !history.canRetryExpiredShield) {
        return null;
    }
    const handleRetryShield = async () => {
        try {
            if (retry) {
                return;
            }
            await setRetry(true);
            await dispatch(actionRetryShieldBridgeToken(id));
            useHistoryHooks.goBack();
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
    return (
        <Button
            className="btn-retry-shield fs-small"
            disabled={retry}
            onClick={handleRetryShield}
            title={`${historyLanguage.resume}${retry ? '...' : ''}`}
        />
    );
});

const HistoryItem = React.memo((props: IHistoryItem) => {
    const {
        customItem,
        title,
        desc,
        copyData = '',
        link = '',
        descClassName = '',
        titleClassName = '',
        descColor = '',
        disabled = false,
        message = '',
        hook,
        retryShield,
    } = props;
    const toggleStatusMessage = !!message;
    const [toggle, setToggle] = React.useState(false);
    const dispatch = useDispatch();
    const handleCopy = () => {
        copy(copyData);
        dispatch(
            actionToggleToast({
                toggle: true,
                value: 'Copied',
                type: TOAST_CONFIGS.success,
            }),
        );
    };
    const handleOpenLink = () => window.open(link);
    if (disabled) {
        return null;
    }
    if (customItem) {
        return customItem;
    }
    if (!desc) {
        return null;
    }
    return (
        <Styled>
            <div className="history-tx-item">
                <p className={`sub-text title ${titleClassName}`}>{title}</p>
                <div className={`hook  ${retryShield ? 'shield-hook' : ''}`}>
                    <span className={`ellipsis desc ${descClassName}`} style={{ color: descColor }}>
                        {desc}
                    </span>
                    {retryShield && <RetryShield />}
                    {!!hook && hook}
                    {message && (
                        <div
                            className={`${toggleStatusMessage ? 'toggle-message' : ''} arrow-icon center-abs-ver`}
                            onClick={() => setToggle(!toggle)}
                        >
                            {toggle ? <ArrowDownIcon /> : <ArrowUpIcon />}
                        </div>
                    )}
                    {!!copyData && <CopyIcon onClick={handleCopy} />}
                    {!!link && <OpenLinkIcon onClick={handleOpenLink} />}
                </div>
            </div>
            {toggle && <p className="fs-small sub-text message">{message}</p>}
        </Styled>
    );
});

export default React.memo(HistoryItem);
