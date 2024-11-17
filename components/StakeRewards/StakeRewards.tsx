import { TransactionButton, useActiveAccount, useReadContract } from "thirdweb/react";
import { REWARD_TOKEN_CONTRACT, STAKING_CONTRACT_1 } from "../../utils/contracts";
import { prepareContractCall, toEther } from "thirdweb";
import { useEffect } from "react";
import { balanceOf } from "thirdweb/extensions/erc721";

export const StakeRewards = () => {
    const account = useActiveAccount();

    // Ensure that even when accountAddress is not available, we pass a fallback value
    const accountAddress = account?.address || '0x0000000000000000000000000000000000000000'; // Fallback value

    // Fetch the token balance, pass a valid fallback address when accountAddress is not available
    const {
        data: tokenBalance,
        isLoading: isTokenBalanceLoading,
        refetch: refetchTokenBalance,
    } = useReadContract({
        contract: REWARD_TOKEN_CONTRACT,
        method: "balanceOf",
        params: [accountAddress], // Always pass a valid address, even if it's a fallback
    });

    // Fetch the staked information, pass a valid fallback address when accountAddress is not available
    const {
        data: stakedInfo,
        refetch: refetchStakedInfo,
    } = useReadContract({
        contract: STAKING_CONTRACT_1,
        method: "getStakeInfo",
        params: [accountAddress], // Always pass a valid address, even if it's a fallback
    });

    // Refresh the stake info periodically, but only when the real account address is available
    useEffect(() => {
        if (account?.address) {
            refetchStakedInfo();
            const interval = setInterval(() => {
                refetchStakedInfo();
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [account?.address, refetchStakedInfo]);

    return (
        <div style={{ width: "100%", margin: "20px 0", display: "flex", flexDirection: "column" }}>
            {/* Show token balance only if it's not loading and the balance exists */}
            {!isTokenBalanceLoading && tokenBalance && (
                <p>Wallet Balance: {toEther(BigInt(tokenBalance.toString()))}</p>
            )}
            <h2 style={{ marginBottom: "20px" }}>
                Stake Rewards: {stakedInfo && toEther(BigInt(stakedInfo[1]?.toString() || '0'))}
            </h2>
            {/* Claim rewards button */}
            <TransactionButton
                transaction={() => {
                    if (!account?.address) {
                        throw new Error("Account address is undefined");
                    }
                    return prepareContractCall({
                        contract: STAKING_CONTRACT_1,
                        method: "claimRewards",
                    });
                }}
                onTransactionConfirmed={() => {
                    alert("Rewards claimed!");
                    refetchStakedInfo();
                    refetchTokenBalance();
                }}
                style={{
                    border: "none",
                    backgroundColor: "#B0FE76",
                    color: "#000",
                    padding: "10px",
                    borderRadius: "10px",
                    cursor: "pointer",
                    width: "100%",
                    fontSize: "12px"
                }}
            >
                Claim Rewards
            </TransactionButton>
        </div>
    );
};
