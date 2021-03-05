import React from 'react';
import styled from 'styled-components';

interface IProps {}

const Styled = styled.button`
    width: 18px;
    height: 18px;
`;

const QuestionVector = React.memo((props: any) => {
    return (
        <svg width={19} height={19}>
            <path
                d="M9.538 18.62c4.904 0 8.965-4.07 8.965-8.966 0-4.904-4.07-8.965-8.974-8.965C4.634.69.573 4.75.573 9.654c0 4.896 4.07 8.965 8.965 8.965zm-.193-7.085c-.466 0-.73-.246-.73-.72V10.7c0-.896.492-1.37 1.143-1.828.79-.554 1.169-.852 1.169-1.468 0-.685-.536-1.151-1.354-1.151-.606 0-1.037.299-1.336.79-.299.344-.378.616-.896.616-.299 0-.633-.22-.633-.624 0-.15.044-.307.088-.448.246-.835 1.266-1.565 2.83-1.565 1.547 0 2.892.8 2.892 2.312 0 1.09-.633 1.617-1.512 2.197-.633.413-.923.739-.923 1.248v.106c0 .36-.281.65-.738.65zm-.018 2.698c-.527 0-.984-.421-.984-.94 0-.519.448-.95.984-.95s.985.423.985.95c0 .527-.458.94-.985.94z"
                fill="#FFF"
                fillRule="nonzero"
                {...props}
            />
        </svg>
    );
});

const Question = (props: IProps & React.ButtonHTMLAttributes<HTMLButtonElement>) => {
    return (
        <Styled className="icon" {...props}>
            <QuestionVector />
        </Styled>
    );
};

export default Question;
