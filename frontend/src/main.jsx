import React from "react";
import ReactDOM from "react-dom/client";
import "./global.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Story from "./Story";
import Stories from "./Stories";
import { EthereumClient } from "@web3modal/ethereum";
import { Web3Modal } from "@web3modal/react";
import { WagmiConfig } from "wagmi";
import { chains, config, walletConnectProjectId } from "./wagmi";
import Header from "./components/header";
import Footer from "./components/footer";
import CreateStory from "./components/create-story";
import Landing from "./Landing";
import Nfts from "./Nfts";

const ethereumClient = new EthereumClient(config, chains);

const RootLayout = ({ children }) => {
  return (
    <div className="relative bg-black w-full overflow-hidden flex flex-col items-start justify-start text-left text-base text-white font-font sm:h-auto">
      <div className="relative bg-black w-full overflow-hidden flex flex-col items-start justify-start sm:h-auto bg-[url(/createstory@3x.png)] bg-cover bg-no-repeat bg-[top]">
        <Header />

        <div className="self-stretch flex-1 overflow-hidden flex flex-col py-[31px] px-[37px] items-center justify-start sm:pt-[5px] sm:px-2.5 sm:pb-0 sm:box-border">
          {children}
        </div>
        <Footer />
      </div>
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <RootLayout>
        <Landing />
      </RootLayout>
    ),
  },
  {
    path: "/stories",
    element: (
      <RootLayout>
        <Stories />
      </RootLayout>
    ),
  },
  // {
  //   path: "/nfts",
  //   element: (
  //     <RootLayout>
  //       <Nfts />
  //     </RootLayout>
  //   ),
  // },
  {
    path: "stories/:nonce",
    element: (
      <RootLayout>
        <Story />
      </RootLayout>
    ),
  },
  {
    path: "create",
    element: (
      <RootLayout>
        <CreateStory />
      </RootLayout>
    ),
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <WagmiConfig config={config}>
      <RouterProvider router={router} />
      <Web3Modal
        projectId={walletConnectProjectId}
        ethereumClient={ethereumClient}
        themeVariables={{
          "--w3m-accent-color": "#04837d",
          "--w3m-z-index": "200",
        }}
      />
    </WagmiConfig>
  </React.StrictMode>
);
