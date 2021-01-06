import React from 'react';
import styled from 'styled-components';
import { FaCopy, FaQrcode } from 'react-icons/fa';
import copy from 'copy-to-clipboard';
import { COLORS, FONT_SIZES } from 'src/styles';
import { useDispatch } from 'react-redux';
import { actionToggleToast, QrCodeModal, TOAST_CONFIGS } from 'src/components';
import { actionToggleModal } from 'src/components/Modal';
import { CONSTANT_COLORS } from '../../../../constants';

export interface IProps {
    title: string | number;
    desc: string | number;
}

const Styled = styled.div`
    margin-bottom: 30px;
    &.selectable {
        cursor: pointer;
    }
    .hook p.title {
        font-size: ${FONT_SIZES.medium}px;
        line-height: ${FONT_SIZES.medium + 9}px;
        font-weight: 500;
    }
    p.decs {
        font-size: ${FONT_SIZES.regular}px;
        line-height: ${FONT_SIZES.regular + 9}px;
        font-weight: 100;
    }
    .hook {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        margin-top: 15px;
        padding: 10px;
        color: ${CONSTANT_COLORS.LIGHT_GREY};
        background-color: ${CONSTANT_COLORS.GREY};
    }
    .hook .icons {
        display: flex;
        flex-direction: row;
        align-items: center;
        svg {
            cursor: pointer;
        }
        svg:first-child {
            margin-right: 5px;
        }
    }
`;

const Detail = (props: IProps) => {
    const { title, desc } = props;
    const dispatch = useDispatch();
    const handleCopy = () => {
        copy(desc.toString());
        dispatch(
            actionToggleToast({
                toggle: true,
                value: 'Copied',
                type: TOAST_CONFIGS.success,
            }),
        );
    };
    const handleShowQrCode = () =>
        dispatch(
            actionToggleModal({
                data: <QrCodeModal value={desc.toString()} />,
                closeable: true,
                title: title.toString(),
            }),
        );
    return (
        <Styled className="account-item">
            <p className="title">{title}</p>
            <div className="hook">
                <p className="decs ellipsis">{desc}</p>
                <div className="icons">
                    <FaQrcode color={COLORS.colorGreyBold} onClick={handleShowQrCode} />
                    <FaCopy color={COLORS.colorGreyBold} onClick={handleCopy} />
                </div>
            </div>
        </Styled>
    );
};

export default React.memo(Detail);
