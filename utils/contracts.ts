import { chain } from "@/app/chain";
import { client } from "@/app/client";
import { getContract } from "thirdweb";
import { stakingABI } from "./stakingABI";

const nftContractAddress = "0xeA6573Bc72C87C59998A22d5A9a59e1AA5866Bd5";
const rewardTokenContractAddress = "0x7821C2d564045Afe5BD29e144714FD8C0b9A2077";
const stakingContractAddress = "0x92d310D490C8b4F90b3dbC9A8FaDdcAa9b49Ec51";

export const NFT_CONTRACT = getContract({
    client: client,
    chain: chain,
    address: nftContractAddress
});

export const REWARD_TOKEN_CONTRACT = getContract({
    client: client,
    chain: chain,
    address: rewardTokenContractAddress
});

export const STAKING_CONTRACT = getContract({
    client: client,
    chain: chain,
    address: stakingContractAddress,
    abi: stakingABI
});