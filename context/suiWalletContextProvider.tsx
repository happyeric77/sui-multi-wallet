import { PropsWithChildren } from "react";

import { WalletKitProvider } from "@mysten/wallet-kit";

export const SuiWalletContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
  // const adapters = useMemo(
  //   () => [
  //     new WalletStandardAdapterProvider(),
  //   ],
  //   [],
  // );
  return (
    <>
      <WalletKitProvider /*adapters={adapters as any}*/>{children}</WalletKitProvider>
    </>
  );
};
