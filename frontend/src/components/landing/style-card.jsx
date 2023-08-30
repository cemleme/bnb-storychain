import React from "react";

export const StyleCard = ({ image, modelStyle, alt = "" }) => {
  return (
    <div className="relative rounded-6xl bg-color w-[195px] flex flex-row p-[5px] box-border items-end justify-start text-center text-xs text-color font-font">
      <div
        style={{ "--image-url": `url(${image})` }}
        className={
          `bg-[image:var(--image-url)]` +
          " flex-1 rounded-xl h-[231px] flex flex-col items-center justify-end bg-cover bg-no-repeat bg-[top] mix-blend-normal md:w-[123px] md:h-[154px]"
        }
      >
        <div className="self-stretch rounded-t-none rounded-b-xl bg-ffffff [backdrop-filter:blur(29.69px)] h-[41px] flex flex-col py-[3px] px-2.5 box-border items-center justify-start">
          <div className="self-stretch flex-1 relative leading-[160%]">
            <span>{`Model: `}</span>
            <span className="text-gray-00">{modelStyle.model}</span>
          </div>
          <div className="self-stretch flex-1 relative leading-[160%]">
            <span>Style: </span>
            <span className="text-gray-00">{modelStyle.style}</span>
          </div>
        </div>
      </div>
    </div>
  );
  // return (
  //   <div className="rounded-6xl bg-color flex flex-row p-[5px] items-end justify-start">
  //     <img
  //       className="rounded-xl w-[192px] h-[256px] object-cover mix-blend-normal hover:[background-size:110%] md:w-[123px] md:h-[154px]"
  //       alt={alt}
  //       src={image}
  //     />
  //   </div>
  // );
};
