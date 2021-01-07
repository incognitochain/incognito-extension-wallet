import React from 'react';
import { ENVS } from 'src/configs';
import styled from 'styled-components';

const Styled = styled.button`
    &.wrapper {
        display: flex;
        flex-direction: row;
    }
    .icon-checkbox {
        width: 18px;
        height: 18px;
    }
    .label {
        margin-left: 5px;
        text-align: left;
    }
`;

interface ICheckBoxProps {
    checked: boolean;
    label: string;
    onHandleChecked: () => any;
}

const FillCheckBox = React.memo((props: ICheckBoxProps & any) => {
    const { checked, label, onHandleChecked } = props;
    return (
        <Styled className="wrapper" onClick={onHandleChecked}>
            <img
                src={`${ENVS.REACT_APP_DOMAIN_URL}/images/icons/${checked ? 'checked-black' : 'uncheck-gray'}.png`}
                alt=""
                className="icon-checkbox"
            />
            <p className="fs-regular fw-regular sub-text label">{label}</p>
        </Styled>
    );
});

export default FillCheckBox;
