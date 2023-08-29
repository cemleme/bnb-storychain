const Axios = require("axios");
const fs = require("fs");

const downloadImage = async (url, filepath) => {
  const response = await Axios({
    url,
    method: "GET",
    responseType: "stream",
  });
  return new Promise((resolve, reject) => {
    response.data
      .pipe(fs.createWriteStream(filepath))
      .on("error", reject)
      .once("close", () => resolve(filepath));
  });
};

module.exports = downloadImage;
