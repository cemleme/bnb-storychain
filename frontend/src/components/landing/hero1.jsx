const HeroSection1 = () => {
    return (
      <div className="self-stretch h-[600px] flex flex-row py-[100px] px-[120px] box-border items-start justify-start text-left text-41xl text-gray-00 font-font md:pl-2.5 md:pr-2.5 md:box-border">
        <div className="self-stretch flex-1 flex flex-row items-center justify-start gap-[101px]">
          <div className="flex-1 h-[322px] flex flex-col py-0 px-[30px] box-border items-center justify-center gap-[40px]">
            <div className="self-stretch relative tracking-[-2px] leading-[90px] [-webkit-text-stroke:1px_rgba(255,_255,_255,_0.3)]">
              <p className="m-0">
                <span>
                  <span>Welcome to</span>
                </span>
              </p>
              <p className="m-0">
                <span>
                  <span className="font-semibold">STORY</span>
                </span>
                <span className="font-semibold">
                  <span className="text-lightseagreen">CHAIN</span>
                  <span className="text-gray-00">{` `}</span>
                </span>
              </p>
            </div>
            <div className="self-stretch flex-1 relative text-5xl leading-[160%] text-silver-100 text-center">
              <p className="m-0">where imagination meets innovation</p>
              <p className="m-0"> in collaborative AI storytelling.</p>
            </div>
          </div>
          <img
            className="relative w-[600px] h-[415px] object-cover lg:w-[500px] lg:h-[350px]"
            alt=""
            src="/example-page-1@2x.png"
          />
        </div>
      </div>
    );
  };
  
  export default HeroSection1;
  