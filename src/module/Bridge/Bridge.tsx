import React from 'react';
import { Header, Information, BridgeContent } from 'src/module/Bridge/components';
import Row from 'src/components/Row';
import { Wrapper } from './Bridge.styled';

const Bridge = React.memo(() => {
    return (
        <Wrapper>
            <Header />
            <Row className="row">
                {/* <Information /> */}
                <div />
                <BridgeContent />
            </Row>
        </Wrapper>
    );
});
export default Bridge;
