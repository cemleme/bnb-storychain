const util = require("util");
const exec = util.promisify(require("child_process").exec);
const { bucketName } = require("../../config");

const upload = async ({ type = "image/jpeg", filePath, fileName }) => {
  console.log("uploading");
  const command = `./lib/greenfield/gnfd-cmd -p ./lib/greenfield/password.txt object put --contentType ${type} --visibility public-read ${filePath} gnfd://${bucketName}/${fileName}`;

  const result = await exec(command);
  if (result.stdout.includes(`put object ${fileName} successfully`)) {
    console.log(`${fileName} successfully uploaded`);
    return true;
  } else {
    console.log(result);
    return false;
  }
};

module.exports = upload;
