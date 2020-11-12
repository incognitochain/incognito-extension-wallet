import React from 'react';
import styled from 'styled-components';
import { FaAngleLeft } from 'react-icons/fa';
import { useHistory } from 'react-router-dom';
import { FONT_SIZES } from 'src/styles';

interface IProps {
  title: string;
  onGoBack?: () => void;
}

const Styled = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 42px;
  .left {
    display: flex;
    flex-direction: row;
    align-items: center;
    cursor: pointer;
  }
  .left h1.title {
    font-weight: 200;
    font-size: ${FONT_SIZES.medium}px;
    line-height: ${FONT_SIZES.medium + 4}px;
    &.ellipsis {
      max-width: 100%;
    }
  }
`;

const Header = (props: IProps) => {
  const { title, onGoBack } = props;
  const history = useHistory();
  const handleClick = () => {
    if (typeof onGoBack === 'function') {
      return onGoBack();
    }
    history.goBack();
  };
  return (
    <Styled className='header'>
      <div className='left' onClick={handleClick}>
        <FaAngleLeft size={20} />
        <h1 className='title ellipsis'>{title}</h1>
      </div>
      <div className='right'></div>
    </Styled>
  );
};

export default Header;
