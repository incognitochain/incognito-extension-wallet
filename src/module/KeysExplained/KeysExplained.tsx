import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { Header } from 'src/components';
import { translateSelector } from 'src/module/Configs';
import enhance from './KeysExplained.enhance';

const Styled = styled.div`
    .desc,
    .item {
        margin-bottom: 30px;
    }
    .item .main-text {
        margin-bottom: 10px;
    }
    p {
        line-height: 24px;
    }
`;

const KeysExplained = () => {
    const translate = useSelector(translateSelector);
    const dictionary = translate.keysExplained;

    return (
        <Styled>
            <Header title={dictionary.header} />
            <div className="content scroll-view">
                <p className="desc sub-text">{dictionary.desc}</p>
                {dictionary.content.map((item: any) => (
                    <div className="item">
                        <p className="main-text fw-medium">{item.title}</p>
                        <p className="sub-text" dangerouslySetInnerHTML={{ __html: item.text }} />
                    </div>
                ))}
            </div>
        </Styled>
    );
};

export default enhance(React.memo(KeysExplained));
