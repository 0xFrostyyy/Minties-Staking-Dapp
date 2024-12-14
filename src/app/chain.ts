import { defineChain } from "thirdweb/chains";

export const chain = defineChain({
    id: 1329,
    rpc: 'https://evm-rpc.sei-apis.com',
    nativeCurrency: {
      name: "SEI",
      symbol: "SEI", 
      decimals: 18,
    },
});

export const NETWORK = chain;