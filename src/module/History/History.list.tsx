import React, { SyntheticEvent } from 'react';
import styled from 'styled-components';
import { Link, useHistory } from 'react-router-dom';
import ErrorBoundary from 'src/components/ErrorBoundary';
import { LoadingIcon } from 'src/components';
import { TxHistoryItem } from './History.interface';

const Styled = styled.div`
    max-height: 304px;
    overflow: scroll;
    .history-item {
        margin-bottom: 30px;
        :last-child {
            margin-bottom: unset;
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
        }
    }
    .loading-icon {
        margin: auto;
    }
`;

const HistoryItem = React.memo((props: TxHistoryItem) => {
    const { id, type, amountFormated, timeFormated, statusMessage } = props;
    const history = useHistory();
    return (
        // eslint-disable-next-line jsx-a11y/anchor-is-valid
        <Link
            to="#"
            onClick={(e: SyntheticEvent) => {
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
                <p className="sub-text">{statusMessage}</p>
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
            {histories
                .sort((a, b) => b.lockTime - a.lockTime)
                .map((history: TxHistoryItem) => (
                    <HistoryItem key={history.id} {...history} />
                ))}
            <div className={`footer ${!!renderFooter && 'flex has-child'}`}>{renderFooter && renderFooter}</div>
        </Styled>
    );
});

export default withHistoryList(History);
