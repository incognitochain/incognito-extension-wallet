import { ENVS } from 'src/configs';
import { createGlobalStyle } from 'styled-components';
import { COLORS } from './colors';
import { FONT_SIZES } from './fontSize';

export interface ITheme {
  body: string;
  text: string;
  subText: string;
  toggleBorder: string;
  gradient: string;
  button: string;
  textButton: string;
  width: string;
  minWidth: string;
  maxWidth: string;
  height: string;
}

export interface IGlobalStyle {
  theme: ITheme;
}

export const lightTheme: ITheme = {
  body: COLORS.white,
  text: COLORS.black,
  subText: COLORS.colorGreyBold,
  toggleBorder: COLORS.white,
  gradient: 'linear-gradient(#39598A, #79D7ED)',
  button: '#333335',
  textButton: COLORS.white,
  width: '357px',
  minWidth: '320px',
  maxWidth: '375px',
  height: '600px',
};

export const darkTheme: ITheme = {
  body: '#363537',
  text: '#FAFAFA',
  subText: COLORS.colorGreyLight,
  toggleBorder: '#6B8096',
  gradient: 'linear-gradient(#091236, #1E215D)',
  button: COLORS.colorGreyBold,
  textButton: COLORS.white,
  width: '357px',
  minWidth: '320px',
  maxWidth: '375px',
  height: '600px',
};

export const DEFAULT_THEME = lightTheme;

export const GlobalStyled = createGlobalStyle`
    #root {
        background: ${(props: IGlobalStyle) => props.theme.body};
        color: ${(props: IGlobalStyle) => props.theme.text};
        scrollbar-color: transparent transparent; /*just hides the scrollbar for firefox */
        font-family: 'SF-Pro-Display';
        min-width:${(props: IGlobalStyle) => props.theme.minWidth};
        max-width: ${(props: IGlobalStyle) => props.theme.maxWidth};;
        width: ${(props: IGlobalStyle) => props.theme.width};
        font-style: normal;
        font-display: swap;
        box-sizing: border-box;
        font-weight: 100;
        height:${(props: IGlobalStyle) => props.theme.height};
        border: solid 0.5px;
        overflow: hidden;
        position: relative;
        font-size: ${FONT_SIZES.regular}px;
        line-height: ${FONT_SIZES.regular + 3}px;
        font-weight: 100;
        margin: auto;
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
        line-height: ${FONT_SIZES.small + 3}px;
    }
    .fs-regular {
        font-size: ${FONT_SIZES.regular}px;
        line-height: ${FONT_SIZES.regular + 3}px;
    }
    .fs-medium {
        font-size: ${FONT_SIZES.medium}px;
        line-height: ${FONT_SIZES.medium + 3}px;
    }
    .fs-supermedium {
        font-size: ${FONT_SIZES.superMedium}px;
        line-height: ${FONT_SIZES.superMedium + 3}px;
    }
    .fs-large{
        font-size: ${FONT_SIZES.large}px;
        line-height: ${FONT_SIZES.large + 3}px;
    }
    .fs-avglarge{
        font-size: ${FONT_SIZES.avgLarge}px;
        line-height: ${FONT_SIZES.avgLarge + 3}px;
    }
    .fs-verylarge{
        font-size: ${FONT_SIZES.veryLarge}px;
        line-height: ${FONT_SIZES.veryLarge + 3}px;
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
    .main-text {
        color: ${(props: IGlobalStyle) => props.theme.text};
    }
    .sub-text {
        color: ${(props: IGlobalStyle) => props.theme.subText};
    }
    .flex {
        display: flex;
        align-items: center;
    }
    .icon {
        position: relative;
         > img {
            position: absolute;
            left: 0;
            right: 0;
            bottom: 0;
            top: 0;
         }
    }
    .icon-abs {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        top: 0;
    }
    .icon {
        margin-left: 5px;
    }
`;
