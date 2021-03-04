import React from 'react';
import styled from 'styled-components';

interface IProps {}

const Styled = styled.button`
    width: 16px;
    height: 18px;
`;

const AddressBookVector = React.memo((props: any) => {
    return (
        <svg width={16} height={18}>
            <text
                transform="translate(-262 -227)"
                fill="#FFF"
                fillRule="evenodd"
                fontFamily="SFProDisplay-Medium, SF Pro Display"
                fontSize={18}
                fontWeight={400}
                {...props}
            >
                <tspan x={260} y={242}>
                    {'\uDBC0\uDE69'}
                </tspan>
            </text>
        </svg>
    );
});

const AddressBook = (props: IProps & React.ButtonHTMLAttributes<HTMLButtonElement>) => {
    const { className = '' } = props;
    return (
        <Styled type="button" className={`icon ${className || ''}`} {...props}>
            <AddressBookVector />
        </Styled>
    );
};

export default AddressBook;
