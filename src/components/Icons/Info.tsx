import React from 'react';
import styled from 'styled-components';
import { COLORS } from 'src/styles';

interface IProps {
    isGreyIcon?: boolean;
}

const Styled = styled.button<{ isGreyIcon?: boolean }>`
    width: 16px;
    height: 16px;
    svg {
        path {
            fill: ${(props) => props?.isGreyIcon && COLORS.colorGreyBold};
        }
    }
`;

const InfoVector = React.memo((props: any) => {
    return (
        <svg width={16} height={15}>
            <path
                d="M7.782 15.183c4.087 0 7.47-3.391 7.47-7.471 0-4.087-3.39-7.47-7.478-7.47-4.08 0-7.463 3.383-7.463 7.47 0 4.08 3.391 7.47 7.47 7.47zM7.708 5.039a.986.986 0 01-.988-.997.986.986 0 111.97 0 .98.98 0 01-.982.997zm1.817 6.84H6.456a.535.535 0 01-.557-.542c0-.293.242-.534.557-.534h.93V7.36h-.805a.533.533 0 01-.55-.542.54.54 0 01.55-.534H8c.389 0 .594.278.594.688v3.83h.93c.315 0 .557.242.557.535a.535.535 0 01-.557.542z"
                fill="#000"
                fillRule="nonzero"
                {...props}
            />
        </svg>
    );
});

const Info = React.forwardRef((props: IProps & React.ButtonHTMLAttributes<HTMLButtonElement>, ref: any) => {
    return (
        <Styled className="icon info-icon" ref={ref} {...props}>
            <InfoVector />
        </Styled>
    );
});

export default Info;
