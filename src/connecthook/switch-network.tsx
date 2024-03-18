const switchNetworkRequest = () =>
  (window as any).ethereum.request({
    method: "wallet_switchEthereumChain",
    params: [{ chainId: "0x413190" }],
  });

const addNetworkRequest = () =>
  (window as any).ethereum.request({
    method: "wallet_addEthereumChain",
    params: [
      {
        chainId: "0x413190",
        chainName: "Kafir Chain",
        rpcUrls: ["https://froopyland.dymension.xyz/22/kafirchain_4272528-1/evmrpc"],
        blockExplorerUrls: ["https://www.kafirchain.my.id/#/kafir"],
        nativeCurrency: {
          name: "KFR",
          symbol: "uKFR",
          decimals: 18,
        },
      },
    ],
  });

export const switchNetwork = async () => {
  if (window as any) {
    try {
      await switchNetworkRequest();
    } catch (error) {
      if ((error as any).code === 4902) {
        try {
          await addNetworkRequest();
          await switchNetworkRequest();
        } catch (addError) {
          console.log(error);
        }
      }
      console.log(error);
    }
  }
};
