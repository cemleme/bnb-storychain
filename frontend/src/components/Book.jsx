import { useState, useCallback } from "react";
import ContinueStoryPopUp from "./ContinueStoryPopUp";
import { useAccount } from "wagmi";
import PortalPopup from "./PortalPopup";
import BounceLoader from "react-spinners/ClipLoader";

const Book = ({
  title,
  body,
  pageNo,
  nonce,
  cost,
  author,
  image,
  metadata,
  landscape,
  updating,
  totalPages,
  goToPrevPage,
  goToNextPage,
  goToLastPage,
  goToFirstPage,
}) => {
  const { isConnected } = useAccount();
  const [isContinueStoryPopUpOpen, setContinueStoryPopUpOpen] = useState(false);

  const openContinueStoryPopUp = useCallback(() => {
    setContinueStoryPopUpOpen(true);
  }, []);

  const closeContinueStoryPopUp = useCallback(() => {
    setContinueStoryPopUpOpen(false);
    goToLastPage();
  }, []);

  return (
    <>
      {isContinueStoryPopUpOpen && (
        <PortalPopup
          overlayColor="rgba(0, 0, 0, 0.8)"
          placement="Centered"
          onOutsideClick={closeContinueStoryPopUp}
        >
          <ContinueStoryPopUp
            title={title}
            pageNo={pageNo + 1}
            nonce={nonce}
            cost={cost}
            onClose={closeContinueStoryPopUp}
          />
        </PortalPopup>
      )}
      <div className="relative bg-border-color flex flex-row px-3.5 items-start justify-start text-center text-black font-playfair-display md:px-[0px] md:flex-col">
        <div className="self-stretch flex-1 flex flex-col px-[15px] items-start justify-start gap-[20px] md:flex-[unset] md:self-stretch md:px-[0px]">
          <div className="self-stretch relative leading-[160%] uppercase">
            {title}
          </div>
          <div className="self-stretch relative tracking-[-0.02em] font-crimson-text text-justify">
            {body?.split("\n").map((str, i) => (
              <p key={i}>{str}</p>
            ))}
            {updating && !image && pageNo > totalPages && (
              <p>
                Generating new Page. Please wait while multiple AI models are
                working...
              </p>
            )}
          </div>
          <div className="self-stretch relative leading-[160%] text-left md:text-right">
            {pageNo}
          </div>
        </div>
        <div className="self-stretch flex-1 flex flex-col px-[15px] items-center justify-between gap-[10px] text-right md:flex-[unset] md:self-stretch">
          <div className="self-stretch md:text-3xs relative leading-[160%] uppercase md:text-center">
            Author: {author}
          </div>
          {updating && pageNo > totalPages && (
            <>
              <BounceLoader
                color="#000000"
                loading={updating}
                size={image ? 20 : 100}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
              {image ? " minting NFT..." : ""}
            </>
          )}
          {image && <img src={image} key={image} className={"w-full h-auto"} />}
          <a
            href={metadata}
            target="_blank"
            className="cursor-pointer [border:none] p-0 bg-[transparent] relative text-[12px] leading-[160%] font-playfair-display text-black text-center inline-block"
          >
            NFT METADATA
          </a>
          <div className="self-stretch flex flex-row items-end justify-center gap-[10px]">
            <div className="self-stretch flex-1 flex flex-row items-center justify-center">
              {isConnected && !updating && pageNo == totalPages && (
                <button
                  className="cursor-pointer py-0 px-2.5 bg-color self-stretch flex-1 rounded-md flex flex-row items-center justify-center border-[1px] border-solid border-border-color hover:bg-teal disabled:bg-silver"
                  onClick={openContinueStoryPopUp}
                >
                  <div className="relative text-xs leading-[160%] font-font text-neutral-9o text-center">
                    Continue Story
                  </div>
                </button>
              )}
            </div>
            <div className="flex-1 flex flex-row items-end justify-end gap-[2px]">
              <button
                disabled={pageNo <= 1}
                onClick={goToFirstPage}
                className="cursor-pointer p-0 bg-color rounded-md box-border w-[31px] h-[31px] flex flex-row items-center justify-center border-[1px] border-solid border-border-color hover:bg-teal disabled:bg-disabled"
              >
                <div className="self-stretch flex-1 relative text-base leading-[160%] font-font text-neutral-9o text-center flex items-center justify-center">{`<<`}</div>
              </button>
              <button
                disabled={pageNo <= 1}
                onClick={goToPrevPage}
                className="cursor-pointer p-0 bg-color rounded-md box-border w-[31px] h-[31px] flex flex-row items-center justify-center border-[1px] border-solid border-border-color hover:bg-teal disabled:bg-disabled"
              >
                <div className="self-stretch flex-1 relative text-base leading-[160%] font-font text-neutral-9o text-center flex items-center justify-center">{`<`}</div>
              </button>
              <button
                disabled={updating ? pageNo > totalPages : pageNo == totalPages}
                onClick={goToNextPage}
                className="cursor-pointer p-0 bg-color rounded-md box-border w-[31px] h-[31px] flex flex-row items-center justify-center border-[1px] border-solid border-border-color hover:bg-teal disabled:bg-disabled"
              >
                <div className="self-stretch flex-1 relative text-base leading-[160%] font-font text-neutral-9o text-center flex items-center justify-center">{`>`}</div>
              </button>
              <button
                disabled={updating ? pageNo > totalPages : pageNo == totalPages}
                onClick={goToLastPage}
                className="cursor-pointer p-0 bg-color rounded-md box-border w-[31px] h-[31px] flex flex-row items-center justify-center border-[1px] border-solid border-border-color hover:bg-teal disabled:bg-disabled"
              >
                <div className="self-stretch flex-1 relative text-base leading-[160%] font-font text-neutral-9o text-center flex items-center justify-center">{`>>`}</div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Book;
