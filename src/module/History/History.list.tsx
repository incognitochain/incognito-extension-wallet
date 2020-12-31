import React, { SyntheticEvent } from 'react';
import styled from 'styled-components';
import { Link, useHistory } from 'react-router-dom';
import withHistory, { IMergeProps } from './History.enhance';

import { TxHistoryItem } from './History.interface';

const Styled = styled.div`
    max-height: 250px;
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
    const { txId, type, amountFormated, timeFormated, statusMessage } = props;
    const history = useHistory();
    return (
        // eslint-disable-next-line jsx-a11y/anchor-is-valid
        <Link
            to="#"
            onClick={(e: SyntheticEvent) => {
                e.preventDefault();
                history.push(`/history/${txId}`, { history: props });
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

const History = React.memo((props: IMergeProps & any) => {
    const { histories, handleOnEndReached, renderFooter }: IMergeProps = props;
    const ref: React.RefObject<HTMLDivElement> = React.useRef(null);
    const handleScroll = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
        const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
        if (scrollTop + clientHeight === scrollHeight) {
            if (typeof handleOnEndReached === 'function') handleOnEndReached();
        }
    };
    return (
        <Styled ref={ref} onScroll={handleScroll}>
            {histories
                .sort((a, b) => b.lockTime - a.lockTime)
                .map((history: TxHistoryItem) => (
                    <HistoryItem key={history.txId} {...history} />
                ))}
            <div className={`footer ${!!renderFooter && 'flex has-child'}`}>{renderFooter && renderFooter}</div>
        </Styled>
    );
});

export default withHistory(History);
