import React from 'react';
import styled from 'styled-components';
import copy from 'copy-to-clipboard';
import { Button } from 'src/components/Core';
import { IGlobalStyle } from 'src/styles';

interface IProps {
    text: string;
}

const Styled = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    background-color: ${(props: IGlobalStyle) => props.theme.copyButton};
    border: solid 0.5px ${(props: IGlobalStyle) => props.theme.copyBorderButton};
    border-radius: 20px;
    height: 40px;
    margin-top: 30px;
    .text {
        margin-right: 15px;
        color: ${(props: IGlobalStyle) => props.theme.copyTextButton};
        padding-left: 15px;
    }
    .btn-container {
        height: 36px;
        margin-right: 2px;
        padding: unset;
        max-width: 60px;
    }
`;

const Copy: React.FunctionComponent<IProps> = (props) => {
    const { text } = props;
    const [copied, setCopied] = React.useState(false);
    const handleCopyData = (e: any) => {
        try {
            e.preventDefault();
            copy(text);
            setCopied(true);
        } catch (error) {
            console.debug(error);
        }
    };
    return (
        <Styled>
            <p className="text ellipsis">{text}</p>
            <Button title={copied ? `Copied` : `Copy`} onClick={handleCopyData} />
        </Styled>
    );
};

export default Copy;
