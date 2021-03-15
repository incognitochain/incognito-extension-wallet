import React from 'react';
import { ArrowDownIcon, VerifiedIcon } from 'src/components/Icons';
import { isEmpty } from 'lodash';
import Row from 'src/components/Row';
import { Styled, Text } from './styled';

interface IProps {
    placeholder?: string;
    text?: string;
    buttonProps: React.HTMLAttributes<HTMLDivElement>;
    verified: boolean;
}

const SelectCoins = React.memo((props: IProps) => {
    const { placeholder, text, buttonProps, verified } = props;
    return (
        <Styled {...buttonProps}>
            <Row>
                <Text className="fs-medium fw-regular" isEmpty={isEmpty(text)}>
                    {text || placeholder}
                </Text>
                {!!verified && <VerifiedIcon />}
            </Row>
            <ArrowDownIcon />
        </Styled>
    );
});

export default SelectCoins;
