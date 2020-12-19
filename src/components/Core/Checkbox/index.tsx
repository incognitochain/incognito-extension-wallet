import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { COLORS } from 'src/styles';

interface IProps {
    onHandleChecked: () => any;
    label: string;
    checked: boolean;
}

const Styled = styled.div`
    & {
        flex-direction: row;
        align-items: center;
        display: flex;
        margin: 15px 0;
        /* The container */
        .container {
            position: relative;
            height: 25px;
            width: 25px;
            cursor: pointer;
            margin-right: 25px;
            user-select: none;
        }
        .container input {
            position: absolute;
            opacity: 0;
            cursor: pointer;
            height: 0;
            width: 0;
        }
        .checkmark {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: ${COLORS.black};
        }
        .container input:checked ~ .checkmark {
            background-color: ${COLORS.black};
        }
        .checkmark:after {
            content: '';
            position: absolute;
            display: none;
        }
        .container input:checked ~ .checkmark:after {
            display: block;
        }
        .container .checkmark:after {
            left: 9px;
            top: 5px;
            width: 5px;
            height: 10px;
            border: solid ${COLORS.white};
            border-width: 0 3px 3px 0;
            -webkit-transform: rotate(45deg);
            -ms-transform: rotate(45deg);
            transform: rotate(45deg);
        }
    }
`;

const Checkbox = (props: IProps) => {
    const { onHandleChecked, label, checked } = props;
    return (
        <Styled>
            <div className="container" onClick={onHandleChecked}>
                <input type="checkbox" checked={checked} />
                <span className="checkmark" />
            </div>
            <p>{label}</p>
        </Styled>
    );
};

Checkbox.propTypes = {
    onHandleChecked: PropTypes.func,
};

export default Checkbox;
