import { useState } from "react";
import StyleImages from "./style-images";

const imageData = [
  {
    prompt:
      "Ayaz is a 5 years old boy. black haired black eyes. He always wanted to explore the solar system.",
    modelStyle: [
      { model: "DreamShaper", style: "Children's Book" },
      { model: "DreamShaper", style: "B&W Sketch" },
      { model: "Anime Pastel", style: "Anime" },
      { model: "3D Animation", style: "3D Render" },
      { model: "Pixel Art", style: "Illustration" },
      { model: "SDXL", style: "Photography" },
    ],
  },

  {
    prompt:
      "Poyraz is a 3 years old boy lives in prehistoric age and protects baby dinosaurs from giant dinosaurs.",
    modelStyle: [
      { model: "DreamShaper", style: "Retro" },
      { model: "Anime Pastel", style: "B&W Sketch" },
      { model: "3D Animation", style: "3D Render" },
      { model: "Pixel Art", style: "Children's Book" },
      { model: "SDXL", style: "Colored Sketch" },
      { model: "SDXL", style: "Regular" },
    ],
  },

  {
    prompt:
      "Aubree is a 6 years old blonde girl who wants to explore the Amazon forests to find her ancestors' long lost medallion.",
    modelStyle: [
      { model: "SDXL", style: "B&W Sketch" },
      { model: "SDXL", style: "Children's Book" },
      { model: "Pixel Art", style: "Regular" },
      { model: "3D Animation", style: "Photography" },
      { model: "DreamShaper", style: "Realistic" },
      { model: "Anime Pastel", style: "Anime" },
    ],
  },

  {
    prompt:
      "Frank is a 40 years old soldier astronaut who goes to Mars to fight aliens.",
    modelStyle: [
      { model: "Anime Pastel", style: "Illustration" },
      { model: "SDXL", style: "B&W Sketch" },
      { model: "DreamShaper", style: "3D Render" },
      { model: "Pixel Art", style: "Colored Sketch" },
      { model: "RPG", style: "Regular" },
      { model: "SDXL", style: "Sci-fi" },
    ],
  },

  {
    prompt:
      "Olivia is a talented and passionate dancer, embarks on a quest to rekindle the fading essence of dance and restore hope to a society in need of inspiration.",
    modelStyle: [
      { model: "SDXL", style: "Illustration" },
      { model: "Anime Pastel", style: "B&W Sketch" },
      { model: "3D Animation", style: "3D Render" },
      { model: "SDXL", style: "Photography" },
      { model: "Pixel Art", style: "Regular" },
      { model: "DreamShaper", style: "Sci-fi" },
    ],
  },
];

const SectionStyles = () => {
  const [char, setChar] = useState(0);

  return (
    <div className="self-stretch [background:linear-gradient(180deg,_rgba(15,_154,_142,_0),_#0f9a8e_3.12%)] flex flex-col py-[30px] px-[60px] items-center justify-start text-right text-base text-gray-00 font-font md:pl-2.5 md:pr-2.5 md:box-border">
      <div className="self-stretch rounded-xl box-border flex flex-col py-[37px] px-[35px] items-start justify-center gap-[24px] border-[1px] border-solid border-darkcyan lg:self-stretch lg:w-auto md:self-stretch md:w-auto">
        <div className="self-stretch relative text-29xl leading-[160%] [text-shadow:0px_4px_13px_rgba(240,_240,_240,_0.67)]">
          Your Story, Your Style
        </div>
        <div className="self-stretch flex flex-row py-2.5 px-0 items-start justify-center text-justify text-color1 border-b-[1px] border-solid border-peachpuff">
          <div className="flex-1 relative leading-[160%]">
            <p className="m-0">
              At StoryChain, we celebrate your unique creative journey. Begin
              crafting your very own story by choosing from a wide selection of
              Image AI models and styles. Let your imagination run wild as you
              meet our captivating protagonists, each brought to life in
              distinct and diverse artistic expressions.
            </p>
            <p className="m-0">&nbsp;</p>
            <p className="m-0">
              Once you've set the stage for your tale and chosen your preferred
              style, the contributions from other users will continue with the
              same style. This ensures a consistent and harmonious storytelling
              experience for everyone involved.
            </p>
          </div>
        </div>
        <div className="self-stretch relative leading-[160%] text-center [text-shadow:0px_4px_13px_rgba(240,_240,_240,_0.67)]">
          Meet some example characters, generated with different AI models:
        </div>
        <div className="self-stretch flex flex-row items-center justify-center gap-[16px]">
          <button
            onClick={() => setChar(0)}
            className={(char == 0 ? "bg-teal " : "bg-primary-presed ") + "cursor-pointer [border:none] py-4 px-8 rounded-47xl flex flex-row items-center justify-center hover:bg-teal"}
          >
            <div className="relative text-base leading-[160%] font-font text-gray-00 text-left">
              Ayaz
            </div>
          </button>
          <button
            onClick={() => setChar(1)}
            className={(char == 1 ? "bg-teal " : "bg-primary-presed ") + "cursor-pointer [border:none] py-4 px-8 rounded-47xl flex flex-row items-center justify-center hover:bg-teal"}
          >
            <div className="relative text-base leading-[160%] font-font text-gray-00 text-left">
              Poyraz
            </div>
          </button>
          <button
            onClick={() => setChar(2)}
            className={(char == 2 ? "bg-teal " : "bg-primary-presed ") + "cursor-pointer [border:none] py-4 px-8 rounded-47xl flex flex-row items-center justify-center hover:bg-teal"}
          >
            <div className="relative text-base leading-[160%] font-font text-gray-00 text-left">
              Aubree
            </div>
          </button>
          <button
            onClick={() => setChar(3)}
            className={(char == 3 ? "bg-teal " : "bg-primary-presed ") + "cursor-pointer [border:none] py-4 px-8 rounded-47xl flex flex-row items-center justify-center hover:bg-teal"}
          >
            <div className="relative text-base leading-[160%] font-font text-gray-00 text-left">
              Frank
            </div>
          </button>
          <button
            onClick={() => setChar(4)}
            className={(char == 4 ? "bg-teal " : "bg-primary-presed ") + "cursor-pointer [border:none] py-4 px-8 rounded-47xl flex flex-row items-center justify-center hover:bg-teal"}
          >
            <div className="relative text-base leading-[160%] font-font text-gray-00 text-left">
              Olivia
            </div>
          </button>
        </div>
        <StyleImages char={char} imageData={imageData[char]} />
      </div>
    </div>
  );
};

export default SectionStyles;
