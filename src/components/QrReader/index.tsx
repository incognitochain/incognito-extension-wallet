import React from 'react';
import styled from 'styled-components';
import QrReader from 'react-qr-reader';

const Styled = styled.div``;

const QrReaderComponent = (props: QrReader.props) => {
    return (
        <Styled>
            <QrReader {...props} />;
        </Styled>
    );
};

export default React.memo(QrReaderComponent);
