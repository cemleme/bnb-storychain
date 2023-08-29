require("dotenv").config();
const upload = require("./greenfield/uploadGreenfield");
const downloadImage = require("./downloadImage");
const deleteObject = require("./greenfield/deleteGreenfield");
const sdk = require("api")("@leonardoai/v1.0#28807z41owlgnis8jg");
const { bucketName, greenfieldSPAddress } = require("../config");
const urlExists = require("./urlExists");

sdk.auth(process.env.leonardo_key);

const negative_prompt =
  "2 heads, 2 faces, 3 feet, 4 feet, cropped image, out of frame, deformed hands, twisted fingers, cross eyes, weird eyes, dead eyes, double image, malformed hands, multiple heads, extra limb, ugly, poorly drawn hands, missing limb, disfigured, cut off, ugly, grain, low res, deformed, blurry, bad anatomy, disfigured, poorly drawn face, mutation, mutated, floating limbs, disconnected limbs, disgusting, poorly drawn, mutilated, mangled, extra fingers, duplicate artifacts, missing arms, mutated hands, mutilated hands, cloned face, malformed, text, fonts, letters, symbols, logo, wordmark, writing, heading, signature, watermark, stamp";

const sleep = function (ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};

const models = {
  dreamshaper: {
    id: "ac614f96-1082-45bf-be9d-757f2d31c174",
    width: 640,
    height: 832,
    promptAddition: "",
  },
  sdxl: {
    id: "b63f7119-31dc-4540-969b-2a9df997e173",
    width: 1024,
    height: 768,
    promptAddition: "",
  },
  pastelanime: {
    id: "1aa0f478-51be-4efd-94e8-76bfc8f533af",
    width: 512,
    height: 512,
    promptAddition: "anime.",
  },
  pixar: {
    id: "d69c8273-6b17-4a30-a13e-d6637ae1c644",
    width: 640,
    height: 832,
    promptAddition: "3d render.",
  },
  rpg: {
    id: "f1929ea3-b169-4c18-a16c-5d58b4292c69",
    width: 640,
    height: 832,
    promptAddition: "rpg frp style.",
  },
  pixelart: {
    id: "e5a291b6-3990-495a-b1fa-7bd1864510a6",
    width: 512,
    height: 512,
    promptAddition: "pixel art.",
  },
  deliberate: {
    id: "458ecfff-f76c-402c-8b85-f09f6fb198de",
    width: 640,
    height: 832,
    promptAddition: "",
  },
};

const modelNames = Object.keys(models);

const styles = [
  "regular",
  "colored sketch",
  "black and white sketch",
  "anime",
  "3d render",
  "children's book illustration",
  "illustration",
  "photography",
  "retro",
  "ultra realistic",
  "sci fi",
];

const generate = async ({
  category,
  imageAIid,
  imageStyleid,
  imagePrompt,
  id,
}) => {
  const model =
    modelNames.length > imageAIid
      ? models[modelNames[imageAIid]]
      : models.dreamshaper;
  const style = styles.length > imageStyleid ? styles[imageStyleid] : styles[0];

  let positivePrompt = model.promptAddition + " " + style + " " + imagePrompt;
  if (category === 0) positivePrompt = "kids story. " + positivePrompt;

  const output = await sdk.createGeneration({
    prompt: positivePrompt,
    negative_prompt,
    modelId: model.id,
    width: model.width,
    height: model.height,
    num_images: 1,
    guidance_scale: 10,
    public: false,
    promptMagic: true,
  });

  const generationId = output.data.sdGenerationJob.generationId;
  let imageAIUri;

  //console.log(generationId);

  while (!imageAIUri) {
    const result = await sdk.getGenerationById({ id: generationId });
    if (
      result.data.generations_by_pk &&
      result.data.generations_by_pk.generated_images &&
      result.data.generations_by_pk.generated_images[0]
    )
      imageAIUri = result.data.generations_by_pk.generated_images[0].url;
    else {
      console.log("leonardo image not ready yet, wait more...");
      await sleep(5000);
    }
  }

  console.log(imageAIUri);

  if (await urlExists(greenfieldSPAddress + bucketName + "/" + id + ".jpg")) {
    try {
      console.log("image file already exsists, so deleting from greenfield.");
      await deleteObject({ bucketName, fileName: id + ".jpg" });
    } catch (err) {
      console.log("error on deleting old Image");
      console.log(err);
    }
  }

  try {
    await downloadImage(imageAIUri, "./tmp/tmp.jpg");
  } catch (err) {
    console.log("error on downloading Image");
    console.log(err);
  }
  console.log("downloaded Image to tmp.jpg");
  try {
    await upload({
      type: "image/jpeg",
      filePath: "./tmp/tmp.jpg",
      fileName: id + ".jpg",
    });
  } catch (err) {
    console.log("error on uploading image");
    console.log(err);
  }
  console.log("uploaded image to greenfield");

  return true;
};

module.exports = generate;
