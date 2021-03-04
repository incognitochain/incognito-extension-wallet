import React from 'react';
import styled from 'styled-components';
import { FONT_SIZES, ITheme, COLORS } from 'src/styles';
import { useDispatch } from 'react-redux';
import { CopyIcon, QrCodeIcon, QrCodeModal } from 'src/components';
import { actionToggleModal } from 'src/components/Modal';

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
        color: ${COLORS.colorGreyBold};
        background-color: ${(props: { theme: ITheme }) => props.theme.input};
        border-radius: 8px;
        border: 1px solid ${(props: { theme: ITheme }) => props.theme.inputBorder};
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
            <p className="title fs-medium fw-medium">{title}</p>
            <div className="hook">
                <p className="decs ellipsis">{desc}</p>
                <div className="icons">
                    <QrCodeIcon onClick={handleShowQrCode} />
                    <CopyIcon text={desc.toString()} />
                </div>
            </div>
        </Styled>
    );
};

export default React.memo(Detail);
