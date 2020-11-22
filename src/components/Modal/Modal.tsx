import React from 'react';
import { useSelector } from 'react-redux';
import { COLORS } from 'src/styles';
import styled from 'styled-components';
import { modalSelector } from './Modal.selector';

interface IProps {}

const Styled = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 10000;
  display: flex;
  justify-content: center;
  .modal-content {
    position: absolute;
    width: 100%;
    min-width: 320px;
    max-width: 375px;
    height: 100%;
    max-height: 600px;
    background-color: ${COLORS.overlayBlackLight};
  }
`;

const Modal = (props: IProps) => {
  const modalState = useSelector(modalSelector);
  const { data, visible } = modalState;
  if (!visible) {
    return null;
  }
  return (
    <Styled className='modal'>
      <div className='modal-content'>{data}</div>
    </Styled>
  );
};

export default Modal;
