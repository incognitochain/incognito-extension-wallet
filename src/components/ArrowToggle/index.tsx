import React from 'react';
import styled from 'styled-components';
import { ArrowDownIcon, ArrowUpIcon } from '../Icons';

const Styled = styled.div`
    .arrow-toggle {
    }
`;

interface IProps {
    title: string;
    content: React.FunctionComponent | React.ReactElement | any;
}

const ArrowToggle = (props: IProps) => {
    const { title, content } = props;
    const [toggle, setToggle] = React.useState(false);
    const handleToggle = () => setToggle(!toggle);
    return (
        <Styled className="arrow-toggle">
            <div className="sub flex" onClick={handleToggle}>
                <p className="title ellipsis fs-medium fw-medium">{title}</p>
                <div className="arrow-icon">{toggle ? <ArrowUpIcon /> : <ArrowDownIcon />}</div>
            </div>
            {toggle && content}
        </Styled>
    );
};

export default React.memo(ArrowToggle);
