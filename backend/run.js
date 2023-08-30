const { ethers } = require("ethers");
const { JsonRpcProvider } = require("@ethersproject/providers");
const { Wallet } = require("@ethersproject/wallet");
const axios = require("axios");
const abi = require("./abi.json");
const getProviderEvents = require("./lib/getProviderEvents");
require("dotenv").config();
const generateStory = require("./lib/generateStory");
const generateImage = require("./lib/generateImage");
const prepareNftMetadata = require("./lib/prepareNftMetadata");
const prepareStoryMetadata = require("./lib/prepareStoryMetadata");
let {
  contractAddress,
  lastProviderBlock,
  bucketName,
  greenfieldSPAddress,
} = require("./config");

const provider = new JsonRpcProvider("https://opbnb-testnet-rpc.bnbchain.org");
const signer = new Wallet(process.env.privateKey, provider);
const contract = new ethers.Contract(contractAddress, abi, signer);

const hashCache = {};

const llms = ["gpt-3.5-turbo", "gpt-4"];

const sleep = function (ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};

const getLogs = async () => {
  const { result: providerEvents, toBlock: newToBlock } =
    await getProviderEvents({
      provider,
      contractAddress,
      startingBlock: lastProviderBlock,
    });
  if (!providerEvents) {
    await sleep(2000);
    return getLogs();
  }
  console.log("provider events:", providerEvents.length);
  try {
    for (let i = 0; i < providerEvents.length; i++) {
      if (!hashCache[providerEvents[i].hash]) {
        hashCache[providerEvents[i].hash] = true;
        await handleStory(providerEvents[i]);
      }
    }
    lastProviderBlock = newToBlock + 1;
    await sleep(5000);
    getLogs();
  } catch (err) {
    console.log(err);
    await sleep(5000);
    getLogs();
  }
};

getLogs();

const handleStory = async ({ nonce, author, prompt, page }) => {
  const storyData = await contract.stories(nonce.toString());
  const currentPage = storyData[1].toString();
  const pages = parseInt(storyData[1].toString()) + 1;
  const pageLimit = parseInt(storyData[2].toString());
  const category = storyData[3].toString();
  const title = storyData[5];
  const updating = storyData[7];
  const storyAIid = parseInt(storyData[9].toString());
  const imageAIid = parseInt(storyData[10].toString());
  const imageStyleid = parseInt(storyData[11].toString());

  const llm = llms.length > storyAIid ? llms[storyAIid] : llms[0];

  if (currentPage != page) {
    console.log("this event belongs to an old page, skip...");
    return;
  }

  if (!updating) {
    console.log("the story is not updating, cant change anything");
    return;
  }

  console.log("handling story", { nonce, prompt, author });

  const {
    story,
    characterBackground,
    characterDescription,
    storyPage,
    pageSummary,
    storyMessages,
  } = await generateStory({
    category,
    prompt,
    nonce,
    pages,
    llm,
  });

  if (!story.approved) {
    console.log("rejecting the prompt");
    const tx = await contract.rejectPrompt(nonce.toString(), {
      from: signer.address,
    });
    console.log("txhash:", tx.hash);
    return;
  }

  const id = parseInt(nonce) * 10000 + pages;

  await generateImage({
    category,
    imageAIid,
    imageStyleid,
    id,
    imagePrompt: story.imagePrompt,
  });

  await prepareNftMetadata({
    title,
    storyPage,
    id,
    author,
    pages,
    nonce,
  });

  await prepareStoryMetadata({
    title,
    nonce,
    pages,
    characterDescription,
    characterBackground,
    storyMessages,
    author,
    prompt,
    imagePrompt: story.imagePrompt,
    storyPage,
    pageSummary,
    id,
  });

  try {
    const tx = await contract.updateStory(
      nonce.toString(),
      author,
      greenfieldSPAddress + bucketName + "/" + id + ".jpg",
      pages.toString(),
      {
        from: signer.address,
      }
    );
    console.log("txhash:", tx.hash);
  } catch (err) {
    console.log(err.message);
  }
};
