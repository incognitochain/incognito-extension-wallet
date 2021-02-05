export interface IProps {
    tooltips: Array<any>;
}

export interface ITooltipProps {
    data: {
        timeout?: number;
        id: string;
        text: string;
        className?: any;
        ref?: any;
        width?: number;
        height?: number;
        margin?: number;
    };
    tooltipPosition?: {
        top: number;
        bottom: number;
        left: number;
        right: number;
    };
}
