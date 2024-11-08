import { ConnectEmbed } from "@/app/thirdweb";
import { client } from "./client";
import { chain } from "./chain";
import { Staking } from "../../components/Staking/Staking";
import { Staking2 } from "../../components/Staking/Staking2";
import { Staking3 } from "../../components/Staking/Staking3";
import { ConnectButton, TransactionButton, useActiveAccount, useReadContract } from "thirdweb/react";

export default function Home() {
  return (
    <div className="flex flex-col gap-3 items-center bg-[#B0FE76]">
      <h1 className="text-black">ERC-721 Staking App</h1>
      <ConnectButton
          client={client}
          chain={chain}
      />
      <div className="grid grid-cols-1 lg:grid-cols-2 xxl:grid-cols-3 gap-3">
        <Staking />
        <Staking2 />
        <Staking3 />
      </div>
    </div>
  );
}
