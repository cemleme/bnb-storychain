import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { readContract, writeContract } from "@wagmi/core";
import { InjectedConnector } from "wagmi/connectors/injected";
import { Link } from "react-router-dom";
import logo from "./assets/story_chain_logo_box.jpg";
import logoAlt from "./assets/storychain_logo_alt.jpg";
import constants from "./constants";
import abi from "./abi.json";
import BigNumber from "bignumber.js";
import axios from "axios";

function App() {
  const { address, isConnected, isConnecting, isDisconnected } = useAccount();
  const [showModal, setShowModal] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [category, setCategory] = useState(2);
  const [pageLimit, setPageLimit] = useState(0);
  const [storyAIid, setStoryAIid] = useState(0);
  const [imageAIid, setImageAIid] = useState(3);
  const [title, setTitle] = useState("");
  const { disconnect } = useDisconnect();
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });
  const [nonce, setNonce] = useState();

  const handleSubmit = async () => {
    const value = BigNumber(
      calculateCost({ category, imageAIid, storyAIid })
    ).multipliedBy(10 ** 18);
    const { hash } = await writeContract({
      mode: "recklesslyUnprepared",
      address: constants.contractAddress,
      abi: abi,
      functionName: "createStory",
      args: [
        prompt,
        title,
        category.toString(),
        pageLimit.toString(),
        storyAIid.toString(),
        imageAIid.toString(),
        false,
      ],
      overrides: {
        from: address,
        gasLimit: "3000000",
        value: value.toString(),
      },
    });
    setTitle("");
    setPrompt("");
    setShowModal(false);
  };

  const calculateCost = ({ category, storyAIid, imageAIid }) => {
    const costs = constants.costs;
    return (
      costs.fixed +
      costs.category[category] +
      costs.storyAI[storyAIid] +
      costs.imageAI[imageAIid]
    );
  };

  return (
    <>
      <div>
        {showModal && (
          <div className="modal">
            <div className="modal-content">
              <span className="close" onClick={() => setShowModal(false)}>
                &times;
              </span>
              <div>
                <div
                  id="paymentContainer"
                  name="paymentContainer"
                  className="paymentOptions"
                >
                  <label htmlFor="categoryKids">
                    <input
                      id="categoryKids"
                      name="paymentType"
                      type="radio"
                      value="2"
                      checked={category == 2}
                      onChange={() => setCategory(2)}
                    />
                    Safe for Kids
                  </label>

                  <label htmlFor="categorySFW">
                    <input
                      id="categorySFW"
                      name="paymentType"
                      type="radio"
                      value="1"
                      checked={category == 1}
                      onChange={() => setCategory(1)}
                    />
                    Safe for Work
                  </label>

                  <label htmlFor="categoryAll">
                    <input
                      id="categoryAll"
                      name="paymentType"
                      type="radio"
                      value="0"
                      checked={category == 0}
                      onChange={() => setCategory(0)}
                    />
                    General
                  </label>
                </div>
              </div>
              <br />
              <div>
                <label htmlFor="storyAI">Story Generator AI:</label>
                <select
                  id="storyAI"
                  onChange={(e) => setStoryAIid(e.target.value)}
                >
                  <option value="0" defaultValue>
                    ChatGPT v3.5
                  </option>
                  <option value="1" disabled>
                    ChatGPT v4
                  </option>
                </select>
              </div>
              <br />
              <div>
                <label htmlFor="imageAI">Image Generator AI:</label>
                <select
                  id="imageAI"
                  onChange={(e) => setImageAIid(e.target.value)}
                >
                  <option value="3" defaultValue>
                    LeonardoAI
                  </option>
                  <option value="0">Gencraft</option>
                  <option value="1">OpenJourney</option>
                  <option value="2">StableDiffusion</option>
                </select>
              </div>
              <br />
              <input
                type="text"
                placeholder="Enter Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <input
                type="text"
                placeholder="Enter theme"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
              />
              <button onClick={handleSubmit}>Submit</button>
              <div className="cost">
                Cost per page:{" "}
                {calculateCost({ category, imageAIid, storyAIid })}
              </div>
            </div>
          </div>
        )}
        <div className="sidebar">
          <a href="/" className="logoRow">
            <img className="logo" src={logo} alt="Logo" />

            <h1 className="logoTitle">
              STORY
              <br />
              <span className="logoTitleRow2">CHAIN</span>
            </h1>
          </a>
          {isConnected && (
            <div>{address.slice(0, 4) + "..." + address.slice(-4)}</div>
          )}
          {isConnected && (
            <button onClick={() => disconnect()}>Disconnect</button>
          )}
          {!isConnected && (
            <button onClick={() => connect()}>Connect Wallet</button>
          )}
          {isConnected && (
            <button onClick={() => setShowModal(true)}>Create New Story</button>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
