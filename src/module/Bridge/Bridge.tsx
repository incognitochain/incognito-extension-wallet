import React from 'react';
import { Header, Information, BridgeContent } from 'src/module/Bridge/Components';
import Row from 'src/components/Row';
import { Wrapper } from './Bridge.styled';

const Bridge = React.memo(() => {
    return (
        <Wrapper>
            <Header />
            <Row className="row">
                <Information />
                <BridgeContent />
            </Row>
        </Wrapper>
    );
});
export default Bridge;
