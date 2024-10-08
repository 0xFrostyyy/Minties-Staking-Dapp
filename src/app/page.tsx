import { ConnectEmbed } from "@/app/thirdweb";
import { client } from "./client";
import { chain } from "./chain";
import { Staking } from "../../components/Staking/Staking";
import { Staking2 } from "../../components/Staking/Staking2";
import { Staking3 } from "../../components/Staking/Staking3";

export default function Home() {
  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      margin: "20px auto",
      width: "500px",
    }}>
      <h1>ERC-721 Staking App</h1>
      <ConnectEmbed
        client={client}
        chain={chain}
      />
      <div className="flex gap-2 flex-col ixml:flex-row">
        <Staking />
        <Staking2 />
        <Staking3 />
      </div>
    </div>
  );
}
