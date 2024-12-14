'use client';

import { chain } from "@/app/chain";
import { client } from "@/app/client";
import { ConnectButton, TransactionButton, useActiveAccount, useReadContract } from "thirdweb/react";
import { StakeRewards3 } from "../StakeRewards/StakeRewards3";
import { NFT_CONTRACT_3, STAKING_CONTRACT_3 } from "../../utils/contracts";
import { NFT } from "thirdweb";
import { useEffect, useState } from "react";
import { claimTo, getNFTs, ownerOf, totalSupply } from "thirdweb/extensions/erc721";
import { NFTCard3 } from "../NFTCards/NFTCard3";
import { StakedNFTCard3 } from "../StakedNFTCards/StakedNFTCard3";

export const Staking3 = () => {
    const account = useActiveAccount();

    const [ownedNFTs, setOwnedNFTs] = useState<NFT[]>([]);

    const getOwnedNFTs = async () => {
        if (!account?.address) return;
        
        try {
            const totalNFTSupply = await totalSupply({
                contract: NFT_CONTRACT_3,
            });

            const totalSupplyNumber = parseInt(totalNFTSupply.toString());
            let ownedNFTs: NFT[] = [];

            // First check ownership for all tokens
            const ownershipPromises = [];
            for (let i = 0; i < totalSupplyNumber; i++) {
                ownershipPromises.push(
                    ownerOf({
                        contract: NFT_CONTRACT_3,
                        tokenId: BigInt(i),
                    }).catch(() => null) // Handle any errors in ownership check
                );
            }

            const owners = await Promise.all(ownershipPromises);

            // Get indices of tokens owned by the user
            const ownedIndices = owners
                .map((owner, index) => owner === account.address ? index : -1)
                .filter(index => index !== -1);

            // Only fetch NFTs that are owned by the user
            if (ownedIndices.length > 0) {
                const ownedNFTsData = await getNFTs({
                    contract: NFT_CONTRACT_3,
                    start: ownedIndices[0],
                    count: 1, // Fetch one at a time to prevent overload
                });

                ownedNFTs = ownedNFTsData;
            }

            setOwnedNFTs(ownedNFTs);
        } catch (error) {
            console.error("Error fetching owned NFTs:", error);
            setOwnedNFTs([]);
        }
    };

    useEffect(() => {
        if (account) {
            getOwnedNFTs();
        } else {
            setOwnedNFTs([]);
        }
    }, [account]);

    const {
        data: stakedInfo,
        refetch: refetchStakedInfo,
    } = useReadContract({
        contract: STAKING_CONTRACT_3,
        method: "getStakeInfo",
        params: account ? ([account.address] as const) : (() => Promise.resolve(['0x0000000000000000000000000000000000000000'] as const)),
    });

    // If not connected, show connect prompt
    if (!account) {
        return (
            <div style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                borderRadius: "8px",
                padding: "20px",
            }}
            className="text-black bg-[#EED3B1]">
                <h2>Connect your wallet to view your NFTs</h2>
                <ConnectButton client={client} />
            </div>
        );
    }

    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            borderRadius: "8px",
            padding: "20px",
        }}
        className="text-black  bg-[#EED3B1] ">
            {/* <div style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                margin: "20px 0",
                width: "100%"
            }}>
                <h2 style={{ marginRight: "20px"}}>Claim NFT to Stake</h2>
                <TransactionButton
                    transaction={() => (
                        claimTo({
                            contract: NFT_CONTRACT_3,
                            to: account?.address || "",
                            quantity: BigInt(1)
                        })
                    )}
                    onTransactionConfirmed={() => {
                        alert("NFT claimed!");
                        getOwnedNFTs();
                    }}
                    style={{
                        fontSize: "12px",
                        backgroundColor: "#333",
                        color: "#fff",
                        padding: "10px 20px",
                        borderRadius: "10px",
                    }}
                >
                    Claim NFT
                </TransactionButton>
            </div>
            <hr style={{
                width: "100%",
                border: "1px solid #333"
            }} /> */}
            <div style={{ 
                margin: "20px 0",
                width: "100%"
            }}>
                <h2>Owned NFTs  Collection 3</h2>
                <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", width: "500px"}}>
                    {ownedNFTs && ownedNFTs.length > 0 ? (
                        ownedNFTs.map((nft) => (
                            <NFTCard3
                                key={nft.id}
                                nft={nft}
                                refetch={getOwnedNFTs}
                                refecthStakedInfo={refetchStakedInfo}
                            />
                        ))
                    ) : (
                        <p>You own 0 NFTs</p>
                    )}
                </div>
            </div>
            <hr style={{
                width: "100%",
                border: "1px solid #333"
            }} />
            <div style={{ width: "100%", margin: "20px 0" }}>
                <h2>Staked NFTs</h2>
                <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", width: "500px"}}>
                    {stakedInfo && stakedInfo[0].length > 0 ? (
                        stakedInfo[0].map((nft: any, index: number) => (
                            <StakedNFTCard3
                                key={index}
                                tokenId={nft}
                                refetchStakedInfo={refetchStakedInfo}
                                refetchOwnedNFTs={getOwnedNFTs}
                            />
                        ))
                    ) : (
                        <p style={{ margin: "20px" }}>No NFTs staked</p>
                    )}
                </div>
            </div>
            <hr style={{
                width: "100%",
                border: "1px solid #333"
            }} />
            <StakeRewards3 />  
        </div>
    );
};
