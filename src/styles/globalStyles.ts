import { ENVS } from 'src/configs';
import { createGlobalStyle } from 'styled-components';
import { COLORS } from './colors';
import { FONT_SIZES } from './fontSize';

export const GlobalStyled = createGlobalStyle`
    @font-face {
        font-family: 'Inter-Regular';
        src: url('${ENVS.REACT_APP_DOMAIN_URL}/fonts/Inter/Inter-Regular.ttf'); 
        font-style: normal;
        font-display: swap;
        font-weight: 100;
    }
    @font-face {
        font-family: 'Inter-Regular';
        src: url('${ENVS.REACT_APP_DOMAIN_URL}/fonts/Inter/Inter-Bold.ttf'); 
        font-style: normal;
        font-display: swap;
        font-weight: 500;
    }
    @font-face {
        font-family: 'Inter-Regular';
        src: url('${ENVS.REACT_APP_DOMAIN_URL}/fonts/Inter/Inter-Medium.ttf'); 
        font-style: normal;
        font-display: swap;
        font-weight: 200;
    }
    .text {
        font-size: ${FONT_SIZES.regular}px;
        line-height: ${FONT_SIZES.regular + 5}px;
        color: #000;
    }

    .regular-text{
        font-size: ${FONT_SIZES.regular}px;
        line-height: ${FONT_SIZES.regular + 5}px;
        font-weight: 100;
    }

    .medium-text{
        font-size: ${FONT_SIZES.medium}px;
        line-height: ${FONT_SIZES.medium + 5}px;
        font-weight: 200;
        color: ${COLORS.colorGreyBold};
    }

    .bold-text {
        font-size: ${FONT_SIZES.medium}px;
        line-height: ${FONT_SIZES.medium + 5}px;
        font-weight: 500;
        color: ${COLORS.black};
    }
`;
