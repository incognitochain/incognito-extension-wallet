export interface IHistoryItem {
    id?: string;
    title?: string;
    desc?: string;
    copyData?: string;
    link?: string;
    descClassName?: string;
    titleClassName?: string;
    descColor?: string;
    customItem?: React.FunctionComponent | React.ReactElement | any;
    disabled?: boolean;
    message?: string;
    hook?: React.FunctionComponent | React.ReactElement | any;
    retryShield?: boolean;
}
