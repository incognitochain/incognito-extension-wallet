import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { MdError, MdWarning, MdInfo, MdClose } from 'react-icons/md';
import { COLORS, FONT_SIZES } from 'src/styles';
import { toastSelector } from './Toast.selector';
import { TOAST_CONFIGS, TOAST_CONFIGS_CLASSNAME } from './Toast.reducer';
import { actionToggleToast } from './Toast.actions';

const Styled = styled.div`
    position: absolute;
    right: 15px;
    left: 15px;
    top: 10px;
    visibility: hidden;
    padding: 15px;
    z-index: 1;
    display: flex;
    flex-direction: row;
    align-items: center;
    border-radius: 10px;
    &.show {
        visibility: visible;
        animation: fadeInDown 0.5s, fadeOutUp 0.5s 2.5s;
        background-color: ${COLORS.colorGreyLight};
    }
    &.success {
        color: ${COLORS.green};
    }
    &.error {
        color: ${COLORS.red};
    }
    &.warning {
        color: ${COLORS.orange};
    }
    > p.desc {
        font-size: ${FONT_SIZES.small}px;
        line-height: ${FONT_SIZES.small + 3}px;
        font-weight: 200;
        margin-left: 10px;
    }
    .close-icon {
        position: absolute;
        top: 5px;
        right: 5px;
        cursor: pointer;
    }
`;

const Toast = () => {
    const dispatch = useDispatch();
    const { value, type, toggle } = useSelector(toastSelector);
    const className = `${TOAST_CONFIGS_CLASSNAME[String(type)]} ${toggle ? 'show' : ''}`;
    const getIcons = () => {
        switch (type) {
            case TOAST_CONFIGS.error:
                return <MdError size={16} />;
            case TOAST_CONFIGS.success:
                return <MdInfo size={16} />;
            case TOAST_CONFIGS.warning:
                return <MdWarning size={16} />;
            default:
                return <MdInfo size={16} />;
        }
    };
    const handleCloseToast = () => dispatch(actionToggleToast({ toggle: false }));

    React.useEffect(() => {
        if (toggle) {
            setTimeout(() => {
                handleCloseToast();
            }, 3000);
        }
    }, [toggle]);
    return (
        <Styled className={className}>
            {getIcons()}
            <p className="desc">{value}</p>
            <MdClose onClick={handleCloseToast} size={18} className="close-icon" />
        </Styled>
    );
};

export default Toast;
