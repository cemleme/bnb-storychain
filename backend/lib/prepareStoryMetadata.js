const fs = require("fs");
const upload = require("./greenfield/uploadGreenfield");
const deleteObject = require("./greenfield/deleteGreenfield");
const urlExists = require("./urlExists");
const { bucketName, greenfieldSPAddress } = require("../config");

const prepareStoryMetadata = async ({
  title,
  nonce,
  pages,
  characterDescription,
  characterBackground,
  storyMessages,
  summary,
  author,
  prompt,
  imagePrompt,
  storyPage,
  id,
}) => {
  const fileName = "story" + nonce + ".json";
  if (
    pages > 1 &&
    (await urlExists(
      greenfieldSPAddress + bucketName + "/story" + nonce + ".json"
    ))
  ) {
    await deleteObject({ bucketName, fileName });
  }

  storyMessages.push({
    author,
    userPrompt: prompt,
    page: storyPage,
    imagePrompt,
    image: greenfieldSPAddress + bucketName + "/" + id + ".jpg",
    nftMetadata: greenfieldSPAddress + bucketName + "/" + id + ".json",
  });

  const storyMetadata = {
    id: nonce,
    date: new Date(),
    characterDescription,
    characterBackground,
    messages: storyMessages,
    summary,
    title,
    pages,
  };

  const filePath = "./tmp/storyMetadata.json";

  fs.writeFileSync(filePath, JSON.stringify(storyMetadata));

  await upload({
    type: "application/json",
    filePath,
    bucketName: "test",
    fileName,
  });
};

module.exports = prepareStoryMetadata;
