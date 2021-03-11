import { ENVS, isDev } from 'src/configs';
import styled, { createGlobalStyle } from 'styled-components';
import { COLORS } from './colors';
import { FONT_SIZES } from './fontSize';

export interface ITheme {
    body: string;
    text: string;
    inverseBody: string;
    inverseText: string;
    subText: string;
    toggleBorder: string;
    gradient: string;
    button: string;
    textButton: string;
    width: string;
    minWidth: string;
    maxWidth: string;
    height: string;
    tooltipBg: string;
    tooltipText: string;
    input: string;
    inputBorder: string;
    inputTextColor: string;
    modalBg: string;
    switchButton: string;
    switchActiveButton: string;
    typeButton: string;
    typeTextButton: string;
    disableButton: string;
    disableTextButton: string;
    copyButton: string;
    copyTextButton: string;
    copyBorderButton: string;
    fastFeeButton: string;
    fastFeeBorderButton: string;
    fastFeeTextButton: string;
    toastBg: string;
}

export interface IGlobalStyle {
    theme: ITheme;
}

export const lightTheme: ITheme = {
    body: COLORS.white,
    inverseBody: COLORS.black,
    text: COLORS.black,
    inverseText: COLORS.white,
    subText: COLORS.colorGreyBold,
    toggleBorder: COLORS.white,
    gradient: 'linear-gradient(#39598A, #79D7ED)',
    button: COLORS.black1,
    textButton: COLORS.white,
    width: '357px',
    minWidth: '320px',
    maxWidth: '375px',
    height: '600px',
    tooltipBg: COLORS.black,
    tooltipText: COLORS.white,
    input: COLORS.colorGrey,
    inputBorder: COLORS.colorKeyGrey,
    inputTextColor: COLORS.black4,
    modalBg: COLORS.white,
    switchButton: COLORS.lightGrey22,
    switchActiveButton: COLORS.black1,
    typeButton: COLORS.colorGrey,
    typeTextButton: COLORS.colorGreyBold,
    disableButton: 'rgba(51, 53, 52, 0.3)',
    disableTextButton: COLORS.white,
    copyButton: COLORS.colorGrey,
    copyTextButton: COLORS.colorGreyBold,
    copyBorderButton: COLORS.colorKeyGrey,
    fastFeeButton: COLORS.colorGrey,
    fastFeeBorderButton: COLORS.colorKeyGrey,
    fastFeeTextButton: COLORS.colorGreyBold,
    toastBg: COLORS.colorGrey,
};

export const darkTheme: ITheme = {
    body: COLORS.black2,
    text: COLORS.white,
    inverseText: COLORS.black,
    inverseBody: COLORS.white,
    subText: COLORS.colorGreyBold,
    toggleBorder: '#6B8096',
    gradient: 'linear-gradient(#091236, #1E215D)',
    button: COLORS.black1,
    textButton: COLORS.white,
    width: '357px',
    minWidth: '320px',
    maxWidth: '375px',
    height: '600px',
    tooltipBg: COLORS.white,
    tooltipText: COLORS.black,
    input: COLORS.black2,
    inputBorder: COLORS.black1,
    inputTextColor: COLORS.white,
    modalBg: COLORS.black1,
    switchButton: COLORS.black1,
    switchActiveButton: COLORS.lightGrey22,
    typeButton: COLORS.black2,
    typeTextButton: COLORS.colorGreyBold,
    disableButton: COLORS.black3,
    disableTextButton: COLORS.colorGreyBold,
    copyButton: COLORS.black2,
    copyTextButton: COLORS.white,
    copyBorderButton: COLORS.black1,
    fastFeeButton: COLORS.black2,
    fastFeeBorderButton: COLORS.black1,
    fastFeeTextButton: COLORS.colorGreyBold,
    toastBg: COLORS.black3,
};

export const DEFAULT_THEME = darkTheme;

export const GlobalStyled = createGlobalStyle`
    html {
        background: ${COLORS.lightGrey19};
    }

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
        font-weight: 400;
        height:${(props: IGlobalStyle) => props.theme.height};
        border: ${isDev ? 'solid 0.5px' : 'none'};
        overflow: hidden;
        position: relative;
        font-size: ${FONT_SIZES.regular}px;
        line-height: ${FONT_SIZES.regular + 3}px;
        margin: auto;
        padding: 30px;
        * {
             box-sizing: border-box;
             font-family: 'SF-Pro-Display';
        }
    }
    
    #root.incognito-extension-tab {
        margin-top: 40px;
        margin-bottom: 100px;
        border-radius: 30px;
        border: 1px solid ${COLORS.lightGrey21};
    }

    #root.incognito-extension-tab .modal-content-wrapper{ 
        margin-top: 40px;
        border-radius: 30px;
    }

    @font-face {
        font-family: 'SF-Pro-Display';
        src: url('${ENVS.REACT_APP_DOMAIN_URL}/fonts/SF-Pro-Display/SF-Pro-Display-Regular.otf'); 
        font-style: normal;
        font-display: swap;
        font-weight: 400;
    }
    @font-face {
        font-family: 'SF-Pro-Display';
        src: url('${ENVS.REACT_APP_DOMAIN_URL}/fonts/SF-Pro-Display/SF-Pro-Display-Bold.otf'); 
        font-style: normal;
        font-display: swap;
        font-weight: 700;
    }
    @font-face {
        font-family: 'SF-Pro-Display';
        src: url('${ENVS.REACT_APP_DOMAIN_URL}/fonts/SF-Pro-Display/SF-Pro-Display-Medium.otf'); 
        font-style: normal;
        font-display: swap;
        font-weight: 500;
    }
    .fw-regular{
        font-weight: 400;
    }
    .fw-medium{
        font-weight: 500;
    }
    .fw-light{
        font-weight: 200;
    }
    .fw-bold {
        font-weight: 700;
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
    .hook-row-space-between {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
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
    .main-text {
        color: ${(props: IGlobalStyle) => props.theme.text};
    }
    .sub-text {
        color: ${(props: IGlobalStyle) => props.theme.subText};
    }
    .inverse-text {
        color: ${(props: IGlobalStyle) => props.theme.inverseText};
    }
    .flex {
        display: flex;
        align-items: center;
    }
    .flex-jcb {
        display: flex;
        align-items: center;
        justify-content: space-between;
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
          > svg {
            position: absolute;
            left: 0;
            right: 0;
            bottom: 0;
            top: 0;
            width: 100%;
            height: 100%;
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
    .scroll-view {
        position: relative;
        overflow-x: hidden;
        overflow-y: scroll;
        max-height: 518px;
        padding-bottom: 30px;
    }
    .linear-bg {
        background: linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.5), rgba(0,0,0,0.6)) !important;
     }
    .hidden {
        display: none;
    }    
    .error-message {
        color: ${COLORS.orange};
        font-size: 14px;
        margin-top: 10px;
    }
    .p-l-15 {
        padding-left: 15px;
    }
    .m-b-30 {
        margin-bottom: 30px;
    }
    .m-t-50 {
        margin-top: 50px;
    }
    .m-t-30 {
        margin-top: 30px !important;
    }
    .m-r-15 {
        margin-right: 15px;
    }
    .m-b-10 {
        margin-bottom: 10px;
    }
    .center-abs-ver {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
    }
    .center-abs-hor {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
    }
    .success {
        color: ${COLORS.green};
    }
    .error {
        color: ${COLORS.red};
    }
    .warning {
        color: ${COLORS.orange};
    }
    .text-color-grey {
        color: ${COLORS.newGrey};
    }
    .text-color-black {
        color: ${COLORS.black};
    }
    .m-t-15 {
        margin-top: 15px;
    }
    svg {
        path {
            fill: ${(props: { theme: ITheme }) => props.theme.text};
        }
    }
    
    // Remove eye icon for password input on Edge Chromium
    input::-ms-reveal,
    input::-ms-clear {
        display: none;
    }
    .pointer {
        cursor: pointer;
    }
    .modal-data .label {
        margin-bottom: 30px;
    }
`;

export const Row = styled.div`
    display: flex;
    flex-direction: row;
    .center {
        align-items: center;
        justify-content: center;
    }
`;
