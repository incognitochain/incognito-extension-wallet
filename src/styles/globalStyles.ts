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
}

export interface IGlobalStyle {
  theme: ITheme;
}

export const lightTheme: ITheme = {
  body: '#E2E2E2',
  text: '#363537',
  toggleBorder: '#FFF',
  gradient: 'linear-gradient(#39598A, #79D7ED)',
  button: COLORS.black,
};

export const darkTheme: ITheme = {
  body: '#363537',
  text: '#FAFAFA',
  toggleBorder: '#6B8096',
  gradient: 'linear-gradient(#091236, #1E215D)',
  button: COLORS.colorGreyBold,
};

export const DEFAULT_THEME = darkTheme;

export const GlobalStyled = createGlobalStyle`
    #root {
        background: ${(props: IGlobalStyle) => props.theme.body};
        color: ${(props: IGlobalStyle) => props.theme.text};
        scrollbar-color: transparent transparent; /*just hides the scrollbar for firefox */
        font-family: 'Inter-Regular';
        min-width: 320px;
        max-width: 375px;
        font-style: normal;
        font-display: swap;
        width: auto;
        box-sizing: border-box;
        font-weight: 100;
        margin: auto;
        height: 750px;
        border: solid 0.5px;
        overflow: scroll;
        position: relative;
        font-size: ${FONT_SIZES.regular}px;
        line-height: ${FONT_SIZES.regular + 5}px;
        font-weight: 100;
    }
    
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
    .fontweight-regular{
        font-weight: 100;
    }
    .fontweight-medium{
        font-weight: 200;
    }
    .fontweight-bold {
        font-weight: 500;
    }
    .fontsize-regular {
        font-size: ${FONT_SIZES.regular}px;
        line-height: ${FONT_SIZES.regular + 5}px;
    }
    .fontsize-medium {
        font-size: ${FONT_SIZES.medium}px;
        line-height: ${FONT_SIZES.medium + 5}px;
    }
    .fontsize-supermedium {
        font-size: ${FONT_SIZES.superMedium}px;
        line-height: ${FONT_SIZES.superMedium + 5}px;
    }
    .fontsize-large{
        font-size: ${FONT_SIZES.large}px;
        line-height: ${FONT_SIZES.large + 5}px;
    }
    .fontsize-verylarge{
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
