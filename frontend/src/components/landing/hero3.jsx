import { useEffect, useState } from "react";

const HeroSection3 = () => {
  let timer;
  const [z, setZ] = useState([1, 1, 1, 1, 1]);
  const [currentIndex, setCurrentIndex] = useState(1);

  const updateZIndeces = () => {
    timer = setInterval(() => {
      let zs = [1, 1, 1, 1, 1];
      zs[currentIndex] = 2;
      setCurrentIndex((prev) => {
        return (prev + 1) % 5;
      });
      setZ(zs);
    }, 1000);
  };

  useEffect(() => {
    updateZIndeces();
    return () => clearInterval(timer);
  }, [currentIndex]);

  return (
    <div className="self-stretch flex flex-row py-0 px-[120px] items-start justify-start text-center text-xl text-silver-100 font-font md:self-stretch   sm:flex-col sm:min-h-[850px] md:w-auto md:pl-2.5 md:pr-2.5 md:box-border">
      <div className="self-stretch flex-1 flex flex-col py-[57px] px-[30px] items-center justify-center gap-[20px] sm:flex-[unset] sm:self-stretch">
        <div className="self-stretch relative text-41xl tracking-[-2px] leading-[90px] [-webkit-text-stroke:1px_rgba(255,_255,_255,_0.3)] text-gray-00">
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
              <span className="text-gray-00 text-11xl">.AI</span>
            </span>
          </p>
        </div>
        <div className="self-stretch relative leading-[160%] [-webkit-text-stroke:1px_rgba(255,_255,_255,_0.3)]">
          <p className="m-0">
            <span>where imagination meets</span>
            <span className="text-lightseagreen"> innovation</span>
          </p>
          <p className="m-0"> in collaborative AI storytelling.</p>
        </div>
        <div className="self-stretch relative leading-[160%]">
          Craft Your Tale, Choose Your Style!
        </div>
        <button className="cursor-pointer [border:none] py-2.5 px-5 bg-color2 rounded-11xl flex flex-row items-center justify-center hover:bg-teal">
          <div className="relative text-5xl leading-[160%] font-font text-gray-00 text-center">
            Create
          </div>
        </button>
      </div>
      <div className="self-stretch flex-1 flex flex-row py-0 px-[97px] items-center justify-center relative gap-[10px] sm:pl-0 sm:pr-0 sm:box-border sm:flex-[unset] sm:ml-[-50px] sm:self-stretch">
        <img
          style={{ zIndex: z[0] }}
          className="absolute my-0 mx-[!important] top-[83px] left-[92.5px] rounded-xl w-[300px] h-[400px] object-cover z-[0] sm:w-[200px] sm:h-[266px]"
          alt=""
          src="/style1@2x.png"
        />
        <img
          style={{ zIndex: z[1] }}
          className="absolute my-0 mx-[!important] top-[73px] left-[112.5px] rounded-xl w-[300px] h-[400px] object-cover z-[1] sm:w-[200px] sm:h-[266px]"
          alt=""
          src="/style2@2x.png"
        />
        <img
          style={{ zIndex: z[2] }}
          className="absolute my-0 mx-[!important] top-[63px] left-[132.5px] rounded-xl w-[300px] h-[400px] object-cover z-[2] sm:w-[200px] sm:h-[266px]"
          alt=""
          src="/style3@2x.png"
        />
        <img
          style={{ zIndex: z[3] }}
          className="absolute my-0 mx-[!important] top-[53px] left-[152.5px] rounded-xl w-[300px] h-[400px] object-cover z-[3] sm:w-[200px] sm:h-[266px]"
          alt=""
          src="/style4@2x.png"
        />
        <img
          style={{ zIndex: z[4] }}
          className="absolute my-0 mx-[!important] top-[43px] left-[172.5px] rounded-xl w-[300px] h-[400px] object-cover z-[4] sm:w-[200px] sm:h-[266px]"
          alt=""
          src="/style5@2x.png"
        />
      </div>
    </div>
  );
};

export default HeroSection3;
