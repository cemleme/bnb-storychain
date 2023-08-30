import React, { useState } from "react";

export const FaqItem = ({ question, answer }) => {
  const [visible, setVisible] = useState(false);

  return (
    <div className="self-stretch flex flex-col items-center justify-start">
      <button
        onClick={() => setVisible((prev) => !prev)}
        className="cursor-pointer p-6 bg-gray-300 self-stretch rounded-2xl flex flex-row items-center justify-center border-[1.5px] border-solid border-color1"
      >
        <div className="flex-1 relative text-base leading-[160%] font-font text-gray-00 text-left">
          {question}
        </div>
      </button>
      {visible && (
        <div className="self-stretch rounded-2xl text-base bg-color flex flex-row flex-wrap py-[18px] px-6 items-center justify-start">
          <div className="flex-1 relative leading-[160%]">{answer}</div>
        </div>
      )}
    </div>
  );
};
