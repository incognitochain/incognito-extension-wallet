import React from 'react';
import styled from 'styled-components';
import copy from 'copy-to-clipboard';
import { Button } from 'src/components/Core';
import { darkModeSelector } from 'src/module/Setting';
import { useSelector } from 'react-redux';

interface IProps {
    text: string;
}

const Styled = styled.div<{ darkMode: boolean }>`
    display: flex;
    flex-direction: row;
    align-items: center;
    background-color: ${(props) => (props?.darkMode ? '#121212' : '#F3F3F3')};
    border: solid 0.5px ${(props) => (props?.darkMode ? '#333335' : '#CBCBCB')};
    border-radius: 20px;
    height: 40px;
    margin-top: 30px;
    .text {
        margin-right: 15px;
        color: ${(props) => (props?.darkMode ? '#fff' : '#8A8A8E')};
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
    const darkMode = useSelector(darkModeSelector);
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
        <Styled darkMode={darkMode}>
            <p className="text ellipsis">{text}</p>
            <Button title={copied ? `Copied` : `Copy`} onClick={handleCopyData} />
        </Styled>
    );
};

export default Copy;
