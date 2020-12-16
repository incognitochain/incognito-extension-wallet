import React from 'react';
import styled from 'styled-components';
import { SettingIcon } from 'src/components/Icons';
import QrCode from 'src/components/Icons/QrCode';
import { BtnSelectAccount } from 'src/module/Account/features/SelectAccount';
import { route as receiveRoute } from 'src/module/Account/features/Receive';

interface IProps {}

const Styled = styled.div`
  margin-bottom: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .menu {
    display: flex;
    align-items: center;
  }
  .menu .btn-select-account {
    margin-left: 10px;
  }
`;

const HeaderApp = (props: IProps) => {
  return (
    <Styled>
      <div className='menu'>
        <SettingIcon />
      </div>
      <div className='menu'>
        <QrCode route={receiveRoute} />
        <BtnSelectAccount />
      </div>
    </Styled>
  );
};

export default HeaderApp;
