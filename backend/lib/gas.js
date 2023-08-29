const BigNumber = require("bignumber.js");
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

const tip = 20;

const getGasData = async () => {
  try {
    const data = await fetch(
      "https://gftm.blockscan.com/gasapi.ashx?apikey=key&method=gasoracle"
    );
    const dataJson = await data.json();
    const gas = dataJson.result["FastGasPrice"];
    let gasBN = BigNumber(parseFloat(gas).toString());
    gasBN = gasBN.plus(tip);
    const gasPriceWei = gasBN
      .multipliedBy(1000000000)
      .integerValue(BigNumber.ROUND_UP);
    return { gasPrice: gasPriceWei.toString() };
  } catch (err) {
    console.log(err);
  }
};

module.exports = getGasData;
