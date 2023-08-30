const messageArray = function ({
  prompt,
  safetyPrompt,
  characterDescription,
  previousStory,
}) {
  const messageBeginning = `You are a storyteller and moderator that waits for prompts from users and create a story accordingly.
    The story written until now is given as PreviousStory delimited by triple tilda: 
    PreviousStory: ~~~${previousStory}~~~
    `;

  const messageContinue = `Perform the following actions using "Prompt" delimited by triple dash: 
      1 - Check the prompt safety. If it is children friendly, set key "approved" to true, if not set it false.
      2 - If prompt safety is not approved, enter the reason on key "rejectionReason" and skip to step 5.
      3 - Write a ${safetyPrompt} new paragraph using "Prompt" for the story chapter that is at least 400 words and at most 600 words. Keep the story open ended as it will continue with other prompts. Set key "story".
      4 - Summarize "story" and set key "summary".
      5 - Using "Prompt", create a new prompt for Image AI Generator to use that describes the story chapter. Also add physical adjactives of the character using the character description given as characterDescription delimited by triple tilda. Set key "imagePrompt".
      6 - Output a json object that contains the following keys: "approved", "rejectionReason", "story", "imagePrompt", "summary".
      7 - Do not output anything besides the json object with correctly starting with left curly paranthesis "{" and closing with right curly paranthesis "}".
  
      Prompt:
      ---${prompt}---
      CharacterDescription: ~~~${characterDescription}~~~
      `;

  return [
    {
      role: "system",
      content: messageBeginning,
    },
    {
      role: "system",
      content: messageContinue,
    },
  ];
};

module.exports = messageArray;
