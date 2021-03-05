import React from 'react';
import styled from 'styled-components';

interface IProps {}

const Styled = styled.button`
    width: 16px;
    height: 16px;
`;

const ScanVector = React.memo((props: any) => {
    return (
        <svg width={17} height={17}>
            <path
                d="M15.656 5.695c.414 0 .633-.234.633-.64V3.14c0-1.61-.82-2.414-2.453-2.414h-1.914c-.406 0-.633.218-.633.625 0 .406.227.632.633.632h1.89c.774 0 1.22.414 1.22 1.227v1.844c0 .406.226.64.624.64zm-14.039 0c.414 0 .633-.234.633-.64V3.21c0-.813.43-1.227 1.21-1.227h1.892c.414 0 .64-.226.64-.632 0-.407-.226-.625-.64-.625H3.445C1.813.727.992 1.53.992 3.14v1.914c0 .406.227.64.625.64zm3.735 10.32c.414 0 .64-.226.64-.624 0-.407-.226-.633-.64-.633H3.46c-.781 0-1.211-.414-1.211-1.227v-1.844c0-.414-.227-.64-.633-.64s-.625.226-.625.64v1.907c0 1.617.82 2.422 2.453 2.422h1.907zm8.484 0c1.633 0 2.453-.812 2.453-2.421v-1.906c0-.415-.227-.641-.633-.641s-.625.226-.625.64v1.844c0 .813-.445 1.227-1.219 1.227h-1.89c-.406 0-.633.226-.633.633 0 .398.227.625.633.625h1.914z"
                fill="#000"
                fillRule="nonzero"
                {...props}
            />
        </svg>
    );
});

const Scan = (props: IProps & React.ButtonHTMLAttributes<HTMLButtonElement>) => {
    const { className = '' } = props;
    return (
        <Styled type="button" className={`icon ${className || ''}`} {...props}>
            <ScanVector />
        </Styled>
    );
};

export default Scan;
