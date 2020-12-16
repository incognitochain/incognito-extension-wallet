import React from 'react';
import { useSelector } from 'react-redux';
import { Header } from 'src/components';
import QrCode from 'src/components/QrCode';
import { IAccountLanguage } from 'src/i18n';
import { translateByFieldSelector } from 'src/module/Configs';
import styled from 'styled-components';
import { paymentAddressSelector } from 'src/module/Account';

interface IProps {}

const Styled = styled.div`
  .hook {
    margin-top: 15px;
  }
`;

const Receive = (props: IProps) => {
  const translate: IAccountLanguage = useSelector(translateByFieldSelector)(
    'account'
  );
  const paymentAddress = useSelector(paymentAddressSelector);
  return (
    <Styled>
      <Header title={translate.receive.headerTitle} />
      <QrCode
        qrCodeProps={{
          value: paymentAddress,
        }}
        hook={
          <div className='hook'>
            {translate.receive.hook.split('\n').map((text) => (
              <p className='fw-regular fs-regular center-text'>{text}</p>
            ))}
          </div>
        }
      />
    </Styled>
  );
};

export default Receive;
