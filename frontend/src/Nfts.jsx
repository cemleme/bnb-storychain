import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { readContract, writeContract, waitForTransaction } from "@wagmi/core";
import abi from "./abi.json";
import constants from "./constants";
import "./App.css";
import axios from "axios";
import NftCard from "./components/nft-card";

function Nfts() {
  const { address, isConnected, isConnecting, isDisconnected } = useAccount();
  const [isLoading, setIsLoading] = useState(false);
  const [userNfts, setUserNfts] = useState([]);

  const loadL1Metadata = async (id) => {
    try {
      const [owner, uri] = await Promise.all([
        readContract({
          address: constants.contractLayer1,
          abi: abi,
          functionName: "ownerOf",
          chainId: 5,
          args: [id],
        }),
        readContract({
          address: constants.contractLayer1,
          abi: abi,
          functionName: "tokenURI",
          chainId: 5,
          args: [id],
        }),
      ]);
      console.log("goerli", owner);
      if (owner != address) {
        console.log("owner changed");
      }
      if (uri) {
        const md = await axios.get(uri);
        console.log("goerli", md);
        return { ...md.data, metadata: uri, id, network: "Goerli" };
      }
    } catch (err) {
      return null;
    }
  };

  const loadMetadata = async (id) => {
    try {
      const [owner, uri] = await Promise.all([
        readContract({
          address: constants.contractAddress,
          abi: abi,
          functionName: "ownerOf",
          args: [id],
        }),
        readContract({
          address: constants.contractAddress,
          abi: abi,
          functionName: "tokenURI",
          args: [id],
        }),
      ]);
      console.log(owner);
      if (owner != address) {
        console.log("owner changed");
        const md = await loadL1Metadata(id);
        return md;
      }
      if (uri) {
        const md = await axios.get(uri);
        return { ...md.data, metadata: uri, id, network: "zkEVM Testnet" };
      }
    } catch (err) {
      return null;
    }
  };

  useEffect(() => {
    const load = async () => {
      const nfts = await axios({
        method: "POST",
        url: "https://opbnb-testnet.nodereal.io/v1/9ef8cce7d3bd415ebb9c435d4ea55a37",
        headers: {
          accept: "application/json",
          "content-type": "application/json",
        },
        data: {
          id: 1,
          jsonrpc: "2.0",
          method: "eth_getLogs",
          params: [
            {
              fromBlock: "0x4E471A",
              toBlock: "0x4EE35A",
              address: ["0x513F837aF2d69adCfb47F114D3a1A9f8A27aD680"],
              // topics: [
              //   "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef",
              //   "0x0000000000000000000000000000000000000000000000000000000000000000",
              //   address.replace("0x", "0x000000000000000000000000"),
              // ],
            },
          ],
        },
      });

      console.log(nfts.data);

      // const n = [];

      // for (let i = 0; i < nfts.data.result.length; i++) {
      //   const nft = nfts.data.result[i];
      //   const id = parseInt(nft.topics[3].toString());
      //   //userNfts.push(id);
      //   const nftData = await loadMetadata(id);
      //   if (nftData) {
      //     n.push(nftData);
      //     console.log(nftData);
      //   } else {
      //     console.log("id not available on zkEvm Testnet");
      //   }
      // }

      // setUserNfts(n);
    };
    load();
  }, []);

  const LoadNfts = async () => {
    setIsLoading(true);
    const calls = [];
    setIsLoading(false);
  };

  return (
    <div>
      <div className="bodyContent">
        <div className="homeWrapper">
          <div className="storiesWrapper">
            {/* <StoryFilter /> */}
            <div className="storiesHolder">
              {userNfts.map((s) => (
                <NftCard
                  key={s.name}
                  image={s.image}
                  title={s.name}
                  id={s.id}
                  metadata={s.metadata}
                  network={s.network}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Nfts;
