import { useEffect, useState } from "react";
import logo from "./assets/logo_storychain.png";
import logoBox from "./assets/story_chain_logo_box.jpg";
import logoAlt from "./assets/storychain_logo_alt.jpg";
import { useAccount } from "wagmi";
import { readContract, writeContract } from "@wagmi/core";
import { InjectedConnector } from "wagmi/connectors/injected";
import abi from "./abi.json";
import constants from "./constants";
import "./App.css";
import axios from "axios";
import { Outlet, Link } from "react-router-dom";
import BigNumber from "bignumber.js";
import BounceLoader from "react-spinners/ClipLoader";
import StoryCard from "./components/story-card";

function Stories() {
  const { address, isConnected, isConnecting, isDisconnected } = useAccount();
  const [isLoading, setIsLoading] = useState(false);
  const [pagination, setPagination] = useState(1);
  const [stories, setStories] = useState();

  useEffect(() => {
    loadStories();
    const interval = setInterval(() => {
      loadStories();
    }, 5000);
    return () => clearInterval(interval);
  }, [address]);

  const loadStories = async () => {
    setIsLoading(true);
    const calls = [];

    for (let i = 1; i < 15; i++) {
      calls.push(
        readContract({
          address: constants.contractAddress,
          abi: abi,
          functionName: "stories",
          args: [(pagination * i).toString()],
        })
      );
    }

    const _stories = await Promise.all(calls);

    const metadataCalls = [];

    let storiesToCheck = _stories.map((s) => {
      return {
        nonce: s[0],
        pages: s[1],
        pageLimit: s[2],
        category: s[3],
        creator: s[4],
        title: s[5],
        creationRejected: s[6],
        updating: s[7],
        voteFirst: s[8],
        llmId: s[9],
        imageAIid: s[10],
        imageStyleId: s[11],
      };
    });
    storiesToCheck = storiesToCheck.filter(
      (s) => s.title && !s.creationRejected
    );

    // for (let i = 0; i < storiesToCheck.length; i++) {
    //   metadataCalls.push(
    //     readContract({
    //       address: constants.contractAddress,
    //       abi: abi,
    //       functionName: "tokenURI",
    //       args: [
    //         (
    //           pagination *
    //             parseInt(storiesToCheck[i].nonce.toString()) *
    //             10000 +
    //           1
    //         ).toString(),
    //       ],
    //     })
    //   );
    // }

    // const _metadatas = await Promise.all(metadataCalls);

    // console.log("CEM _metadatas", _metadatas)

    // const imageCalls = [];

    // for (let i = 0; i < _metadatas.length; i++) {
    //   imageCalls.push(axios.get(_metadatas[i]));
    // }

    // const _images = await Promise.all(imageCalls);

    const uri = constants.greenfieldSPAddress + constants.bucketName + "/";

    const s = storiesToCheck.map((_s, i) => {
      return {
        nonce: _s.nonce.toString(),
        title: _s.title,
        pages: _s.pages.toString(),
        image: uri + (parseInt(_s.nonce) * 10000 + 1) + ".jpg",
        category: _s.category.toString(),
        imageAI: _s.imageAIid.toString(),
        imageStyle: _s.imageStyleId.toString(),
        storyAI: _s.llmId.toString(),
      };
    });

    // if (address) {
    //   _stories
    //     .filter(
    //       (s) =>
    //         s.title.length > 3 &&
    //         s.creator.toLowerCase() === address.toLowerCase() &&
    //         s.ipfs.length < 2 &&
    //         !s.creationRejected
    //     )
    //     .map((_s, i) => {
    //       s.push({
    //         nonce: _s.nonce.toString(),
    //         title: _s.title,
    //         lastPromptApproved: _s.lastPromptApproved,
    //         category: _s.category.toString(),
    //         imageAI: _s.imageAIid.toString(),
    //         storyAI: _s.llmId.toString(),
    //         ipfs: _s.ipfs,
    //       });
    //     });
    // }

    console.log(s);
    setStories(s);
    setIsLoading(false);
  };

  const calculateCost = (llmId) => {
    const costs = constants.costs;
    return parseFloat((costs.fixed + costs.storyAI[llmId]).toFixed(6));
  };

  return (
    <div>
      <div className="bodyContent">
        <div className="homeWrapper">
          <div className="storiesWrapper">
            <div className="storiesHolder">
              {isLoading && !stories && (
                <BounceLoader
                  color="#ffffff"
                  loading={isLoading}
                  size={100}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                />
              )}
              {stories &&
                stories.map((s) => (
                  <div key={s.nonce}>
                    <Link
                      to={s.image ? "/stories/" + s.nonce : "#"}
                      className="no-underline"
                    >
                      <StoryCard
                        image={s.image}
                        title={s.title}
                        pages={s.pages}
                        category={s.category}
                        storyAI={constants.storyAI[s.storyAI]}
                        imageAI={
                          constants.models[s.imageAI] +
                          " - " +
                          constants.styles[s.imageStyle]
                        }
                        cost={calculateCost(s.storyAI)}
                      />
                    </Link>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Stories;
