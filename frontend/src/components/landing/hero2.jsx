const HeroSection2 = () => {
    return (
      <button className="cursor-pointer [border:none] py-[100px] px-[120px] bg-[transparent] w-[1470px] h-[600px] flex flex-row box-border items-start justify-start md:self-stretch md:w-auto md:pl-2.5 md:pr-2.5 md:box-border">
        <div className="self-stretch flex-1 flex flex-row items-center justify-start gap-[101px]">
          <div className="self-stretch flex-1 flex flex-row py-[29px] px-12 items-start justify-center">
            <img
              className="relative rounded-xl w-[333px] h-[333px] object-cover"
              alt=""
              src="/storychainhowto-2@2x.png"
            />
          </div>
          <div className="self-stretch flex-1 flex flex-col py-0 px-[30px] items-center justify-center gap-[20px]">
            <div className="self-stretch relative text-41xl tracking-[-2px] leading-[90px] font-font text-center [-webkit-text-stroke:1px_rgba(255,_255,_255,_0.3)]">
              <p className="m-0 text-gray-00">Collaborate</p>
              <p className="m-0 text-lightseagreen">Create</p>
              <p className="m-0 text-coral">Captivate</p>
            </div>
            <div className="self-stretch relative text-5xl leading-[160%] font-font text-silver-100 text-center">
              Join the StoryChain Community Today!
            </div>
            <div className="rounded-11xl bg-color2 flex flex-row py-2.5 px-5 items-center justify-center hover:bg-teal-200">
              <div className="relative text-5xl leading-[160%] font-font text-gray-00 text-center">
                Explore
              </div>
            </div>
          </div>
        </div>
      </button>
    );
  };
  
  export default HeroSection2;
  