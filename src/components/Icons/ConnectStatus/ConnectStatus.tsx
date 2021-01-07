import React from 'react';
import styled from 'styled-components';
import { ENVS } from 'src/configs';
import enhance from './ConnectStatus.enhance';

const Styled = styled.button`
    .wrapper {
        cursor: pointer;
    }
    .icon {
        width: 21px;
        height: 21px;
    }
`;

interface IProps {
    onPressConnect: () => void;
}

const ConnectStatus = (props: IProps & any) => {
    const { onPressConnect } = props;
    return (
        <Styled onClick={onPressConnect}>
            <img src={`${ENVS.REACT_APP_DOMAIN_URL}/images/icons/connect.png`} alt="" className="icon" />
        </Styled>
    );
};

export default enhance(ConnectStatus);
