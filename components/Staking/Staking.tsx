'use client';

import { chain } from "@/app/chain";
import { client } from "@/app/client";
import { ConnectButton, TransactionButton, useActiveAccount, useReadContract } from "thirdweb/react";
import { StakeRewards } from "../StakeRewards/StakeRewards";
import { NFT_CONTRACT_1, STAKING_CONTRACT_1 } from "../../utils/contracts";
import { NFT } from "thirdweb";
import { useEffect, useState } from "react";
import { claimTo, getNFTs, ownerOf, totalSupply } from "thirdweb/extensions/erc721";
import { NFTCard } from "../NFTCards/NFTCard";
import { StakedNFTCard } from "../StakedNFTCards/StakedNFTCard";

export const Staking = () => {
    const account = useActiveAccount();

    const [ownedNFTs, setOwnedNFTs] = useState<NFT[]>([]);

    const getOwnedNFTs = async () => {
        let ownedNFTs: NFT[] = [];

        const totalNFTSupply = await totalSupply({
            contract: NFT_CONTRACT_1,
        });
        const nfts = await getNFTs({
            contract: NFT_CONTRACT_1,
            start: 0,
            count: parseInt(totalNFTSupply.toString()),
        });
        
        for (let nft of nfts) {
            const owner = await ownerOf({
                contract: NFT_CONTRACT_1,
                tokenId: nft.id,
            });
            if (owner === account?.address) {
                ownedNFTs.push(nft);
            }
        }
        setOwnedNFTs(ownedNFTs);
    };
    
    useEffect(() => {
        if (account) {
            getOwnedNFTs();
        }
    }, [account]);

    // Call useReadContract with a fallback empty string for the address
    const {
        data: stakedInfo,
        refetch: refetchStakedInfo,
    } = useReadContract({
        contract: STAKING_CONTRACT_1,
        method: "getStakeInfo",
        params: [account?.address || "0x0000000000000000000000000000000000000000"],  // Fallback to a placeholder address
    });

   

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
                            contract: NFT_CONTRACT_1,
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
                <h2>Owned NFTs Collection 1</h2>
                <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
                    {ownedNFTs && ownedNFTs.length > 0 ? (
                        ownedNFTs.map((nft) => (
                            <NFTCard
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
                            <StakedNFTCard
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
            <StakeRewards />  
        </div>
    );
};

