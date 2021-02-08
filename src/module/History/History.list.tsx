import React, { SyntheticEvent } from 'react';
import styled from 'styled-components';
import { Link, useHistory } from 'react-router-dom';
import ErrorBoundary from 'src/components/ErrorBoundary';
import { InfoIcon, LoadingIcon } from 'src/components';
import { useDispatch, useSelector } from 'react-redux';
import { translateByFieldSelector } from 'src/module/Configs';
import { actionRemoveTooltip, actionShowTooltip } from 'src/module/Tooltip';
import { ITokenLanguage } from 'src/i18n';
import { TxHistoryItem } from 'src/module/History';

const Styled = styled.div`
    max-height: 304px;
    overflow: scroll;
    .history-item {
        margin-bottom: 30px;
    }
    .histories-container .history-item {
        :last-child {
            margin-bottom: 50px;
        }
    }
    .history-item .hook {
        display: flex;
        justify-content: space-between;
        align-items: center;
        :first-child {
            margin-bottom: 10px;
        }
    }
    .footer {
        &.has-child {
            min-height: 25px;
            margin-bottom: 15px;
        }
    }
    .loading-icon {
        margin: auto;
    }
    .row {
        display: flex;
        flex-direction: row;
        align-items: center;
    }
`;

const infoId = 'HistoryItemInfo';
const HistoryItem = React.memo((props: TxHistoryItem) => {
    const { id, type, amountFormated, timeFormated, statusMessage } = props;
    const history = useHistory();
    const dispatch = useDispatch();
    const translate: ITokenLanguage = useSelector(translateByFieldSelector)('token');
    const infoIconRef: any = React.useRef({});
    const onShowTooltip = () => {
        dispatch(
            actionShowTooltip({
                id: infoId,
                text: translate.toolTip.txInfo,
                ref: infoIconRef ? infoIconRef.current : null,
                timeout: 0,
            }),
        );
    };
    const onRemoveTooltip = () => dispatch(actionRemoveTooltip(infoId));
    return (
        // eslint-disable-next-line jsx-a11y/anchor-is-valid
        <Link
            to="#"
            onClick={(e: SyntheticEvent) => {
                onRemoveTooltip();
                e.preventDefault();
                history.push(`/history/${id}`, { history: props });
            }}
            className="history-item"
        >
            <div className="hook">
                <p className="fw-medium fs-medium">{type}</p>
                <p className="fw-medium fs-medium">{amountFormated}</p>
            </div>
            <div className="hook">
                <p className="sub-text">{timeFormated}</p>
                <div className="row">
                    <p className="sub-text">{statusMessage}</p>
                    <InfoIcon ref={infoIconRef} onMouseOver={onShowTooltip} onMouseOut={onRemoveTooltip} />
                </div>
            </div>
        </Link>
    );
});

interface IProps {
    histories: TxHistoryItem[];
    handleOnEndReached?: () => any;
    renderFooter?: React.ReactElement | React.FunctionComponent | any;
    loading?: boolean;
}

interface TInner {}

interface IMergeProps extends IProps, TInner {}

const withHistoryList = (WrappedComponent: React.FunctionComponent) => (props: IMergeProps & any) => {
    const { loading }: IMergeProps = props;
    if (loading) {
        return <LoadingIcon center />;
    }
    return (
        <ErrorBoundary>
            <WrappedComponent {...props} />
        </ErrorBoundary>
    );
};

const History = React.memo((props: IMergeProps & any) => {
    const { histories, handleOnEndReached, renderFooter }: IMergeProps = props;
    const handleScroll = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
        const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
        if (scrollTop + clientHeight === scrollHeight) {
            if (typeof handleOnEndReached === 'function') handleOnEndReached();
        }
    };
    return (
        <Styled onScroll={handleScroll}>
            <div className="histories-container">
                {histories
                    .sort((a, b) => b.lockTime - a.lockTime)
                    .map((history: TxHistoryItem) => (
                        <HistoryItem key={history.id} {...history} />
                    ))}
            </div>
            <div className={`footer ${!!renderFooter && 'flex has-child'}`}>{renderFooter && renderFooter}</div>
        </Styled>
    );
});

export default withHistoryList(History);
