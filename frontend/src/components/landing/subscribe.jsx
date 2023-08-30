import { useState } from "react";

const SectionSubscribe = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const onSubmit = async () => {
    setLoading(true);
    const url = "https://api.convertkit.com/v3/forms/5498874/subscribe";

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        api_key: "k6MJCsQp9HLVoyNYRv06TQ",
        email: email,
      }),
    });
    const res = await response.json();
  };

  return (
    <div className="self-stretch flex flex-row py-[60px] px-[179px] items-start justify-between text-left text-29xl text-gray-00 font-font md:pl-5 md:pr-[30px] md:box-border sm:flex-col sm:gap-[0px]">
      <div className="self-stretch flex flex-1 flex-col items-start justify-start gap-[20px]">
        <div className="relative leading-[160%] [text-shadow:0px_4px_13px_rgba(240,_240,_240,_0.67)]">
          Subscribe
        </div>
        <div className="self-stretch relative text-base leading-[160%] text-silver-100 text-justify">
          We are currently running on Testnets. Please subscribe to hear more
          about our development, and be there when we go live on mainnet!
        </div>
      </div>
      <div className="self-stretch flex-1 flex rounded-xl h-[170px] overflow-hidden flex flex-col p-[30px] box-border items-center justify-start gap-[10px] text-center text-5xl sm:flex-[unset] sm:self-stretch">
        <div className="self-stretch bg-gray-00 overflow-hidden flex flex-col py-[5px] px-5 items-center justify-start rounded-11xl">
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="[border:none] bg-[transparent] self-stretch overflow-hidden"
            type="text"
            placeholder="youremail@gmail.com"
          />
        </div>
        <button
          disabled={loading}
          onClick={onSubmit}
          className="disabled:bg-disabled self-stretch cursor-pointer [border:none] py-2.5 px-5 bg-color2 rounded-11xl flex flex-row items-center justify-center hover:bg-teal"
        >
          <div className="relative text-5xl leading-[160%] font-font text-gray-00 text-center">
            {loading ? "Thank you for subscribing" : "Subscribe"}
          </div>
        </button>
      </div>
    </div>
  );
};

export default SectionSubscribe;
