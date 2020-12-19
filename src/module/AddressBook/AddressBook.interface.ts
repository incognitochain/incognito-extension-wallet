export interface IProps {}

export interface IIncognitoAddress {}

export interface IAddressBook {
    address: string;
    name: string;
    networkName?: string;
    rootNetworkName?: string;
    mainnet: boolean;
    createdAt?: number;
    updatedAt?: number;
    tokenId?: string;
    type: number;
}

export interface IAddressBookReducer {
    incognitoAddress: IAddressBook[];
    externalAddress: IAddressBook[];
    [x: string]: any;
}

export interface IPayload {
    addressBook: IAddressBook;
    type: number;
}
