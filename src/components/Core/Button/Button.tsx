import React from 'react';
import { useSelector } from 'react-redux';
import LoadingIcon from 'src/components/Icons/Loading';
import { themeSelector } from 'src/module/Configs';
import { COLORS, ITheme, Row } from 'src/styles';
import styled from 'styled-components';

interface IProps {
    customContent?: React.ElementType;
    title: string;
    disabled?: boolean;
    loading?: boolean;
}

const Styled = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 20px;
    height: 40px;
    margin: auto;
    padding: 0 11px;
    background-color: ${(props: { theme: ITheme }) => props.theme.button};
    color: ${(props: { theme: ITheme }) => props.theme.textButton};
    width: 100%;
    font-weight regular;
    p.btn-title {
    }
    &.btn-disabled {
        background-color: ${COLORS.colorGreyLight};
    }
    .loading {
        position: absolute;
        right: 20%;
    }
`;

const Button = (props: IProps & React.ButtonHTMLAttributes<HTMLButtonElement>) => {
    const { customContent, title, disabled, loading, className = '', ...rest } = props;
    const theme = useSelector(themeSelector);
    const renderContent = () => {
        return (
            <Row>
                <p>{title}</p>
                {!!loading && (
                    <div className="loading">
                        <LoadingIcon />
                    </div>
                )}
            </Row>
        );
    };
    return (
        <Styled
            theme={theme}
            className={`${className} btn-container ${disabled ? 'btn-disabled' : ''} fw-regular fs-regular`}
            {...rest}
        >
            {customContent || renderContent()}
        </Styled>
    );
};

export default Button;
