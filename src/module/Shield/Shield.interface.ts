export interface IProps {}

export interface IShieldReducer {
    isFetching: boolean;
    isFetched: boolean;
    data: {
        min: string;
        max: string;
        address: string;
    };
    storage: {
        guide: boolean;
    };
}
