import React from 'react';
import styled from 'styled-components';
import copy from 'copy-to-clipboard';
import { ellipsisCenter } from 'src/utils/ellipsis';
import { COLORS } from 'src/styles';

interface IProps {
  text: string;
}

const Styled = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: ${COLORS.colorGrey};
  border-radius: 20px;
  height: 36px;
  padding: 0 20px;
  .text {
    margin-right: 15px;
    overflow-x: scroll;
    overflow-y: hidden;
  }
  button {
    background-color: ${COLORS.black};
    color: #fff;
    height: 32px;
    border-radius: 20px;
    font-size: 14px;
    line-height: 19px;
    padding: 0 10px;
  }
`;

const Copy: React.FunctionComponent<IProps> = (props) => {
  const { text } = props;
  const [copied, setCopied] = React.useState(false);
  const _text = ellipsisCenter({ str: text, limit: 15 });
  const handleCopyData = (e: any) => {
    try {
      e.preventDefault();
      copy(text);
      setCopied(true);
    } catch (error) {}
  };
  return (
    <Styled>
      <p className='text'>{_text}</p>
      <button onClick={handleCopyData}>{copied ? `Copied` : `Copy`}</button>
    </Styled>
  );
};

export default Copy;
