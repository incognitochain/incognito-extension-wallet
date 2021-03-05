import React from 'react';
import styled, { css } from 'styled-components';
import { COLORS, ITheme } from 'src/styles';

interface IProps {
    fast2x?: boolean;
    handleClick: () => any;
}

const Lightning = styled.button<{ selectFast: any }>`
    width: 56px;
    height: 30px;
    border-radius: 8px;
    margin-left: 5px;
    .one-light {
        .border {
            fill: ${COLORS.black1};
            stroke: ${COLORS.black1};
        }
        .icon {
            fill: ${COLORS.white};
        }
        ${(props) =>
            props.selectFast &&
            css`
                .border {
                    fill: ${(props: { theme: ITheme }) => props.theme.fastFeeButton};
                    stroke: ${(props: { theme: ITheme }) => props.theme.fastFeeBorderButton};
                }
                .icon {
                    fill: ${(props: { theme: ITheme }) => props.theme.fastFeeTextButton};
                }
            `}
    }
    .two-light {
        .border {
            fill: ${COLORS.black1};
            stroke: ${COLORS.black1};
        }
        .icon {
            fill: ${COLORS.white};
        }
        ${(props) =>
            !props.selectFast &&
            css`
                .border {
                    fill: ${(props: { theme: ITheme }) => props.theme.fastFeeButton};
                    stroke: ${(props: { theme: ITheme }) => props.theme.fastFeeBorderButton};
                }
                .icon {
                    fill: ${(props: { theme: ITheme }) => props.theme.fastFeeTextButton};
                }
            `}
    }
`;

const OneLightVector = React.memo((props: any) => {
    return (
        <svg className="one-light" width={56} height={30} {...props}>
            <g fill="none" fillRule="evenodd">
                <path
                    className="border"
                    d="M11.256 1h33.488c3.567 0 4.86.371 6.163 1.069a7.27 7.27 0 013.024 3.024C54.63 6.396 55 7.689 55 11.256v7.488c0 3.567-.371 4.86-1.069 6.163a7.27 7.27 0 01-3.024 3.024C49.604 28.63 48.311 29 44.744 29H11.256c-3.567 0-4.86-.371-6.163-1.069a7.27 7.27 0 01-3.024-3.024C1.37 23.604 1 22.311 1 18.744v-7.488c0-3.567.371-4.86 1.069-6.163a7.27 7.27 0 013.024-3.024C6.396 1.37 7.689 1 11.256 1z"
                    stroke="#CBCBCB"
                    strokeWidth={0.5}
                    fill="#F3F3F3"
                />
                <path
                    className="icon"
                    d="M26.154 22.365l6.214-7.765c.116-.144.178-.28.178-.438 0-.26-.205-.465-.492-.465H28.19L30.23 8.16c.266-.704-.465-1.08-.923-.499l-6.214 7.759c-.116.15-.178.287-.178.437 0 .267.205.465.492.465h3.863L25.23 21.86c-.266.704.465 1.08.923.506z"
                    fill="#8A8A8E"
                    fillRule="nonzero"
                />
            </g>
        </svg>
    );
});

const TwoLightVector = React.memo((props: any) => {
    return (
        <svg className="two-light" width={56} height={30} {...props}>
            <g fill="none" fillRule="evenodd">
                <path
                    className="border"
                    d="M11.256 1h33.488c3.567 0 4.86.371 6.163 1.069a7.27 7.27 0 013.024 3.024C54.63 6.396 55 7.689 55 11.256v7.488c0 3.567-.371 4.86-1.069 6.163a7.27 7.27 0 01-3.024 3.024C49.604 28.63 48.311 29 44.744 29H11.256c-3.567 0-4.86-.371-6.163-1.069a7.27 7.27 0 01-3.024-3.024C1.37 23.604 1 22.311 1 18.744v-7.488c0-3.567.371-4.86 1.069-6.163a7.27 7.27 0 013.024-3.024C6.396 1.37 7.689 1 11.256 1z"
                    stroke="#CBCBCB"
                    strokeWidth={0.5}
                    fill="#F3F3F3"
                />
                <path
                    className="icon"
                    d="M20.154 22.365l6.214-7.765c.116-.144.178-.28.178-.438 0-.26-.205-.465-.492-.465H22.19L24.23 8.16c.266-.704-.465-1.08-.923-.499l-6.214 7.759c-.116.15-.178.287-.178.437 0 .267.205.465.492.465h3.863L19.23 21.86c-.266.704.465 1.08.923.506zM32.034 22.365l6.214-7.765c.116-.144.178-.28.178-.438 0-.26-.205-.465-.492-.465H34.07L36.11 8.16c.266-.704-.465-1.08-.923-.499l-6.214 7.759c-.116.15-.178.287-.178.437 0 .267.205.465.492.465h3.863L31.11 21.86c-.266.704.465 1.08.923.506z"
                    fill="#8A8A8E"
                    fillRule="nonzero"
                />
            </g>
        </svg>
    );
});

const FastFee = (props: IProps & React.ButtonHTMLAttributes<HTMLButtonElement>) => {
    const { fast2x, handleClick } = props;
    const renderOneLight = () => {
        return (
            <Lightning
                selectFast={fast2x}
                onClick={() => {
                    fast2x && handleClick();
                }}
                type="button"
                {...props}
            >
                <OneLightVector />
            </Lightning>
        );
    };
    const renderTwoLight = () => {
        return (
            <Lightning
                selectFast={fast2x}
                onClick={() => {
                    !fast2x && handleClick();
                }}
                type="button"
                {...props}
            >
                <TwoLightVector />
            </Lightning>
        );
    };
    return (
        <div className="flex">
            {renderOneLight()}
            {renderTwoLight()}
        </div>
    );
};

export default FastFee;
