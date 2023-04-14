import NoSsrWrapper from "../components/noSsrWrapper";
import { SuiWalletContextProvider } from "../context/suiWalletContextProvider";
import "../styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <NoSsrWrapper>
      <SuiWalletContextProvider>
        <Component {...pageProps} />
      </SuiWalletContextProvider>
    </NoSsrWrapper>
  );
}
