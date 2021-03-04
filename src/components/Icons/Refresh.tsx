import React from 'react';
import styled from 'styled-components';

interface IProps {}

const Styled = styled.button`
    width: 19px;
    height: 23px;
`;

const RefreshVector = React.memo((props: any) => {
    return (
        <svg width={18} height={22}>
            <text
                transform="translate(-70 -30)"
                fill="#000"
                // fillRule="evenodd"
                fontFamily="SFProDisplay-Regular, SF Pro Display"
                fontSize={20}
                {...props}
            >
                <tspan x={69} y={49}>
                    {'\uDBC0\uDD48'}
                </tspan>
            </text>
        </svg>
    );
});

const Refresh = React.forwardRef((props: IProps & React.ButtonHTMLAttributes<HTMLButtonElement>, ref: any) => {
    return (
        <Styled ref={ref} className="icon" {...props}>
            <RefreshVector />
        </Styled>
    );
});

export default Refresh;
