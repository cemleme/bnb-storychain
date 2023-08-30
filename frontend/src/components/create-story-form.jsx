import { useEffect, useState } from "react";
import { readContract, writeContract, waitForTransaction } from "@wagmi/core";
import { useAccount } from "wagmi";
import abi from "../abi.json";
import constants from "../constants";
import { useNavigate } from "react-router-dom";

import { useCallback } from "react";

const CreateStoryForm = ({ model, style, setModel, setStyle }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState(false);
  const [pageLimit, setPageLimit] = useState("0");
  const [llmId, setLlmId] = useState(0);
  const [voteFirst, setVoteFirst] = useState(false);
  const { address, isConnected } = useAccount();

  const createStory = async () => {
    //validate first
    const costData = await readContract({
      address: constants.contractAddress,
      abi,
      functionName: "calculateCost",
      args: [llmId.toString()],
    });

    console.log("costData", costData.toString());

    const categoryId = category ? "0" : "1";

    const { hash } = await writeContract({
      mode: "recklesslyUnprepared",
      address: constants.contractAddress,
      abi: abi,
      functionName: "createStory",
      args: [
        prompt,
        title,
        categoryId,
        pageLimit.toString(),
        llmId.toString(),
        model.toString(),
        style.toString(),
        voteFirst,
      ],
      value: costData.toString(),
    });
    if (hash) setLoading(true);
    else return;

    console.log(hash);

    const data = await waitForTransaction({
      hash,
    });

    console.log(data);

    setLoading(false);

    navigate("/stories", { replace: true });
  };

  return (
    <div className="w-[700px] flex flex-col items-center justify-center gap-[25px] text-left text-base text-white font-font md:self-stretch md:w-auto md:pl-[30px] md:pr-[30px] md:box-border sm:pl-2.5 sm:pr-2.5 sm:box-border">
      <div className="self-stretch flex flex-row items-start justify-start gap-[24px]">
        <div className="self-stretch flex-1 rounded-lg flex flex-row py-4 px-3.5 items-start justify-start gap-[8px] border-[1px] border-solid border-border-color sm:flex-col">
          <div className="relative leading-[160%] text-silver">Languge AI:</div>
          <select
            onChange={(e) => setLlmId(e.target.value)}
            className="self-stretch flex-1 rounded-lg cursor-pointer"
          >
            <option value="0">ChatGPT v3.5</option>
            <option value="1">ChatGPT v4</option>
          </select>
        </div>
        <div className="self-stretch flex flex-row items-center justify-start">
          <input
            className="cursor-pointer flex flex-row p-2 items-start justify-start"
            type="checkbox"
            checked={category}
            onChange={() => setCategory((prev) => !prev)}
          />
          <div className="relative leading-[160%] text-silver">
            Children’s Story?
          </div>
        </div>
      </div>
      <div className="self-stretch flex flex-row items-start justify-start gap-[24px]">
        <div className="self-stretch flex-1 rounded-lg flex flex-row py-4 px-3.5 items-start justify-start gap-[8px] border-[1px] border-solid border-border-color sm:flex-col">
          <div className="relative leading-[160%] text-silver">
            Image AI Model:
          </div>
          <select
            className="self-stretch flex-1 rounded-lg cursor-pointer"
            onChange={(e) => setModel(e.target.value)}
          >
            <option value="1">SDXL</option>
            <option value="0">DreamShaper</option>
            <option value="2">Anime Pastel</option>
            <option value="3">3D Animation</option>
            <option value="4">RPG</option>
            <option value="5">Pixel Art</option>
            <option value="6">Deliberate</option>
          </select>
        </div>
        <div className="self-stretch flex-1 rounded-lg flex flex-row py-4 px-3.5 items-start justify-start gap-[8px] border-[1px] border-solid border-border-color sm:flex-col">
          <div className="relative leading-[160%] text-silver">
            Image AI Style:
          </div>
          <select
            className="self-stretch flex-1 rounded-lg cursor-pointer"
            onChange={(e) => setStyle(e.target.value)}
          >
            <option value="0">Regular</option>
            <option value="1">Colored Sketch</option>
            <option value="2">B&W Sketch</option>
            <option value="3">Anime</option>
            <option value="4">3D Render</option>
            <option value="5">Children's Book Illustration</option>
            <option value="6">Illustration</option>
            <option value="7">Photography</option>
            <option value="8">Retro</option>
            <option value="9">Realistic</option>
            <option value="10">Sci-fi</option>
          </select>
        </div>
      </div>
      <div className="self-stretch flex-1 rounded-lg flex flex-row py-4 px-3.5 items-start justify-start gap-[8px] border-[1px] border-solid border-border-color sm:flex-col">
        <div className="relative leading-[160%] text-silver">Story Title:</div>
        <input
          className="self-stretch [border:none] cursor-pointer font-font text-base bg-[transparent] flex-1 relative leading-[160%] text-white text-left inline-block overflow-hidden text-ellipsis whitespace-nowrap h-6"
          type="text"
          placeholder="Enter Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="self-stretch flex-1 rounded-lg flex flex-row py-4 px-3.5 items-start justify-start gap-[8px] border-[1px] border-solid border-border-color sm:flex-col">
        <div className="relative leading-[160%] text-silver">Prompt:</div>
        <input
          className="self-stretch [border:none] cursor-pointer font-font text-base bg-[transparent] flex-1 relative leading-[160%] text-white text-left inline-block overflow-hidden text-ellipsis whitespace-nowrap h-6"
          type="text"
          placeholder="Enter Prompt"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
      </div>
      {isConnected && !loading && (
        <button
          className="cursor-pointer py-3 px-[25px] bg-color self-stretch rounded-md flex flex-row items-center justify-start border-[1px] border-solid border-border-color hover:bg-teal"
          onClick={createStory}
        >
          <div className="self-stretch flex-1 relative text-base leading-[160%] font-font text-neutral-9o text-center flex items-center justify-center">
            Create Your Story
          </div>
        </button>
      )}
      {isConnected && loading && (
        <div className="py-3 px-[25px] bg-peachpuff self-stretch rounded-md flex flex-row items-center justify-start border-[1px] border-solid border-border-color">
          <div className="self-stretch flex-1 relative text-base leading-[160%] font-font text-neutral-9o text-center flex items-center justify-center">
            Creating Your Story...
          </div>
        </div>
      )}
      {!isConnected && (
        <div className="py-3 px-[25px] bg-gray self-stretch rounded-md flex flex-row items-center justify-start border-[1px] border-solid border-border-color">
          <div className="self-stretch flex-1 relative text-base leading-[160%] font-font text-neutral-9o text-center flex items-center justify-center">
            Please Connect to Create a Story
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateStoryForm;
