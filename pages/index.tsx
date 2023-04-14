import React, { useEffect, useMemo, useState } from "react";
import { ConnectButton, ConnectModal, useWalletKit } from "@mysten/wallet-kit";

type WalletAdapter = MockWalletAdaptor | KitWalletAdapter;

type MockWalletAdaptor = {
  name: string;
  icon: string;
  installUrl: string;
};

type WalletAdapters = ReturnType<typeof useWalletKit>["wallets"];
type KitWalletAdapter = WalletAdapters extends Array<infer U> ? U : never;

const defaultWallets = [
  {
    name: "Sui Wallet",
    icon: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNzIiIGhlaWdodD0iNzIiIHZpZXdCb3g9IjAgMCA3MiA3MiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjcyIiBoZWlnaHQ9IjcyIiByeD0iMTYiIGZpbGw9IiM2RkJDRjAiLz4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0yMC40MjEzIDUyLjc4MzhDMjMuNjQ5NiA1OC4zNzYgMjkuNDMyMSA2MS43MTQyIDM1Ljg4ODggNjEuNzE0MkM0Mi4zNDU1IDYxLjcxNDIgNDguMTI3IDU4LjM3NiA1MS4zNTY0IDUyLjc4MzhDNTQuNTg0OCA0Ny4xOTI2IDU0LjU4NDggNDAuNTE2MyA1MS4zNTY0IDM0LjkyNEwzNy43NTI0IDExLjM2MTVDMzYuOTI0MSA5LjkyNzAxIDM0Ljg1MzUgOS45MjcwMSAzNC4wMjUzIDExLjM2MTVMMjAuNDIxMyAzNC45MjRDMTcuMTkyOSA0MC41MTUyIDE3LjE5MjkgNDcuMTkxNSAyMC40MjEzIDUyLjc4MzhaTTMyLjA1NjYgMjIuNTcxM0wzNC45NTcxIDE3LjU0NzRDMzUuMzcxMiAxNi44MzAxIDM2LjQwNjUgMTYuODMwMSAzNi44MjA2IDE3LjU0NzRMNDcuOTc5MSAzNi44NzQ4QzUwLjAyOTEgNDAuNDI1NCA1MC40MTM5IDQ0LjUzNSA0OS4xMzM1IDQ4LjI5NTRDNDkuMDAwMiA0Ny42ODE5IDQ4LjgxMzggNDcuMDU0MiA0OC41NjI2IDQ2LjQyMDFDNDcuMDIxMyA0Mi41MzA0IDQzLjUzNjMgMzkuNTI4OSAzOC4yMDIzIDM3LjQ5ODJDMzQuNTM1MSAzNi4xMDcxIDMyLjE5NDMgMzQuMDYxMyAzMS4yNDMxIDMxLjQxNzFDMzAuMDE4IDI4LjAwODkgMzEuMjk3NiAyNC4yOTI0IDMyLjA1NjYgMjIuNTcxM1pNMjcuMTEwNyAzMS4xMzc5TDIzLjc5ODYgMzYuODc0OEMyMS4yNzQ4IDQxLjI0NTkgMjEuMjc0OCA0Ni40NjQxIDIzLjc5ODYgNTAuODM1M0MyNi4zMjIzIDU1LjIwNjQgMzAuODQxMyA1Ny44MTUgMzUuODg4OCA1Ny44MTVDMzkuMjQxMyA1Ny44MTUgNDIuMzYxNSA1Ni42NjMzIDQ0LjgxODQgNTQuNjA4OEM0NS4xMzg4IDUzLjgwMjEgNDYuMTMxIDUwLjg0OTIgNDQuOTA1MiA0Ny44MDU4QzQzLjc3MyA0NC45OTU0IDQxLjA0ODIgNDIuNzUxOSAzNi44MDYxIDQxLjEzNkMzMi4wMTEgMzkuMzE3MSAyOC44OTU4IDM2LjQ3NzQgMjcuNTQ4NiAzMi42OTg0QzI3LjM2MzEgMzIuMTc4MSAyNy4yMTg5IDMxLjY1NjggMjcuMTEwNyAzMS4xMzc5WiIgZmlsbD0id2hpdGUiLz4KPC9zdmc+",
    installUrl: "https://chrome.google.com/webstore/detail/sui-wallet/opcgpfmipidbgpenhmajoajpbobppdil",
  },
  {
    name: "Martian Sui Wallet",
    icon: "https://cdn.martianwallet.xyz/assets/icon.png",
    installUrl: "https://chrome.google.com/webstore/detail/martian-wallet-aptos-sui/efbglgofoippbgcjepnhiblaibcnclgk",
  },
  {
    name: "Ethos Wallet",
    icon: "https://lh3.googleusercontent.com/sjAblpSmNkgFLXr_7rfX0j3JdSAOOU7BgNX6f69ugksyaMPBzfjA1hMMtxbiyZE-oMlUs4Zf-XIA_xWJA7r0oyD3sDE=w128-h128-e365-rj-sc0x00ffffff",
    installUrl: "https://chrome.google.com/webstore/detail/ethos-sui-wallet/mcbigmjiafegjnnogedioegffbooigli/related",
  },
];

const Home: React.FC = () => {
  const { currentAccount, disconnect, wallets: walletsFromKit, connect, isError, isConnected } = useWalletKit();

  const wallets: WalletAdapter[] = useMemo(() => {
    if (walletsFromKit.length > 0) {
      const walletsFromKitNames = walletsFromKit.map((wallet) => wallet.name);
      const notInWallets = defaultWallets.filter((wallet) => !walletsFromKitNames.includes(wallet.name));
      return [...walletsFromKit, ...notInWallets];
    }
    return defaultWallets;
  }, [walletsFromKit]);

  const walletAdapterValidator = (wallet: WalletAdapter): wallet is WalletAdapter => {
    return (wallet as MockWalletAdaptor).installUrl === undefined;
  };

  return (
    <div>
      {!isConnected && wallets?.length > 0
        ? wallets.map((wallet: any) => (
            <button
              key={wallet.name}
              onClick={() => (walletAdapterValidator(wallet) ? connect(wallet.name) : window.open(wallet.installUrl))}
            >
              <img src={wallet.icon} />
              <div>{wallet.name}</div>
            </button>
          ))
        : null}
      {isConnected ? <button onClick={disconnect}>Disconnect</button> : null}
    </div>
  );
};
export default Home;
