import React from "react";
import { StyleCard } from "./style-card";

export default ({ imageData, char }) => {
  return (
    <>
      <div className="self-stretch flex-1 flex flex-row items-center justify-center gap-[10px]">
        <StyleCard image={`/styles/style${char}1@2x.jpg`} modelStyle={imageData.modelStyle[0]} />
        <StyleCard image={`/styles/style${char}2@2x.jpg`} modelStyle={imageData.modelStyle[1]} />
        <StyleCard image={`/styles/style${char}3@2x.jpg`} modelStyle={imageData.modelStyle[2]} />
        <StyleCard image={`/styles/style${char}4@2x.jpg`} modelStyle={imageData.modelStyle[3]} />
        <StyleCard image={`/styles/style${char}5@2x.jpg`} modelStyle={imageData.modelStyle[4]} />
        <StyleCard image={`/styles/style${char}6@2x.jpg`} modelStyle={imageData.modelStyle[5]} />
      </div>
      <div className="self-stretch flex-1 flex flex-row items-center justify-center gap-[10px] text-black">
        Story prompt: {imageData.prompt}
      </div>
    </>
  );
};
