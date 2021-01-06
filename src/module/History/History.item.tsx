import React from 'react';
import copy from 'copy-to-clipboard';
import { actionToggleToast, TOAST_CONFIGS } from 'src/components';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { ArrowDownIcon, ArrowUpIcon, CopyIcon, OpenLinkIcon } from 'src/components/Icons';
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
    .toggle-message {
        cursor: pointer;
    }
    .toggle-message .icon {
        height: 10px;
    }
    .message {
        margin-bottom: 15px;
    }
`;

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
            <div className="confirm-tx-item">
                <p className={`sub-text title ${titleClassName}`}>{title}</p>
                <div
                    className={`hook ${toggleStatusMessage ? 'toggle-message' : ''}`}
                    onClick={() => setToggle(!toggle)}
                >
                    <span className={`ellipsis desc ${descClassName}`} style={{ color: descColor }}>
                        {desc}
                    </span>
                    {message && (toggle ? <ArrowDownIcon /> : <ArrowUpIcon />)}
                    {!!copyData && <CopyIcon onClick={handleCopy} />}
                    {!!link && <OpenLinkIcon onClick={handleOpenLink} />}
                </div>
            </div>
            {toggle && <p className="fs-small sub-text message">{message}</p>}
        </Styled>
    );
});

export default React.memo(HistoryItem);
