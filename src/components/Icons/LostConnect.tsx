import React from 'react';
import styled from 'styled-components';

interface IProps {}

const Styled = styled.button`
    width: 60px;
    height: 60px;
`;

const LostConnectVector = React.memo((props: any) => {
    return (
        <svg width="60px" height="60px" viewBox="0 0 62 62">
            <g transform="translate(1 1)" fill="none" fillRule="evenodd" {...props}>
                <circle stroke="#E9E8E8" strokeWidth={2} cx={30} cy={30} r={30} />
                <path
                    d="M30.515 35.946c.586 0 .996-.395 1.01-1.01l.088-17.242c0-.644-.498-1.069-1.113-1.069s-1.113.425-1.113 1.07c.044 5.742.073 11.498.117 17.24 0 .616.41 1.011 1.01 1.011zm-13.726-7.602c2.857-3.018 6.504-4.922 10.562-5.537l-.03-4.175c-5.449.79-10.488 3.442-13.388 7.016-.19.235-.176.542.044.791l1.919 1.92c.263.263.63.263.893-.015zm28.315 0l1.905-1.905c.249-.249.234-.556.044-.79-2.93-3.545-7.91-6.255-13.389-7.017l-.03 4.175c4.058.586 7.706 2.505 10.592 5.551.249.264.615.25.878-.014zm-6.079 6.123l2.154-2.139c.22-.22.249-.527.044-.762-1.656-2.036-4.453-3.662-7.603-4.277l-.03 4.35c1.773.543 3.385 1.568 4.556 2.828.264.278.586.263.88 0zm-16.128-.044c1.143-1.26 2.754-2.256 4.512-2.813l-.03-4.32c-3.163.644-5.917 2.226-7.616 4.276-.19.235-.176.528.058.762l2.154 2.153c.293.279.644.25.922-.058zm7.603 7.822a2.022 2.022 0 002.021-2.007 2.026 2.026 0 00-2.021-2.021 2.013 2.013 0 000 4.028z"
                    fill="#8A8A8E"
                    fillRule="nonzero"
                />
            </g>
        </svg>
    );
});

const LostConnect = (props: IProps & React.ButtonHTMLAttributes<HTMLButtonElement>) => {
    return (
        <Styled className="icon" {...props}>
            <LostConnectVector />
        </Styled>
    );
};

export default LostConnect;
