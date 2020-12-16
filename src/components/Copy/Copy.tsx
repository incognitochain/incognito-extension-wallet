import React from 'react';
import styled from 'styled-components';
import copy from 'copy-to-clipboard';
import { COLORS } from 'src/styles';
import { Button } from 'src/components/Core';

interface IProps {
  text: string;
}

const Styled = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: ${COLORS.colorGrey};
  border-radius: 20px;
  height: 40px;
  margin-top: 30px;
  .text {
    margin-right: 15px;
    color: ${COLORS.colorGreyBold};
    padding-left: 10px;
  }
  .btn-container {
    height: 100%;
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
    } catch (error) {}
  };
  return (
    <Styled>
      <p className='text ellipsis'>{text}</p>
      <Button title={copied ? `Copied` : `Copy`} onClick={handleCopyData} />
    </Styled>
  );
};

export default Copy;
