import { w3mConnectors, w3mProvider } from "@web3modal/ethereum";
import { configureChains, createConfig } from "wagmi";
import { opBNBTestnet } from "./opbnb";

export const walletConnectProjectId = "73e93c6bff74de4d0263a88b0dd151d2";

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [opBNBTestnet],
  [w3mProvider({ projectId: walletConnectProjectId })]
);

export const config = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({
    chains,
    projectId: walletConnectProjectId,
    version: 2,
  }),
  publicClient,
  webSocketPublicClient,
});

export { chains };
