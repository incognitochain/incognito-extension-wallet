export const connectMetamask = async (ethereum: any) => {
    return (await ethereum.request({ method: 'eth_requestAccounts' })) || [];
};
