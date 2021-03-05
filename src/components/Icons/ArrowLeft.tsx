import React from 'react';
import styled from 'styled-components';

interface IProps {}

const Styled = styled.button`
    width: 9px;
    height: 100%;
    margin-right: 15px;
`;

const ArrowLeftVector = React.memo((props: any) => {
    return (
        <svg width={9} height={16}>
            <path
                d="M7.912 15.283a.788.788 0 00.809-.8.826.826 0 00-.238-.57L2.085 7.653l6.398-6.258a.843.843 0 00.238-.57c0-.458-.352-.8-.809-.8a.782.782 0 00-.571.228L.37 7.074a.778.778 0 00-.246.58c0 .22.08.413.246.58l6.97 6.812c.15.158.343.237.571.237z"
                fill="#000"
                fillRule="nonzero"
                {...props}
            />
        </svg>
    );
});

const ArrowLeft = (props: IProps & React.ButtonHTMLAttributes<HTMLButtonElement>) => {
    return (
        <Styled {...props}>
            <ArrowLeftVector />
        </Styled>
    );
};

export default ArrowLeft;
