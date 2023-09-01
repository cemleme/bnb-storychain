const util = require("util");
const exec = util.promisify(require("child_process").exec);
const { bucketName } = require("../../config");

const deleteObject = async ({ fileName }) => {
  const command = `./lib/greenfield/gnfd-cmd -p ./lib/greenfield/password.txt object rm gnfd://${bucketName}/${fileName}`;
  const result = await exec(command);
  if (result.stdout.includes(`delete object ${fileName} successfully`)) {
    console.log(`${fileName} successfully deleted`);
    return true;
  } else {
    console.log(result);
    return false;
  }
};

module.exports = deleteObject;
