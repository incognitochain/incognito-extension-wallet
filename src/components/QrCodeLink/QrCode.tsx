import React, { SyntheticEvent } from 'react';
import { Link } from 'react-router-dom';
import { QrCodeIcon } from '../Icons';

interface IProps {
    route?: string;
    onClick?: any;
}

const QrCode = (props: IProps) => {
    const { route = '#', onClick } = props;
    const handleClick = (e: SyntheticEvent) => {
        if (typeof onClick === 'function') {
            e.preventDefault();
            onClick();
        }
    };
    return (
        <Link to={route}>
            <QrCodeIcon onClick={handleClick} />
        </Link>
    );
};

export default QrCode;
