const Axios = require("axios");
require("dotenv").config();
const promptContinue = require("./prompt/promptContinue");
const promptNew = require("./prompt/promptNew");
const { bucketName, greenfieldSPAddress } = require("../config");

const sleep = function (ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};

const generateStory = async ({ category, prompt, nonce, pages, llm }) => {
  const create = pages === 1;
  let combinedMessages;
  let characterDescription;
  let characterBackground;
  let storyMessages = [];

  if (pages > 1) {
    const storyResponse = await Axios.get(
      greenfieldSPAddress + bucketName + "/story" + nonce + ".json"
    );
    storyMessages = storyResponse.data.messages;
    characterDescription = storyResponse.data.characterDescription;
    characterBackground = storyResponse.data.characterBackground;

    combinedMessages = "";
    storyMessages.map((m, i) => {
      if (i == 0 || i == storyMessages.length - 1)
        combinedMessages += m.page + " ";
      else if (m.summary) combinedMessages += m.summary + " ";
    });
  }

  const safetyPrompt = category == "0" ? "kids friendly" : "safe for working";

  let chatgptMessages = create
    ? promptNew({ prompt, safetyPrompt })
    : promptContinue({
        prompt,
        safetyPrompt,
        previousStory: combinedMessages,
        characterDescription,
      });

  console.log(chatgptMessages);

  const openAIRequest = await fetch(
    "https://api.openai.com/v1/chat/completions",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.openAiKey}`,
      },
      body: JSON.stringify({
        model: llm,
        messages: chatgptMessages,
        temperature: 0.2,
      }),
    }
  );

  const openAiResult = await openAIRequest.json();
  const newMessage = openAiResult.choices[0].message;
  console.log(newMessage);

  if (newMessage.content[0] != "{") {
    console.log("adding { to the newMessage start");
    newMessage.content = "{" + newMessage.content;
  }
  if (newMessage.content[newMessage.content.length - 1] != "}") {
    console.log("adding } to the newMessage ending");
    newMessage.content = newMessage.content + "}";
  }

  let story = JSON.parse(newMessage.content);

  characterBackground = story.characterBackground || characterBackground;
  characterDescription = story.characterDescription || characterDescription;
  const storyPage = story.characterDescription
    ? story.characterDescription +
      "\n " +
      story.characterBackground +
      "\n " +
      story.story
    : story.story;
  const pageSummary = story.summary;

  return {
    story,
    characterBackground,
    characterDescription,
    storyPage,
    pageSummary,
    storyMessages,
  };
};

module.exports = generateStory;
