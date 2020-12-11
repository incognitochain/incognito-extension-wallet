import React from 'react';
import styled from 'styled-components';
import QRCodeReact, { BaseQRCodeProps } from 'qrcode.react';
import { themeSelector, translateSelector } from 'src/module/Configs';
import { useSelector } from 'react-redux';
import { ILanguage } from 'src/i18n';
import { COLORS, ITheme } from 'src/styles';
import copyToClipboard from 'copy-to-clipboard';
import { Button } from 'src/components/Core';

interface IProps {}

const Styled = styled.div`
  padding-top: 30px;
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
    margin-top: 50px;
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

const QrCode = (props: IProps & BaseQRCodeProps) => {
  const [state, setState] = React.useState({
    copied: false,
  });
  const theme = useSelector(themeSelector);
  const translate: ILanguage = useSelector(translateSelector);
  const { copied, copy } = translate.general;
  const handleCopy = () => {
    copyToClipboard(props?.value);
    setState({ copied: true });
  };

  return (
    <Styled theme={theme} className='qrcode-container'>
      <div className='qrcode-react'>
        <QRCodeReact {...props} />
      </div>
      <div className='copy-block'>
        <p className='ellipsis'>{props?.value}</p>
        <Button
          title={state.copied ? copied : copy}
          onClick={handleCopy}
          className='btn-copy fontsize-regular fontweight-medium'
        ></Button>
      </div>
    </Styled>
  );
};

export default QrCode;
