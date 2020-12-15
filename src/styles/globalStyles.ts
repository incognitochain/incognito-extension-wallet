import { ENVS } from 'src/configs';
import { createGlobalStyle } from 'styled-components';
import { COLORS } from './colors';
import { FONT_SIZES } from './fontSize';

export interface ITheme {
  body: string;
  text: string;
  toggleBorder: string;
  gradient: string;
  button: string;
  textButton: string;
}

export interface IGlobalStyle {
  theme: ITheme;
}

export const lightTheme: ITheme = {
  body: COLORS.white,
  text: COLORS.black,
  toggleBorder: COLORS.white,
  gradient: 'linear-gradient(#39598A, #79D7ED)',
  button: '#333335',
  textButton: COLORS.white,
};

export const darkTheme: ITheme = {
  body: '#363537',
  text: '#FAFAFA',
  toggleBorder: '#6B8096',
  gradient: 'linear-gradient(#091236, #1E215D)',
  button: COLORS.colorGreyBold,
  textButton: COLORS.white,
};

export const DEFAULT_THEME = lightTheme;

export const GlobalStyled = createGlobalStyle`
    #root {
        background: ${(props: IGlobalStyle) => props.theme.body};
        color: ${(props: IGlobalStyle) => props.theme.text};
        scrollbar-color: transparent transparent; /*just hides the scrollbar for firefox */
        font-family: 'SF-Pro-Display';
        min-width: 320px;
        max-width: 375px;
        font-style: normal;
        font-display: swap;
        width: auto;
        box-sizing: border-box;
        font-weight: 100;
        margin: auto;
        height: 600px;
        border: solid 0.5px;
        overflow: scroll;
        position: relative;
        font-size: ${FONT_SIZES.regular}px;
        line-height: ${FONT_SIZES.regular + 5}px;
        font-weight: 100;
    }
    
    @font-face {
        font-family: 'SF-Pro-Display';
        src: url('${ENVS.REACT_APP_DOMAIN_URL}/fonts/SF-Pro-Display/SF-Pro-Display-Regular.otf'); 
        font-style: normal;
        font-display: swap;
        font-weight: 100;
    }
    @font-face {
        font-family: 'SF-Pro-Display';
        src: url('${ENVS.REACT_APP_DOMAIN_URL}/fonts/SF-Pro-Display/SF-Pro-Display-Bold.otf'); 
        font-style: normal;
        font-display: swap;
        font-weight: 500;
    }
    @font-face {
        font-family: 'SF-Pro-Display';
        src: url('${ENVS.REACT_APP_DOMAIN_URL}/fonts/SF-Pro-Display/SF-Pro-Display-Medium.otf'); 
        font-style: normal;
        font-display: swap;
        font-weight: 200;
    }
    .fw-regular{
        font-weight: 100;
    }
    .fw-medium{
        font-weight: 200;
    }
    .fw-bold {
        font-weight: 500;
    }
    .fs-small {
        font-size: ${FONT_SIZES.small}px;
        line-height: ${FONT_SIZES.small + 5}px;
    }
    .fs-regular {
        font-size: ${FONT_SIZES.regular}px;
        line-height: ${FONT_SIZES.regular + 5}px;
    }
    .fs-medium {
        font-size: ${FONT_SIZES.medium}px;
        line-height: ${FONT_SIZES.medium + 5}px;
    }
    .fs-supermedium {
        font-size: ${FONT_SIZES.superMedium}px;
        line-height: ${FONT_SIZES.superMedium + 5}px;
    }
    .fs-large{
        font-size: ${FONT_SIZES.large}px;
        line-height: ${FONT_SIZES.large + 5}px;
    }
    .fs-verylarge{
        font-size: ${FONT_SIZES.veryLarge}px;
        line-height: ${FONT_SIZES.veryLarge + 5}px;
    }
    .hook-row {
        display: flex;
        flex-direction: row;
        align-items: center;
    }
    .hook-column {

    }
    .right-text{
        text-align: right;
    }
    .center-text{
        text-align: center;
    }
    .left-text{
        text-align: left;
    }
    .wrapper {
        height: 100%;
        width: 100%;
        position: relative;
    }
`;
