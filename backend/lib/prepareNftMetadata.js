const fs = require("fs");
const upload = require("./greenfield/uploadGreenfield");
const deleteObject = require("./greenfield/deleteGreenfield");
const { bucketName, greenfieldSPAddress } = require("../config");
const urlExists = require("./urlExists");

const prepareNftMetadata = async ({
  title,
  storyPage,
  author,
  id,
  pages,
  nonce,
}) => {
  const imageURI = greenfieldSPAddress + bucketName + "/" + id + ".jpg";

  if (await urlExists(greenfieldSPAddress + bucketName + "/" + id + ".json")) {
    await deleteObject({ bucketName, fileName: id + ".json" });
  }

  const nftMetadata = {
    title,
    name: title + " Page " + pages,
    description: storyPage,
    image: imageURI,
    author,
    nonce,
    id,
  };

  const filePath = "./tmp/nftMetadata.json";

  fs.writeFileSync(filePath, JSON.stringify(nftMetadata));

  await upload({
    type: "application/json",
    filePath,
    bucketName: "test",
    fileName: id + ".json",
  });
};

module.exports = prepareNftMetadata;
