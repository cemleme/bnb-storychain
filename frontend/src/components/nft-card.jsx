import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { readContract, writeContract, waitForTransaction } from "@wagmi/core";
import abi from "../abi.json";
import constants from "../constants";

const NftCard = ({ image, title, id, network, metadata }) => {
  const { address, isConnected, isConnecting, isDisconnected } = useAccount();
  const [isLoading, setIsLoading] = useState(false);
  const [approved, setApproved] = useState(false);

  return (
    <div className="relative rounded-3xl [background:linear-gradient(140.76deg,_rgba(255,_255,_255,_0.6),_rgba(2,_140,_135,_0.2))] [backdrop-filter:blur(18.4px)] box-border w-[343px] h-[434px] flex flex-col p-2.5 items-start justify-center text-left text-xs text-color font-font border-[1px] border-solid border-gray-200">
      {image && (
        <img
          className="self-stretch aspect-square flex-1 rounded-tl-[30px] rounded-tr-3xl rounded-b-none overflow-hidden object-cover"
          alt=""
          src={image}
        />
      )}
      <div className="self-stretch border-b-[1px] border-solid border-color" />
      <div className="self-stretch flex flex-col py-0 px-2.5 items-center justify-start">
        <div className="self-stretch flex flex-row items-center justify-start gap-[10px] text-center text-base">
          <div className="flex-1 relative leading-[160%] text-white">
            {title}
          </div>
        </div>
        <div className="self-stretch flex flex-row items-start justify-center gap-[20px]">
          <div className="relative leading-[160%]">ID:</div>
          <div className="self-stretch flex-1 relative leading-[160%] text-right">
            {id}
          </div>
        </div>
        <div className="self-stretch flex flex-row items-start justify-center gap-[20px]">
          <div className="relative leading-[160%]">Network:</div>
          <div className="self-stretch flex-1 relative leading-[160%] text-right">
            {network}
          </div>
        </div>
        <div className="self-stretch flex flex-row items-start justify-center gap-[20px]">
          <div className="relative leading-[160%]"></div>
          <a
            href={metadata}
            target="_blank"
            className="no-underline text-color self-stretch flex-1 relative leading-[160%] text-right"
          >
            Metadata
          </a>
        </div>
        <div className="self-stretch flex flex-row items-start justify-center gap-[20px]">
          <div className="relative leading-[160%]"></div>
          <a
            href={
              network == "Goerli"
                ? `https://goerli.etherscan.io/nft/0xe521b06784fcf7f0f70f27579965b21e2908d5a3/${id}`
                : `https://testnet-zkevm.polygonscan.com/token/0x4815222EAa1098C8316C36179f6b99F02d20C3Dc?a=${id}`
            }
            target="_blank"
            className="no-underline text-color self-stretch flex-1 relative leading-[160%] text-right"
          >
            Blockchain Explorer
          </a>
        </div>
      </div>
    </div>
  );
};

export default NftCard;
