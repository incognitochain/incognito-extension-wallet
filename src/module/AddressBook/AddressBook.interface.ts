export interface IProps {}

export interface IIncognitoAddress {}

export interface IAddressBook {
    address: string;
    name: string;
    mainnet: boolean;
    tokenId?: string;
    networkName?: string;
    rootNetworkName?: string;
    createdAt?: number;
    updatedAt?: number;
    type: number;
    isKeychain?: boolean;
}

export interface IAddressBookReducer {
    incognitoAddress: IAddressBook[];
    externalAddress: IAddressBook[];
    selected?: IAddressBook | any;
    [x: string]: any;
}

export interface IPayload {
    addressBook: IAddressBook;
}
