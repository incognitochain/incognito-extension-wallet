import React from 'react';
import styled from 'styled-components';

const Styled = styled.button`
    &.wrapper {
        display: flex;
        flex-direction: row;
    }
    .icon-checkbox {
        min-width: 18px;
        height: 18px;
    }
    .label {
        margin-left: 5px;
        text-align: left;
    }
`;

interface ICheckBoxProps {
    checked: boolean;
    label: string;
    onHandleChecked: () => any;
}

const CheckedBoxVector = React.memo((props: any) => {
    return (
        <svg width="18" height="18" viewBox="0 0 15 15" {...props}>
            <path
                d="M12.147 14.567c1.59 0 2.41-.82 2.41-2.387V3.266c0-1.567-.82-2.388-2.41-2.388h-8.87c-1.582 0-2.41.813-2.41 2.388v8.914c0 1.567.828 2.387 2.41 2.387h8.87zm-5.23-3.237c-.278 0-.505-.117-.71-.388L4.413 8.767a.826.826 0 01-.198-.52c0-.381.3-.689.681-.689.227 0 .403.08.593.322l1.407 1.78L9.92 4.826c.154-.256.367-.38.594-.38.373 0 .71.256.71.644 0 .168-.088.351-.19.513l-3.435 5.339a.782.782 0 01-.682.388z"
                fill="#000"
                fillRule="nonzero"
            />
        </svg>
    );
});

const CheckBoxVector = React.memo((props: any) => {
    return (
        <svg width="18" height="18" viewBox="0 0 15 15" {...props}>
            <path
                d="M12.147 14.567c1.59 0 2.41-.82 2.41-2.387V3.266c0-1.567-.82-2.388-2.41-2.388h-8.87c-1.582 0-2.41.813-2.41 2.388v8.914c0 1.567.828 2.387 2.41 2.387h8.87zm-.095-1.457h-8.68c-.673 0-1.047-.352-1.047-1.062v-8.65c0-.71.374-1.062 1.048-1.062h8.679c.666 0 1.047.352 1.047 1.062v8.65c0 .71-.38 1.062-1.047 1.062z"
                fill="#000"
                fillRule="nonzero"
            />
        </svg>
    );
});

const FillCheckBox = React.memo((props: ICheckBoxProps & any) => {
    const { checked, label, onHandleChecked } = props;
    return (
        <Styled className="wrapper icon btn-fill-check-box" onClick={onHandleChecked}>
            <div className="icon-checkbox">{checked ? <CheckedBoxVector /> : <CheckBoxVector />}</div>
            <p className="fs-regular fw-regular sub-text label">{label}</p>
        </Styled>
    );
});

export default FillCheckBox;
