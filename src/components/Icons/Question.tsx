import React from 'react';
import styled from 'styled-components';

interface IProps {}

const Styled = styled.button`
    width: 18px;
    height: 18px;
`;

const QuestionVector = React.memo((props: any) => {
    return (
        <svg width={19} height={19}>
            <text
                transform="translate(-146 -85)"
                fill="#000"
                fillRule="evenodd"
                fontFamily="SFProDisplay-Regular, SF Pro Display"
                fontSize={18}
                {...props}
            >
                <tspan x={145} y={101}>
                    {'\uDBC0\uDC5D'}
                </tspan>
            </text>
        </svg>
    );
});

const Question = (props: IProps & React.ButtonHTMLAttributes<HTMLButtonElement>) => {
    return (
        <Styled className="icon" {...props}>
            <QuestionVector />
        </Styled>
    );
};

export default Question;
