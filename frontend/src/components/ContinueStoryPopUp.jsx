import { useState } from "react";
import { useAccount } from "wagmi";
import { writeContract, waitForTransaction } from "@wagmi/core";
import BigNumber from "bignumber.js";
import constants from "../constants";
import abi from "../abi.json";

const fromWei = (amount) => {
  return parseFloat(BigNumber(amount).dividedBy(10 ** 18));
};

const ContinueStoryPopUp = ({ onClose, title = "", pageNo, nonce, cost }) => {
  const { address, isConnected } = useAccount();
  const [loading, setIsLoading] = useState(false);
  const [prompt, setPrompt] = useState("");

  const handleSubmit = async () => {
    console.log("continue story", prompt, nonce, cost, address);
    const { hash } = await writeContract({
      mode: "recklesslyUnprepared",
      address: constants.contractAddress,
      abi: abi,
      functionName: "continueStory",
      args: [prompt, nonce],
      value: cost.toString(),
    });
    if (hash) setIsLoading(true);
    else return;
    console.log(hash);

    const data = await waitForTransaction({
      hash,
    });

    console.log(data);

    setIsLoading(false);

    setPrompt("");
    onClose();
  };

  return (
    <div className="relative rounded-[7.42px] bg-pink [backdrop-filter:blur(29.69px)] w-[841px] overflow-hidden flex flex-col p-10 box-border items-center justify-start gap-[21px] max-w-full max-h-full text-left text-lg text-neutral-9o font-font sm:p-2.5 sm:box-border">
      <div className="self-stretch flex flex-row items-start justify-start gap-[10px] text-white">
        <div className="relative leading-[160%] font-semibold">
          Continue Story
        </div>
        <div className="flex-1 relative text-base leading-[160%] text-right">
          {title}, Page {pageNo}
        </div>
      </div>
      <div className="self-stretch rounded-lg flex flex-row py-4 px-3.5 items-center justify-start gap-[8px] border-[1px] border-solid border-border-color">
        <div className="relative leading-[160%] text-silver">Prompt:</div>
        <input
          className="self-stretch [border:none] cursor-pointer font-font text-base bg-[transparent] flex-1 relative leading-[160%] text-white text-left inline-block overflow-hidden text-ellipsis whitespace-nowrap h-6"
          type="text"
          placeholder="Enter Prompt"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
      </div>
      {!loading && (
        <button
          onClick={handleSubmit}
          className="cursor-pointer py-3 px-[25px] bg-color self-stretch rounded-md flex flex-row items-center justify-start border-[1px] border-solid border-border-color hover:bg-teal"
        >
          <div className="self-stretch flex-1 relative text-base leading-[160%] font-font text-neutral-9o text-center flex items-center justify-center">
            Continue Story
          </div>
        </button>
      )}
      {loading && (
        <div className="py-3 px-[25px] bg-peachpuff self-stretch rounded-md flex flex-row items-center justify-start border-[1px] border-solid border-border-color">
          <div className="self-stretch flex-1 relative text-base leading-[160%] font-font text-neutral-9o text-center flex items-center justify-center">
            Creating the next chapter...
          </div>
        </div>
      )}
      <div className="self-stretch h-7 flex flex-row items-start justify-start gap-[10px] text-base">
        <div className="relative leading-[160%] font-semibold">
          Cost Per Page:
        </div>
        <div className="self-stretch flex-1 relative leading-[160%] flex items-center">
          {fromWei(cost)}
        </div>
      </div>
      <div className="self-stretch flex-1 relative text-[14px] leading-[160%] text-right flex items-center">
        Please make sure to read the entire story and enter a prompt that would
        relate with the story.
      </div>
      {!setIsLoading && (
        <button
          className="cursor-pointer bg-transparent text-color [border:none] p-0 my-0 absolute top-[6px] right-[6px] rounded-xl w-5 h-5 overflow-hidden shrink-0 flex flex-row items-center justify-center z-[5]"
          onClick={onClose}
        >
          x
        </button>
      )}
    </div>
  );
};

export default ContinueStoryPopUp;
