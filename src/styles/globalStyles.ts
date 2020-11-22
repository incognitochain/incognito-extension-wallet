import { ENVS } from 'src/configs';
import { createGlobalStyle } from 'styled-components';

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
`;
