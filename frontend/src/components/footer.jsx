import { useCallback } from "react";

const Footer = () => {

  const onInstagramClick = useCallback(() => {
    window.open("https://www.instagram.com/storychain.ai/");
  }, []);

  const onTwitterClick = useCallback(() => {
    window.open("https://twitter.com/storychain_ai");
  }, []);

  return (
    <div className="self-stretch bg-darkgray [backdrop-filter:blur(10px)] h-[150px] flex flex-row py-[15px] px-[30px] box-border items-center justify-center gap-[40px] sm:flex-col sm:pl-5 sm:pr-5 sm:box-border">
      <button className="cursor-pointer [border:none] p-0 bg-[transparent] self-stretch flex-1 flex flex-row items-start justify-start sm:hidden sm:flex-[unset] sm:self-stretch">
        <img
          className="relative w-[76.67px] h-[33.35px]"
          alt=""
          src="/logovector.svg"
        />
      </button>
      <div className="self-stretch flex-1 flex flex-row items-start justify-end sm:self-stretch sm:w-auto sm:flex-[unset] sm:items-center sm:justify-start">
        <div className="self-stretch flex-1 flex flex-col items-start justify-start">
          <button className="cursor-pointer [border:none] p-0 bg-[transparent] self-stretch flex-1 relative text-base tracking-[-0.02em] font-font text-white text-left inline-block">
            Blog
          </button>
          <button className="cursor-pointer [border:none] p-0 bg-[transparent] self-stretch flex-1 relative text-base tracking-[-0.02em] font-font text-white text-left inline-block">
            Contact
          </button>
          <div className="self-stretch flex-1 flex flex-row items-start justify-start gap-[10px] sm:items-center sm:justify-start">
            <button
              onClick={onInstagramClick}
              className="cursor-pointer [border:none] p-0 bg-whitesmoke rounded-81xl w-6 h-6 overflow-hidden shrink-0 flex flex-col items-center justify-center  hover:bg-lightseagreen"
            >
              <img
                className="relative w-[12.01px] h-[11.82px]"
                alt=""
                src="/vector.svg"
              />
            </button>
            <button
              onClick={onTwitterClick}
              className="cursor-pointer [border:none] p-0 bg-whitesmoke rounded-81xl w-6 h-6 overflow-hidden shrink-0 flex flex-col items-center justify-center  hover:bg-lightseagreen"
            >
              <img
                className="relative w-[15px] h-[11.77px]"
                alt=""
                src="/vector1.svg"
              />
            </button>
            {/* <button className="cursor-pointer [border:none] p-0 bg-whitesmoke rounded-81xl w-6 h-6 overflow-hidden shrink-0 flex flex-col items-center justify-center">
              <img
                className="relative w-[14.87px] h-[10.3px]"
                alt=""
                src="/vector2.svg"
              />
            </button> */}
          </div>
        </div>
        <div className="self-stretch flex-1 flex flex-col items-end justify-start">
          <button className="cursor-pointer [border:none] p-0 bg-[transparent] self-stretch flex-1 relative text-base tracking-[-0.02em] font-font text-white text-right inline-block">{`Help & Support`}</button>
          <button className="cursor-pointer [border:none] p-0 bg-[transparent] self-stretch flex-1 relative text-base tracking-[-0.02em] font-font text-white text-right inline-block">{`Terms & Conditions`}</button>
          <button className="cursor-pointer [border:none] p-0 bg-[transparent] self-stretch flex-1 relative text-base tracking-[-0.02em] font-font text-white text-right inline-block">
            Privacy Policy
          </button>
        </div>
      </div>
    </div>
  );
};

export default Footer;
