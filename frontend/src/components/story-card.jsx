import BounceLoader from "react-spinners/ClipLoader";

const StoryCard = ({
  image,
  title,
  pages,
  storyAI,
  imageAI,
  cost,
  category,
}) => {
  return (
    <div className="relative rounded-3xl [background:linear-gradient(140.76deg,_rgba(255,_255,_255,_0.6),_rgba(2,_140,_135,_0.2))] [backdrop-filter:blur(18.4px)] box-border w-[343px] h-[434px] flex flex-col p-2.5 items-start justify-center text-left text-xs text-color font-font border-[1px] border-solid border-gray-200">
      {image && (
        <img
          className="self-stretch aspect-square flex-1 rounded-tl-[30px] rounded-tr-3xl rounded-b-none overflow-hidden object-cover"
          alt=""
          src={image}
        />
      )}
      {!image && (
        <div className="self-stretch content-center aspect-square flex rounded-tl-[30px] rounded-tr-3xl rounded-b-none overflow-hidden object-cover items-center justify-center">
          <BounceLoader
            color="#ffffff"
            size={100}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      )}
      <div className="self-stretch border-b-[1px] border-solid border-color" />
      <div className="self-stretch flex flex-col py-0 px-2.5 items-center justify-start">
        <div className="self-stretch flex flex-row items-center justify-start gap-[10px] text-center text-base">
          {category == 0 && (
            <div className="rounded-3xl bg-coral w-5 h-5 flex flex-row py-0 px-2 box-border items-center justify-center  hover:brightness-50">
              <img className="relative w-[15px] h-2.5" alt="" src="/kids.svg" />
            </div>
          )}
          <div className="flex-1 relative leading-[160%] text-white">
            {title}
          </div>
          <div className="flex flex-row items-center justify-center gap-[2px] text-left text-color1 font-roboto">
            <img
              className="relative w-[14px] h-[14px] overflow-hidden shrink-0"
              alt=""
              src="/pages.svg"
            />
            <div className="relative text-white leading-[160%] text-xs">{pages}</div>
          </div>
        </div>
        <div className="self-stretch flex flex-row items-start justify-center gap-[20px]">
          <div className="relative leading-[160%]">Story AI:</div>
          <div className="self-stretch flex-1 relative leading-[160%] text-right">
            {storyAI}
          </div>
        </div>
        <div className="self-stretch flex flex-row items-start justify-center gap-[20px]">
          <div className="relative leading-[160%]">Image AI:</div>
          <div className="self-stretch flex-1 relative leading-[160%] text-right">
            {imageAI}
          </div>
        </div>
        <div className="self-stretch flex flex-row items-start justify-center gap-[20px]">
          <div className="relative leading-[160%]">Cost per Page:</div>
          <div className="self-stretch flex-1 relative leading-[160%] text-right">
            {cost}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoryCard;
