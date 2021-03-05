import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { IGlobalStyle } from 'src/styles';

interface IProps {
    onHandleChecked: () => any;
    label: string;
    checked: boolean;
}

const Styled = styled.button`
    .icon {
        margin-right: 5px;
        width: 15px;
        height: 15px;
    }
    .checkbox-label {
        line-height: 14px;
        color: ${(props: IGlobalStyle) => props.theme.text};
    }
`;

const CheckboxVector = React.memo((props: any) => {
    return (
        <svg width={15} height={15}>
            <path
                d="M12.147 14.567c1.59 0 2.41-.82 2.41-2.387V3.266c0-1.567-.82-2.388-2.41-2.388h-8.87c-1.582 0-2.41.813-2.41 2.388v8.914c0 1.567.828 2.387 2.41 2.387h8.87zm-.095-1.457h-8.68c-.673 0-1.047-.352-1.047-1.062v-8.65c0-.71.374-1.062 1.048-1.062h8.679c.666 0 1.047.352 1.047 1.062v8.65c0 .71-.38 1.062-1.047 1.062z"
                fill="#8A8A8E"
                fillRule="nonzero"
                {...props}
            />
        </svg>
    );
});

const CheckedboxVector = React.memo((props: any) => {
    return (
        <svg width={15} height={15}>
            <path
                d="M12.147 14.567c1.59 0 2.41-.82 2.41-2.387V3.266c0-1.567-.82-2.388-2.41-2.388h-8.87c-1.582 0-2.41.813-2.41 2.388v8.914c0 1.567.828 2.387 2.41 2.387h8.87zm-5.23-3.237c-.278 0-.505-.117-.71-.388L4.413 8.767a.826.826 0 01-.198-.52c0-.381.3-.689.681-.689.227 0 .403.08.593.322l1.407 1.78L9.92 4.826c.154-.256.367-.38.594-.38.373 0 .71.256.71.644 0 .168-.088.351-.19.513l-3.435 5.339a.782.782 0 01-.682.388z"
                fill="#000"
                fillRule="nonzero"
                {...props}
            />
        </svg>
    );
});

const Checkbox = (props: IProps & React.ButtonHTMLAttributes<HTMLButtonElement>) => {
    const { onHandleChecked, label, checked } = props;
    return (
        <Styled className="checkbox-container flex" onClick={onHandleChecked}>
            <div className="icon checkbox-icon">
                {!checked ? <CheckboxVector className="icon-abs" /> : <CheckedboxVector className="icon-abs" />}
            </div>
            {label && <p className="checkbox-label fw-medium">{label}</p>}
        </Styled>
    );
};

Checkbox.propTypes = {
    onHandleChecked: PropTypes.func,
};

export default Checkbox;
