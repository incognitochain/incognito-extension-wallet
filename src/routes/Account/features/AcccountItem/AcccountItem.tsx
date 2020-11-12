import React from 'react';
import styled from 'styled-components';
import { FaCopy, FaQrcode } from 'react-icons/fa';
import copy from 'copy-to-clipboard';
import { COLORS, FONT_SIZES } from 'src/styles';
import { route } from './AccountItem.route';
import { useHistory } from 'react-router-dom';

export interface IProps {
  title: string;
  desc: string;
  limit?: number;
}

const Styled = styled.div`
  margin-bottom: 30px;
  .hook p.title {
    font-size: ${FONT_SIZES.medium}px;
    line-height: ${FONT_SIZES.medium + 9}px;
    font-weight: 500;
  }
  .hook p.decs {
    font-size: ${FONT_SIZES.regular}px;
    line-height: ${FONT_SIZES.regular + 9}px;
    font-weight: 100;
    color: ${COLORS.colorGreyBold};
  }
  .hook {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
  }
  .hook .icons {
    display: flex;
    flex-direction: row;
    align-items: center;
    svg {
      cursor: pointer;
    }
    svg:first-child {
      margin-right: 5px;
    }
  }
`;

const AccountItem = (props: IProps) => {
  const { title, desc } = props;
  const history = useHistory();
  const handleCopy = () => {
    copy(desc);
    alert('Copied');
  };
  const handleShowQrCode = () =>
    history.push(route, {
      title,
      desc,
    });
  return (
    <Styled className='account-item'>
      <div className='hook'>
        <p className='title'>{title}</p>
        <div className='icons'>
          <FaQrcode color={COLORS.colorGreyBold} onClick={handleShowQrCode} />
          <FaCopy color={COLORS.colorGreyBold} onClick={handleCopy} />
        </div>
      </div>
      <p className='decs ellipsis'>{desc}</p>
    </Styled>
  );
};

export default React.memo(AccountItem);
