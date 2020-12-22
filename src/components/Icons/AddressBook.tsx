import React from 'react';
import { ENVS } from 'src/configs';
import styled from 'styled-components';

interface IProps {}

const Styled = styled.button`
    width: 16px;
    height: 18px;
`;

const AddressBook = (props: IProps & React.ButtonHTMLAttributes<HTMLButtonElement>) => {
    const { className = '' } = props;
    return (
        <Styled type="button" className={`icon ${className || ''}`} {...props}>
            <img src={`${ENVS.REACT_APP_DOMAIN_URL}/images/icons/address-book.png`} alt="" />
        </Styled>
    );
};

export default AddressBook;
