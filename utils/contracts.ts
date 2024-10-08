import { chain } from "@/app/chain";
import { client } from "@/app/client";
import { getContract } from "thirdweb";
import { stakingABI } from "./stakingABI";

// Contract addresses for NFT collections
const nftContractAddress1 = "0xeA6573Bc72C87C59998A22d5A9a59e1AA5866Bd5";
const nftContractAddress2 = "0xAe55F2e2f7c03839d107588E76193f1860de6A55";
const nftContractAddress3 = "0x12a027eC4ff2813266F4D20E4C637Cb65bf828bc";

// Reward token contract remains the same for all collections
const rewardTokenContractAddress = "0x7821C2d564045Afe5BD29e144714FD8C0b9A2077";

// Staking contract addresses for each collection
const stakingContractAddress1 = "0x92d310D490C8b4F90b3dbC9A8FaDdcAa9b49Ec51";
const stakingContractAddress2 = "0x4f3E119cBde68E8Ac6889feFfb707e2C07c92dec";
const stakingContractAddress3 = "0x112Fa76DABe931a3c69E6D1372DCcf8a4409F1d1";

// First Collection
export const NFT_CONTRACT_1 = getContract({
    client: client,
    chain: chain,
    address: nftContractAddress1
});
export const STAKING_CONTRACT_1 = getContract({
    client: client,
    chain: chain,
    address: stakingContractAddress1,
    abi: stakingABI
});

// Second Collection
export const NFT_CONTRACT_2 = getContract({
    client: client,
    chain: chain,
    address: nftContractAddress2
});
export const STAKING_CONTRACT_2 = getContract({
    client: client,
    chain: chain,
    address: stakingContractAddress2,
    abi: stakingABI
});

// Third Collection
export const NFT_CONTRACT_3 = getContract({
    client: client,
    chain: chain,
    address: nftContractAddress3
});
export const STAKING_CONTRACT_3 = getContract({
    client: client,
    chain: chain,
    address: stakingContractAddress3,
    abi: stakingABI
});

// Reward Token
export const REWARD_TOKEN_CONTRACT = getContract({
    client: client,
    chain: chain,
    address: rewardTokenContractAddress
});
