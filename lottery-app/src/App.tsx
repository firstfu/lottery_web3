import { ConnectWallet, useContract, Web3Button, useAddress } from "@thirdweb-dev/react";

import "./styles/Home.css";
import React from "react";
import { ethers } from "ethers";

export default function Home() {
  const LOTTERY_CONTRACT_ADDRESS = "0x165fCbE9e765Fee6824Cc6cEa92949B2EA04a28e";

  const { contract } = useContract(LOTTERY_CONTRACT_ADDRESS);
  const address = useAddress();

  console.log("🚀 ~ file: App.jsx:12 ~ Home ~ address:", address);
  console.log("🚀 ~ file: App.jsx:11 ~ Home ~ contract:", contract);

  return (
    <main className="main">
      <div className="container">
        {/* header */}
        <div className="header">
          <h1 className="title">
            Welcome to <span className="gradient-text-0">Lottery</span>
          </h1>

          <div className="connect">
            <ConnectWallet
              dropdownPosition={{
                side: "bottom",
                align: "center",
              }}
            />
          </div>
        </div>

        {/* body */}
        <div className="row">
          <div className="col-sm-4">
            {/* box */}
            <div className="box flex-justify flex-column">
              <div className="title">合約發起者具有開獎資格</div>
              <div className="number mt-3">
                <Web3Button
                  contractAddress={LOTTERY_CONTRACT_ADDRESS}
                  action={async () => {
                    const tx = await contract?.call("pickWinner", [], {});
                    console.log("tx:", tx);
                  }}
                  onSuccess={() => {
                    alert("開獎成功");
                  }}
                  onError={(error: any) => {
                    console.log("error:", error);
                    alert("開獎失敗");
                  }}
                >
                  開獎
                </Web3Button>

                <div className="mt-2">
                  <Web3Button
                    contractAddress={LOTTERY_CONTRACT_ADDRESS}
                    action={async () => {
                      const tx = await contract?.call("enter", [], {
                        value: ethers.utils.parseEther("0.01"),
                      });
                      console.log("tx:", tx);
                    }}
                    onSuccess={() => {
                      alert("參加成功");
                    }}
                    onError={(error: any) => {
                      console.log("error:", error);
                      alert("參加失敗");
                    }}
                  >
                    參加樂透0.01ETH
                  </Web3Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
