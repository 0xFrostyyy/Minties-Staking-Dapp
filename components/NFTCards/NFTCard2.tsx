import { client } from "@/app/client";
import { NFT, prepareContractCall } from "thirdweb";
import { MediaRenderer, TransactionButton } from "thirdweb/react";
import { NFT_CONTRACT_2, STAKING_CONTRACT_2 } from "../../utils/contracts";
import { useState } from "react";
import { approve } from "thirdweb/extensions/erc721";

type OwnedNFTsProps = {
    nft: NFT;
    refetch: () => void;
    refecthStakedInfo: () => void;
};

export const NFTCard2 = ({ nft, refetch, refecthStakedInfo }: OwnedNFTsProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isApproved, setIsApproved] = useState(false);

    return (
        <div style={{ margin: "10px" }}>
            {nft.metadata.image ? (
                <MediaRenderer
                    client={client}
                    src={nft.metadata.image}
                    style={{
                        borderRadius: "10px",
                        marginBottom: "10px",
                        height: "200px",
                        width: "200px"
                    }}
                />
            ) : (
                <div style={{
                    borderRadius: "10px",
                    marginBottom: "10px",
                    height: "200px",
                    width: "200px",
                    backgroundColor: "#f0f0f0",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: "10px",
                    textAlign: "center"
                }}>
                    <p style={{ margin: 0, fontSize: "14px", color: "#666" }}>
                        Image temporarily unavailable
                    </p>
                    <p style={{ margin: "5px 0", fontSize: "12px", color: "#888" }}>
                        Network issues fetching metadata
                    </p>
                    <p style={{ margin: 0, fontSize: "12px", color: "#888" }}>
                        NFT can still be staked/unstaked
                    </p>
                </div>
            )}
            <p style={{ margin: "0 10px 10px 10px"}}>
                {nft.metadata.name || `Token ID: ${nft.id}`}
            </p>
            <button
                onClick={() => setIsModalOpen(true)}
                style={{
                    border: "none",
                    backgroundColor: "#4D8B31",
                    color: "#000",
                    padding: "10px",
                    borderRadius: "10px",
                    cursor: "pointer",
                    width: "100%"
                }}
            >Stake</button>
            {isModalOpen && (
                <div style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    zIndex: "2"
                }}>
                    <div style={{
                        minWidth: "300px",
                        backgroundColor: "#222",
                        padding: "20px",
                        borderRadius: "10px",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center"
                    }}
                    className="!bg-[#EED3B1]"
                    >
                        <div style={{
                            display: "flex",
                            justifyContent: "flex-end",
                            width: "100%"
                        }}>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                style={{
                                    border: "none",
                                    backgroundColor: "transparent",
                                    color: "#000",
                                    cursor: "pointer"
                                }}
                            >Close</button>
                        </div>
                        <h3 style={{ margin: "10px 0" }} className="text-black">You about to stake:</h3>
                        {nft.metadata.image ? (
                            <MediaRenderer
                                client={client}
                                src={nft.metadata.image}
                                style={{
                                    borderRadius: "10px",
                                    marginBottom: "10px"
                                }}
                            />
                        ) : (
                            <div style={{
                                borderRadius: "10px",
                                marginBottom: "10px",
                                height: "200px",
                                width: "200px",
                                backgroundColor: "#f0f0f0",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "center",
                                padding: "10px",
                                textAlign: "center"
                            }}>
                                <p style={{ margin: 0, fontSize: "14px", color: "#666" }}>
                                    Image temporarily unavailable
                                </p>
                                <p style={{ margin: "5px 0", fontSize: "12px", color: "#888" }}>
                                    Network issues fetching metadata
                                </p>
                                <p style={{ margin: 0, fontSize: "12px", color: "#888" }}>
                                    NFT can still be staked/unstaked
                                </p>
                            </div>
                        )}
                        {!isApproved ? (
                           <TransactionButton
                                transaction={() => approve({
                                    contract: NFT_CONTRACT_2,
                                    to: STAKING_CONTRACT_2.address as `0x${string}`,
                                    tokenId: nft.id
                                })}
                                unstyled
                                className="w-full bg-[#4D8B31] text-black rounded px-4 py-2 hover:opacity-90"
                                onTransactionConfirmed={() => setIsApproved(true)}
                            >
                                Approve
                            </TransactionButton>
                        ) : (
                            <TransactionButton
                                transaction={() => (
                                    prepareContractCall({
                                        contract: STAKING_CONTRACT_2,
                                        method: "stake",
                                        params: [[nft.id]]
                                    })
                                )}
                                onTransactionConfirmed={() => {
                                    alert("Staked!");
                                    setIsModalOpen(false);
                                    refetch();
                                    refecthStakedInfo();
                                }}
                                style={{
                                    width: "100%"
                                }}
                                unstyled
                                className="w-full bg-[#4D8B31] text-black rounded px-4 py-2 hover:opacity-90"
                            >Stake</TransactionButton>
                        )}
                        
                    </div>
                </div>
            )}
        </div>
    )
};