# StoryChain

Try at https://bnb.storychain.ai/

**StoryChain**, a new take on the ages old classic chain of stories, where different users in turn create a story collaboratively. The system supports **multiple AI alternatives** for users to choose from, creating a dynamic ecosystem. For consistency reason, once a story is created with a specific AI, it continues using it.

Using this dapp, users create stories that have unique chapters and arts using web3, AI, NFTs, BNB Greenfield. Each page can belong to a different user.

Once a user creates a story, they define the category (such as if it is a childrens' story), select the story AI and also the image generation AI. Once the story is created, users simply read the previous chapters and enter a prompt however they wish to continue.

So a story is created collaboratively by the users and each page belongs to one user with unique story and art. More if it, this page itself is minted as an **NFT** for the user; which can be visited on opBNB Explorer and NFT Marketplaces.

## Instructions

Contracts:

- Update .env to add 
  privateKey=
- To deploy: npx hardhat run scripts/deploy.js --network opbnb

Backend:

- Update contractAddress, greenfield bucket name and greenfield SP address @ backend/config.js
- Update backend/.env to add keys
  openAiKey=
  privateKey=
  leonardo_key=

- Start using: node run.js (inside backend folder)

Frontend:

- Update contractAddress @ frontend/constants.js
- Start using npm run dev (inside frontend folder)

## Inspiration

Always wanted to participate on chain stories where different users write paragraphs combining into a collaborative story; but I lacked the writing or drawing skills.
Thanks to the development of AI this is no longer a problem as a **language AI** can write a story and **image generation AI** can create the art.
The system supports **multiple AI alternatives** for users to choose from, creating a dynamic ecosystem. For consistency reason, once a story is created with a specific AI, it continues using it.

## What it does

**StoryChain**, a new take on the ages old classic chain of stories, where different users collaboratively create stories.

Using this dapp, users create stories that have unique chapters and arts using web3, AI, NFTs, BNB Greenfield. Each page can belong to a different user.

Once a user creates a story, they define the category (such as if it is a childrens' story), select the story AI and also the image generation AI. Once the story is created, users simply read the previous chapters and enter a prompt however they wish to continue.

So a story is created collaboratively by the users and each page belongs to one user with unique story and art. More if it, this page itself is minted as an **NFT** for the user; which can be visited on opBNB Explorer and NFT Marketplaces.

![Chapter](https://d112y698adiu2z.cloudfront.net/photos/production/software_photos/002/501/394/datas/original.png)

## Technologies

- opBNB Testnet Blockchain
- BNB Greenfield
- ChatGPT for AI Story Generation
- LeonardoAI - StableDiffusion models for AI Image Generation
- AWS for hosting NodeJS backend
- React for frontend

![Chapter](https://d112y698adiu2z.cloudfront.net/photos/production/software_photos/002/501/141/datas/original.png)

## How I built it

Once the prompt is entered, NodeJS backend server running on **AWS** catches the emitted events from the contract and applies multiple steps on it;

- Checks if the prompt is suitable for the category (For an example if it's a children's story and the user asked the character to burn down a forest, the prompt is rejected)
- It gets the latest story data from **BNB Greenfield**,
- Providing entire story to chatgpt, asks to create a new chapter that would fit the continuity, and also create a prompt for ai image generator
- AI Image generator generates an image for our chapter
- Then we upload the image to BNB Greenfield
- Upload the entire story with new chapter and the image to BNB Greenfield
- Then submit these BNB Greenfield hashes to the contract
- And finally the contract mints an NFT for the author of the new chapter

The metadata for the NFT items is stored on-chain and BNB Greenfield. After an update on the story, user's chapter now have the story and the image, and this chapter also belongs to the author as an NFT. We can also view this NFT or other chapters or other books on opBNB Explorer and NFT Marketplaces. The story metadata on BNB Greenfield is also available to view.

Another option for creating a story is using the **voting mechanism**. When creating a story, user can select if the future entries to the story requires voting. This way each story becomes a DAO itself.
When a user wants to continue to the story, they enter their prompt.
Then in a certain period, NFT owners submit their votes to their favorite prompt, creator having an extra half vote to break the equal votes. At the end of the voting period, prompt with the highest vote is used to continue the story, minting the NFT to the elected prompt owner.
This way as the story grows, a larger community forms within, increasing the chance of higher quality prompts to be entered. Other users can choose to buy NFTs from the authors to have a vote in the decision.

## Challenges I ran into && What I learned

I used many different tools for this project. Learning AI prompts, language AI API, Image Generation API and their prompt engineering was a challenge.

## Accomplishments that I'm proud of

I always wanted to participate in chain stories but always lacked the talent. This time while developing this project I had tremendous fun.

## What's next for StoryChain

The project can only go forwards. Of course many aspects of the project depends on the improvements of AI models, especially the speed of image generation; but the project still have some way to go. Such as trying to use better prompts on handling consistence character arts between pages and better story telling prompts.

## Repos

Demo: https://bnb.storychain.ai