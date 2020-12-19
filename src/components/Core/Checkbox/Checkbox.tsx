import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { ENVS } from 'src/configs';

interface IProps {
    onHandleChecked: () => any;
    label: string;
    checked: boolean;
}

const Styled = styled.button`
    .icon {
        margin-right: 5px;
        width: 18px;
        height: 18px;
    }
`;

const Checkbox = (props: IProps & React.ButtonHTMLAttributes<HTMLButtonElement>) => {
    const { onHandleChecked, label, checked } = props;
    return (
        <Styled className="checkbox flex" onClick={onHandleChecked}>
            <div className="icon">
                <img
                    src={`${ENVS.REACT_APP_DOMAIN_URL}/images/icons/${!checked ? 'checkbox' : 'checked-box'}.png`}
                    alt=""
                    className="icon-abs"
                />
            </div>
            {label && <p className="fw-medium">{label}</p>}
        </Styled>
    );
};

Checkbox.propTypes = {
    onHandleChecked: PropTypes.func,
};

export default Checkbox;
