import React, { useEffect, useMemo } from "react";

import { ConnectButton, ConnectModal, useWalletKit } from "@mysten/wallet-kit";

const Home: React.FC = () => {
  const { currentAccount, disconnect, wallets, connect, isError } = useWalletKit();
  const x = useMemo(() => wallets.map((wallet) => wallet.name).join(""), []);

  return (
    <div>
      <div>{x}</div>
      <button onClick={() => console.log(x)}>Connect</button>
      {/* <h1>Notifi Card: Sui</h1> */}
      {/* {wallets?.length > 0 ? (
        // ? wallets.map((wallet) => (
        //     <button key={wallet.name} onClick={() => connect(wallet.name)}>
        //       <img src={wallet.icon} />
        //       <div>{wallet.name}</div>
        //     </button>
        //   ))
        <>{JSON.stringify(wallets)}</>
      ) : null} */}
    </div>
  );
};
export default Home;
