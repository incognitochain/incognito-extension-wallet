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
    /* The checkbox-container */
    .checkbox-container {
      position: relative;
      height: 25px;
      width: 25px;
      cursor: pointer;
      margin-right: 15px;
      user-select: none;
    }
    .checkbox-container input {
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
    .checkbox-container input:checked ~ .checkmark {
      background-color: ${COLORS.black};
    }
    .checkmark:after {
      content: '';
      position: absolute;
      display: none;
    }
    .checkbox-container input:checked ~ .checkmark:after {
      display: block;
    }
    .checkbox-container .checkmark:after {
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
      <div className='checkbox-container' onClick={onHandleChecked}>
        <input type='checkbox' checked={checked} />
        <span className='checkmark'></span>
      </div>
      {label && <label>{label}</label>}
    </Styled>
  );
};

Checkbox.propTypes = {
  onHandleChecked: PropTypes.func,
};

export default Checkbox;
