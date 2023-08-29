const { ethers } = require("ethers");
const abi = require("../abi.json");
require("dotenv").config();
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

let iface = new ethers.Interface(abi);
const topicPrompt = ethers.id(
  "PromptEntered(string,uint256,uint256,uint256,address)"
);

const blockSteps = 100000;

const getEvents = async ({ provider, contractAddress, startingBlock }) => {
  let currentBlock;
  try {
    currentBlock = await provider.getBlockNumber();
  } catch (err) {
    console.log(err);
    return { logs: [] };
  }
  let toBlock = startingBlock + blockSteps;
  if (toBlock > parseInt(currentBlock)) toBlock = currentBlock;

  if (startingBlock >= toBlock) return { logs: [] };
  console.log("checking blocks between", startingBlock, toBlock);

  let logs = await provider.getLogs({
    fromBlock: startingBlock,
    toBlock,
    address: contractAddress,
    topics: [topicPrompt],
  });
  //console.log(logs);

  const result = [];

  for (let i = 0; i < logs.length; i++) {
    const txHash = logs[i].transactionHash;
    const txreceipt = await provider.getTransactionReceipt(txHash);

    let logToParse = txreceipt.logs.find((l) => l.topics[0] === topicPrompt);
    if (logToParse) {
      const event = iface.parseLog(logToParse);

      result.push({
        prompt: event.args[0],
        nonce: event.args[1].toString(),
        page: event.args[2].toString(),
        category: event.args[3].toString(),
        author: event.args[4],
        block: toBlock,
        hash: txHash,
      });
    }
  }

  return {result, toBlock };
};

module.exports = getEvents;
