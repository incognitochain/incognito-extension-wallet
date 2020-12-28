import { ILoadingIconProps } from 'src/components/Icons/Loading';

export interface IProps {}

export interface IPTokenFromApi {
    ID: number;
    CreatedAt: string;
    UpdatedAt: string;
    DeletedAt: string;
    TokenID: string;
    Symbol: string;
    OriginalSymbol: string;
    Name: string;
    ContractID: string;
    Decimals: number;
    PDecimals: number;
    Status: number;
    Type: number;
    CurrencyType: number;
    PSymbol: string;
    Default: boolean;
    UserID: number;
    PriceUsd: number;
    Verified: boolean;
    LiquidityReward: number;
    PercentChange1h: string;
    PercentChangePrv1h: string;
    CurrentPrvPool: number;
    PricePrv: number;
    Volume24: number;
}

export interface IPToken {
    id: number;
    tokenId: string;
    symbol: string;
    pSymbol: string;
    decimals: number;
    pDecimals: number;
    currencyType: number;
    type: number;
    name: string;
    contractId: string;
    verified: boolean;
    priceUsd: number;
    pricePrv: number;
    change: string;
    pairPrv: boolean;
    default: boolean;
}

export interface IPCustomTokenFromApi {
    ID: number;
    CreatedAt: string;
    UpdatedAt: string;
    DeletedAt: string;
    TokenID: string;
    Image: string;
    IsPrivacy: string;
    Name: string;
    Symbol: string;
    OwnerAddress: string;
    OwnerName: string;
    OwnerEmail: string;
    OwnerWebsite: string;
    UserID: number;
    ShowOwnerAddress: number;
    Description: string;
    Verified: boolean;
    Amount: number;
}

export interface IPCustomToken {
    id: number;
    tokenId: string;
    symbol: string;
    name: string;
    totalSupply: number;
    verified: boolean;
    image: string;
    ownerName: string;
    ownerAddress: string;
    ownerEmail: string;
    ownerWebsite: string;
}

export interface IFollowedToken {
    tokenId: string;
    amount: number;
}

export interface ISelectedPrivacy {
    tokenId: string;
    currencyType: number;
    isToken: boolean;
    isNativeToken: boolean;
    isPrivateToken: boolean;
    isPrivateCoin: boolean;
    isPrivacyToken: boolean;
    isIncognitoToken: boolean;
    isErc20Token: boolean;
    isBep2Token: boolean;
    symbol: string;
    name: string;
    contractId: string;
    decimals: number;
    pDecimals: number;
    pSymbol: string;
    isWithdrawable: boolean;
    isDeposable: boolean;
    isDecentralized: boolean;
    isCentralized: boolean;
    incognitoTotalSupply: number;
    isVerified: boolean;
    iconUrl: string;
    priceUsd: number;
    pricePrv: number;
    change: string;
    isFollowed: boolean;
    amount: number;
    formatAmount: string;
    formatPriceByUsd: string;
    formatBalanceByUsd: string;
    formatPriceByPrv: string;
    formatBalanceByPrv: string;
    networkName: string;
    rootNetworkName: string;
    ownerName: string;
    ownerAddress: string;
    ownerEmail: string;
    ownerWebsite: string;
    default: boolean;
}

export interface IBalanceProps {
    tokenId: string;
}
export interface IAmountProps {
    tokenId: string;
}

export interface ITotalShielded {
    formatTotalAmountPRV: string;
    formatTotalAmountUSD: string;
}

export interface ITokenProps {
    tokenId: string;
    handleSelectToken?: () => void;
    showAmount?: boolean;
    showBalance?: boolean;
    showFollowed?: boolean;
}
export interface ITokenChildProps {
    tokenId: string;
    classNameCustom?: string;
    classNameTextCustom?: string;
    showVerifiedToken?: boolean;
    loadingIconProps?: ILoadingIconProps;
    showSymbol?: boolean;
}

interface ITokensFactories {
    data: ISelectedPrivacy[];
    visible: boolean;
}
export interface IAllListTokenInner {
    tokensFactories: ITokensFactories[];
    // eslint-disable-next-line no-unused-vars
    onToggleUnVerifiedTokens: (toggle: boolean) => void;
    toggleUnVerified: boolean;
    // eslint-disable-next-line no-unused-vars
    renderItem: (tokenId: string) => any;
}
