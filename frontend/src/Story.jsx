import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAccount, useConnect, useContractRead, useDisconnect } from "wagmi";
import { readContract, writeContract } from "@wagmi/core";
import { InjectedConnector } from "wagmi/connectors/injected";
import "./Book.css";
import abi from "./abi.json";
import constants from "./constants";
import axios from "axios";
import BigNumber from "bignumber.js";
import BounceLoader from "react-spinners/ClipLoader";
import Book from "./components/Book";

const modelToIsLandscape = {
  1: true,
};

const storyCache = {};

function Story() {
  const { nonce } = useParams();
  const [title, setTitle] = useState("");
  const [pageCost, setPageCost] = useState();
  const [storyPage, setStoryPage] = useState();
  const [currentPage, setCurrentPage] = useState(0);
  const [numPages, setNumPages] = useState(0);
  const [updating, setUpdating] = useState(false);
  const [isLandscape, setIsLandscape] = useState(false);
  const [goToLastPage, setGoToLastPage] = useState(false);

  useEffect(() => {
    loadStory();
    const interval = setInterval(() => {
      loadStory();
    }, 5000);
    return () => clearInterval(interval);
  }, [currentPage]);

  const loadStory = async () => {
    console.log("loading story...");
    const s = await readContract({
      address: constants.contractAddress,
      abi: abi,
      functionName: "stories",
      args: [nonce],
    });

    const data = {
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

    const _numPages = parseInt(data.pages.toString());
    setNumPages(_numPages);

    setIsLandscape(modelToIsLandscape[data.imageAIid]);
    setUpdating(data.updating);
    console.log("Story updating", data.updating);

    let lastPage = data.updating ? _numPages : _numPages - 1;
    if (goToLastPage) {
      setCurrentPage(lastPage);
    }
    const pageNo = goToLastPage ? lastPage : currentPage;

    const nftId = parseInt(data.nonce) * 10000 + pageNo + 1;
    let storyData = storyCache[nftId];

    if (!storyCache[nftId]) {
      const uri = constants.greenfieldSPAddress + constants.bucketName + "/";
      storyData = await axios.get(`${uri}${nftId}.json`);
      if (storyData.data && storyData.data.description)
        storyCache[nftId] = storyData;
    }

    setTitle(data.title);
    setStoryPage(storyData.data);
    setPageCost(
      BigNumber(
        calculateCost({
          llmId: data.llmId.toString(),
        })
      )
        .multipliedBy(10 ** 18)
        .toString()
    );
  };

  const handleGoToPrevPage = () => {
    setGoToLastPage(false);
    setCurrentPage((prev) => prev - 1);
  };

  const handleGoToNextPage = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const handleGoToLastPage = () => {
    setGoToLastPage(true);
    if (updating) setCurrentPage(numPages);
    else setCurrentPage(numPages - 1);
  };

  const calculateCost = ({ llmId }) => {
    const costs = constants.costs;
    return costs.fixed + costs.imageAI + costs.storyAI[llmId];
  };

  return (
    <>
      {storyPage && (
        <div id="wrapper">
          <div id="container">
            <section className="open-book">
              <header />
              <Book
                title={title}
                pageNo={currentPage + 1}
                totalPages={numPages}
                body={storyPage?.description}
                image={storyPage?.image}
                author={storyPage?.author || ""}
                landscape={isLandscape}
                updating={updating}
                nonce={nonce}
                cost={pageCost}
                metadata={`${constants.greenfieldSPAddress}${
                  constants.bucketName
                }/${nonce * 10000 + currentPage + 1}.json`}
                goToNextPage={handleGoToNextPage}
                goToPrevPage={handleGoToPrevPage}
                goToFirstPage={() => setCurrentPage(0)}
                goToLastPage={handleGoToLastPage}
              />
              <footer />
            </section>
          </div>
        </div>
      )}
    </>
  );
}

export default Story;
