import { defineChain } from "thirdweb/chains";

export const chain = defineChain({
    id: 1329,
    rpc: 'https://sei-evm-rpc.publicnode.com/',
    nativeCurrency: {
      name: "SEI",
      symbol: "SEI", 
      decimals: 18,
    },
});

export const NETWORK = chain;