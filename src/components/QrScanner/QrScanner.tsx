import React from 'react';
import ReactQrScanner from 'react-qr-scanner';
import styled from 'styled-components';

const Styled = styled.div``;

const QrScanner = (props: any) => {
  const handleScan = (data: string) => {
    console.debug(`DATA`, data);
  };
  const handleError = (e: any) => {
    console.debug(`ERROR`, e);
  };
  return (
    <Styled>
      <ReactQrScanner
        delay={100}
        className='react-qr-scanner'
        onError={handleError}
        onScan={handleScan}
      />
    </Styled>
  );
};

export default React.memo(QrScanner);
