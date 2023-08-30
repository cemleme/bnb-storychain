import { FaqItem } from "./faq-item";
import constants from "../../constants";

const SectionFAQ = () => {
  return (
    <div className="self-stretch [background:linear-gradient(180deg,_rgba(15,_154,_142,_0),_#0f9a8e_4.69%)] overflow-hidden flex flex-col py-[60px] px-[170px] items-center justify-center gap-[30px] text-center text-29xl text-gray-00 font-font">
      <div className="self-stretch flex flex-col items-center justify-center">
        <div className="self-stretch relative leading-[160%]">
          Frequently Asked Questions
        </div>
      </div>
      <div className="self-stretch flex flex-col items-center gap-[10px] justify-start text-left text-base text-color1">
        {constants.faq.map((f, i) => {
          return <FaqItem key={i} question={f.q} answer={f.a} />;
        })}
      </div>
    </div>
  );
};

export default SectionFAQ;
