import React from 'react';
import styled from 'styled-components';

interface IProps {}

const Styled = styled.button`
    width: 19px;
    height: 19px;
`;

const AddCircleVector = React.memo((props: any) => {
    return (
        <svg width={19} height={19}>
            <text
                transform="translate(-243 -1)"
                fill="#FFF"
                fillRule="evenodd"
                fontFamily="SFProDisplay-Regular, SF Pro Display"
                fontSize={18}
                {...props}
            >
                <tspan x={242} y={17}>
                    {'\uDBC0\uDC4D'}
                </tspan>
            </text>
        </svg>
    );
});

const AddCircle = (props: IProps & React.ButtonHTMLAttributes<HTMLButtonElement>) => {
    return (
        <Styled className="icon" {...props}>
            <AddCircleVector />
        </Styled>
    );
};

export default AddCircle;
