import React from 'react';
import styled from 'styled-components';
import { FaCopy, FaQrcode } from 'react-icons/fa';
import copy from 'copy-to-clipboard';
import { COLORS, FONT_SIZES } from 'src/styles';
import { route } from './AccountItem.route';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { actionToggleToast, TOAST_CONFIGS } from 'src/components';

export interface IProps {
  title: string;
  desc: string;
  limit?: number;
  hasQrCode?: boolean;
  hasCopy?: boolean;
  selectable?: boolean;
  onSelectAccount?: any;
}

const Styled = styled.div`
  margin-bottom: 30px;
  &.selectable {
    cursor: pointer;
  }
  .hook p.title {
    font-size: ${FONT_SIZES.medium}px;
    line-height: ${FONT_SIZES.medium + 9}px;
    font-weight: 500;
  }
  p.decs {
    font-size: ${FONT_SIZES.regular}px;
    line-height: ${FONT_SIZES.regular + 9}px;
    font-weight: 100;
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
  const {
    title,
    desc,
    hasCopy = true,
    hasQrCode = true,
    selectable = false,
    onSelectAccount = null,
  } = props;
  const dispatch = useDispatch();
  const history = useHistory();
  const handleCopy = () => {
    copy(desc);
    dispatch(
      actionToggleToast({
        toggle: true,
        value: 'Copied',
        type: TOAST_CONFIGS.success,
      })
    );
  };
  const handleShowQrCode = () =>
    history.push(route, {
      title,
      desc,
    });
  return (
    <Styled
      className={`account-item ${selectable ? 'selectable' : ''}`}
      onClick={() => {
        if (typeof onSelectAccount === 'function' && selectable) {
          onSelectAccount();
        }
      }}
    >
      <div className='hook'>
        <p className='title'>{title}</p>
        <div className='icons'>
          {hasQrCode && (
            <FaQrcode color={COLORS.colorGreyBold} onClick={handleShowQrCode} />
          )}
          {hasCopy && (
            <FaCopy color={COLORS.colorGreyBold} onClick={handleCopy} />
          )}
        </div>
      </div>
      <p className='decs ellipsis'>{desc}</p>
    </Styled>
  );
};

export default React.memo(AccountItem);
