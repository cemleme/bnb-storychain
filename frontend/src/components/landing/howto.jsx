const SectionHowTo = () => {
  return (
    <div className="self-stretch flex flex-row py-[60px] px-10 items-center justify-center text-left text-29xl text-gray-00 font-font md:pl-2.5 md:pr-[30px] md:box-border sm:h-auto sm:flex-col">
      <div className="self-stretch flex-1 rounded-25xl flex flex-col py-12 px-6 items-center justify-start sm:flex-[unset] sm:self-stretch">
        <div className="self-stretch flex flex-row items-center justify-center gap-[24px]">
          <img
            className="relative w-[50px] h-[50px]"
            alt=""
            src="/vectorhow.svg"
          />
          <div className="relative leading-[160%]">How to use?</div>
        </div>
        <div className="flex flex-col py-0 px-2.5 items-start justify-center gap-[24px] text-lg">
          <div className="self-stretch flex flex-row items-center justify-start gap-[15px]">
            <div className="flex flex-row items-center justify-center">
              <div className="relative rounded-[50%] [background:linear-gradient(152.14deg,_rgba(0,_150,_136,_0.7),_rgba(255,_138,_101,_0.7))] w-6 h-6" />
              <img
                className="relative w-3 h-[5.77px]"
                alt=""
                src="/line-100.svg"
              />
            </div>
            <div className="relative leading-[160%]">Connect Your Wallet</div>
          </div>
          <div className="self-stretch flex flex-row items-center justify-start gap-[15px]">
            <div className="flex flex-row items-center justify-center">
              <div className="relative rounded-[50%] [background:linear-gradient(152.14deg,_rgba(0,_150,_136,_0.7),_rgba(255,_138,_101,_0.7))] w-6 h-6" />
              <img
                className="relative w-3 h-[5.77px]"
                alt=""
                src="/line-100.svg"
              />
            </div>
            <div className="relative leading-[160%]">
              Choose the blockchain you want to contribute
            </div>
          </div>
          <div className="self-stretch flex flex-row items-center justify-start gap-[15px]">
            <div className="flex flex-row items-center justify-center">
              <div className="relative rounded-[50%] [background:linear-gradient(152.14deg,_rgba(0,_150,_136,_0.7),_rgba(255,_138,_101,_0.7))] w-6 h-6" />
              <img
                className="relative w-3 h-[5.77px]"
                alt=""
                src="/line-100.svg"
              />
            </div>
            <div className="relative leading-[160%]">
              Enter your prompt that inspires next chapter of the story
            </div>
          </div>
          <div className="self-stretch flex flex-row items-center justify-start gap-[15px]">
            <div className="flex flex-row items-center justify-center">
              <div className="relative rounded-[50%] [background:linear-gradient(152.14deg,_rgba(0,_150,_136,_0.7),_rgba(255,_138,_101,_0.7))] w-6 h-6" />
              <img
                className="relative w-3 h-[5.77px]"
                alt=""
                src="/line-100.svg"
              />
            </div>
            <div className="relative leading-[160%]">
              Let the AI work and mint your NFT!
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-1 items-center justify-center">
        <img
          className="relative rounded-25xl w-[333px] h-[333px] object-cover"
          alt=""
          src="/howto.gif"
        />
      </div>
    </div>
  );
};

export default SectionHowTo;
