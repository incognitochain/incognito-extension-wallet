import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { Header } from 'src/components';
import { translateSelector } from 'src/module/Configs';
import enhance from './KeysExplained.enhance';

const Styled = styled.div`
    .content {
        line-height 24px;
    }
    .desc {
        margin-bottom: 24px;
    }
    .title {
    }
    .text {
    }
    .item {
        margin-bottom: 24px;
    }
`;

const KeysExplained = () => {
    const translate = useSelector(translateSelector);
    const dictionary = translate.keysExplained;

    return (
        <Styled>
            <Header title={dictionary.header} />
            <div className="content scroll-view">
                <div className="desc text-color-grey">{dictionary.desc}</div>
                {dictionary.content.map((item: any) => (
                    <div className="item">
                        <div className="title fw-bold">{item.title}</div>
                        <div dangerouslySetInnerHTML={{ __html: item.text }} />
                    </div>
                ))}
            </div>
        </Styled>
    );
};

export default enhance(React.memo(KeysExplained));
