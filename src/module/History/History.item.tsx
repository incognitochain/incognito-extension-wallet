import React from 'react';
import copy from 'copy-to-clipboard';
import { actionToggleToast, TOAST_CONFIGS } from 'src/components';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { CopyIcon, OpenLinkIcon } from 'src/components/Icons';
import { IHistoryItem } from './History.interface';

const Styled = styled.div`
    .confirm-tx-item {
        display: flex;
        flex-direction: row;
        align-items: 'center';
        margin-bottom: 15px;
        justify-content: space-between;
    }
    .confirm-tx-item label {
        flex-basis: 30%;
    }
    .confirm-tx-item .hook {
        flex-basis: 65%;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .confirm-tx-item .hook span {
        max-width: 135px;
    }
`;

const HistoryItem = React.memo((props: IHistoryItem) => {
    const { title, desc, copyData = '', link = '' } = props;
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
    return (
        <Styled>
            <div className="confirm-tx-item">
                <p className="sub-text">{title}</p>
                <div className="hook">
                    <span className="ellipsis">{desc}</span>
                    {!!copyData && <CopyIcon onClick={handleCopy} />}
                    {!!link && <OpenLinkIcon onClick={handleOpenLink} />}
                </div>
            </div>
        </Styled>
    );
});

export default React.memo(HistoryItem);
