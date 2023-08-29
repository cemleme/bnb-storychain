const messageArray = function ({ prompt, safetyPrompt }) {
  const messageNew = `You are a storyteller and moderator that waits for prompts from users and create a story accordingly.
      Perform the following actions using "Prompt" delimited by triple dash: 
      1 - Check the prompt safety for being ${safetyPrompt}, set key "approved" to true, if not set it false.
      2 - If prompt safety is not approved, enter the reason on key "rejectionReason" and skip to step 7.
      3 - Create a character description using physical attributes and adjectives and set to key "characterDescription".
      4 - Create a character background story and set key "characterBackground".
      5 - Write a ${safetyPrompt} new paragraph for the story that is at least 300 words and at most 500 words. Keep the story open ended as it will continue with other prompts. Set key "story".
      6 - Create a prompt for Image AI Generator to use that describes the story chapter, include character physical description and include if the character is human or another race.
      7 - Output a json object that contains the following keys: "approved", "rejectionReason", "characterDescription", "characterBackground", "story", "imagePrompt".
      8 - Do not output anything besides the json object.
  
      Prompt:
      ---${prompt}---
      `;

  return [
    {
      role: "system",
      content: messageNew,
    },
  ];
};

module.exports = messageArray;
