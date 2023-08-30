const SectionAbout = () => {
  return (
    <div className="self-stretch flex flex-row py-[60px] px-[179px] items-center justify-between text-left text-29xl text-gray-00 font-font md:pl-5 md:pr-[30px] md:box-border">
      <div className="[border:none] p-0 bg-[transparent] flex-1 flex flex-col items-center justify-center gap-[9.33px]">
        <img
          className="relative w-[250px] h-[108.76px]"
          alt=""
          src="/logovector.svg"
        />
        <div className="flex flex-col items-center justify-center">
          <div className="relative text-41xl leading-[100%] font-semibold font-font text-gray-00 text-left">
            STORY
          </div>
          <div className="relative text-41xl leading-[100%] font-semibold font-font text-lightseagreen text-left">
            CHAIN
          </div>
        </div>
      </div>
      <div className="self-stretch flex-1 flex flex-col items-start justify-center">
        <div className="self-stretch flex flex-col items-start justify-center gap-[24px]">
          <div className="relative leading-[160%] [text-shadow:0px_4px_13px_rgba(240,_240,_240,_0.67)]">
            What is StoryChain?
          </div>
          <div className="self-stretch relative text-base leading-[160%] text-silver-100 text-justify">
            StoryChain is an innovative multi-level AI-based dApp that fosters
            collaborative storytelling. Dive into a world of endless creativity
            as users come together to craft captivating stories with unique
            chapters and stunning artwork. By harnessing the power of Language
            AI and Image AI, each page becomes an extraordinary NFT, showcasing
            the brilliance of its creator.
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionAbout;
