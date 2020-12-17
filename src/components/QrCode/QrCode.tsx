import React from 'react';
import styled from 'styled-components';
import QRCodeReact, { BaseQRCodeProps } from 'qrcode.react';
import { themeSelector } from 'src/module/Configs';
import { useSelector } from 'react-redux';
import { COLORS, ITheme } from 'src/styles';
import Copy from '../Copy';

interface IProps {
  hook?: any;
  qrCodeProps: BaseQRCodeProps;
}

const Styled = styled.div`
  .qrcode-react {
    justify-content: center;
    display: flex;
  }
  .copy-block {
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 50px;
    border-radius: 50px;
    padding: 0 15px;
    justify-content: space-between;
    background-color: ${COLORS.colorGreyLight};
    margin-top: 30px;
  }
  .copy-block .btn-copy {
    background: ${({ theme }: { theme: ITheme }) => theme.button};
    height: 40px;
    border-radius: 40px;
    padding: 0 10px;
  }
  .copy-block p {
    max-width: 100%;
  }
`;

const QrCode = (props: IProps) => {
  const { hook, qrCodeProps } = props;
  const { value } = qrCodeProps;
  const theme = useSelector(themeSelector);
  return (
    <Styled theme={theme} className='qrcode-container'>
      <div className='qrcode-react'>
        <QRCodeReact {...qrCodeProps} />
      </div>
      {hook}
      <Copy text={value} />
    </Styled>
  );
};

export default QrCode;
