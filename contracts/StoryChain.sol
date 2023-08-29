// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract StoryChain is Ownable, ERC721, ERC721Enumerable, ERC721URIStorage {
    error StoryChain__LessThanPageCost();
    error StoryChain__StoryOnlyAcceptsProposal();
    error StoryChain__NotOpenToProposals();
    error StoryChain__StoryNotStartedYet();
    error StoryChain__StoryIsAlreadyComplete();
    error StoryChain__StoryIsUpdatingCurrentPage();
    error StoryChain__AlreadyVotedOnThisPage();
    error StoryChain__VoterDoesntHaveNFTOnThisStory();
    error StoryChain__NoProposalOnThisIndex();
    error StoryChain__VotingPeriodIsNotOver();
    error StoryChain__NoProposalsForTheStory();
    error StoryChain__EnteredPageIsNotCurrentPage();
    error StoryChain__TransferFailed();

    struct Story {
        uint256 nonce;
        uint256 pages;
        uint256 pageLimit;
        uint256 category;
        address creator;
        string title;
        bool creationRejected;
        bool updating;
        bool voteFirst;
        uint256 llmId;
        uint256 imageAIid;
        uint256 imageStyleId;
    }

    struct PromptProposal {
        string prompt;
        address author;
        uint256 votes;
    }

    uint256 public nonce;
    mapping(uint256 => Story) public stories;

    uint256 public votePeriod = 1 days;
    mapping(uint256 => uint256) public storyLastUpdate;
    mapping(uint256 => PromptProposal[]) public proposedPrompts;
    mapping(uint256 => uint256) public currentTopPromptIndex;
    mapping(uint256 => uint256) public currentTopPromptVote;
    mapping(address => mapping(uint256 => bool)) public voteUsed;

    uint256 public fixedCost;
    uint256 public imageAICost;
    mapping(uint256 => uint256) public llmCost;

    event PromptEntered(
        string prompt,
        uint256 nonce,
        uint256 page,
        uint256 category,
        address author
    );
    event ProposalPromptEntered(
        string prompt,
        uint256 nonce,
        uint256 page,
        uint256 category,
        address author
    );

    event StoryUpdated(
        uint256 storyNonce,
        uint256 pages,
        address author,
        string nftURI
    );
    event PromptVoted(
        uint256 index,
        uint256 storyNonce,
        uint256 page,
        address voter
    );

    event UpdateFixedCost(uint256 cost);
    event UpdatellmCost(uint256 id, uint256 cost);
    event UpdateImageAICost(uint256 cost);

    constructor() ERC721("StoryChain", "STRY") {
        fixedCost = 200000000000000;
        llmCost[0] = 100000000000000;
        llmCost[1] = 1000000000000000;
        imageAICost = 500000000000000;
    }

    //-----------
    //GET FUNCTIONS
    //-----------

    function calculateCost(uint256 llmId) public view returns (uint256 cost) {
        cost = fixedCost + llmCost[llmId] + imageAICost;
    }

    function getCurrentPageId(
        uint256 storyNonce
    ) public view returns (uint256 pageId) {
        pageId = storyNonce * 10000 + stories[storyNonce].pages;
    }

    //-----------
    //STORY FUNCTIONS
    //-----------

    function createStory(
        string calldata prompt,
        string calldata title,
        uint256 category,
        uint256 pageLimit,
        uint256 llmId,
        uint256 imageAIid,
        uint256 imageStyleId,
        bool voteFirst
    ) public payable {
        if (msg.value < calculateCost(llmId))
            revert StoryChain__LessThanPageCost();

        Story storage s = stories[nonce];
        s.nonce = nonce;
        s.title = title;
        s.pageLimit = pageLimit;
        s.category = category;
        s.llmId = llmId;
        s.imageAIid = imageAIid;
        s.imageStyleId = imageStyleId;
        s.creator = msg.sender;
        s.voteFirst = voteFirst;
        s.updating = true;

        emit PromptEntered(prompt, nonce, 0, category, msg.sender);

        nonce++;
    }

    function continueStory(
        string calldata prompt,
        uint256 storyNonce
    ) public payable {
        Story storage s = stories[storyNonce];

        if (s.voteFirst) revert StoryChain__StoryOnlyAcceptsProposal();
        if (s.pages == 0) revert StoryChain__StoryNotStartedYet();
        if (s.pageLimit != 0 && s.pages == s.pageLimit)
            revert StoryChain__StoryIsAlreadyComplete();
        if (s.updating) revert StoryChain__StoryIsUpdatingCurrentPage();
        if (msg.value < calculateCost(s.llmId))
            revert StoryChain__LessThanPageCost();

        s.updating = true;
        emit PromptEntered(prompt, storyNonce, s.pages, s.category, msg.sender);
    }

    function proposePrompt(
        string memory prompt,
        uint256 storyNonce
    ) public payable {
        Story memory s = stories[storyNonce];
        if (!s.voteFirst) revert StoryChain__NotOpenToProposals();
        if (s.pages == 0) revert StoryChain__StoryNotStartedYet();
        if (s.pageLimit != 0 && s.pages == s.pageLimit)
            revert StoryChain__StoryIsAlreadyComplete();
        if (s.updating) revert StoryChain__StoryIsUpdatingCurrentPage();
        if (msg.value < calculateCost(s.llmId))
            revert StoryChain__LessThanPageCost();

        emit ProposalPromptEntered(
            prompt,
            storyNonce,
            s.pages,
            s.category,
            msg.sender
        );
    }

    //-----------
    //VOTING FUNCTIONS
    //-----------

    function voteForProposal(uint256 index, uint256 storyNonce) external {
        Story memory s = stories[storyNonce];
        if (s.updating) revert StoryChain__StoryIsUpdatingCurrentPage();
        uint256 pageId = getCurrentPageId(storyNonce);
        if (voteUsed[msg.sender][pageId])
            revert StoryChain__AlreadyVotedOnThisPage();
        voteUsed[msg.sender][pageId] = true;
        uint256 userVotePower = getUserVotePowerInStory(msg.sender, storyNonce);
        if (userVotePower == 0)
            revert StoryChain__VoterDoesntHaveNFTOnThisStory();
        if (index > proposedPrompts[pageId].length)
            revert StoryChain__NoProposalOnThisIndex();
        PromptProposal storage pp = proposedPrompts[pageId][index];

        pp.votes += userVotePower;
        if (pp.votes > currentTopPromptVote[pageId]) {
            currentTopPromptVote[pageId] = pp.votes;
            currentTopPromptIndex[pageId] = index;
        }

        emit PromptVoted(index, storyNonce, s.pages, msg.sender);
    }

    function executeTopProposal(uint256 storyNonce) public {
        Story storage s = stories[storyNonce];
        uint256 pageId = getCurrentPageId(storyNonce);
        if (block.timestamp < storyLastUpdate[storyNonce] + votePeriod)
            revert StoryChain__VotingPeriodIsNotOver();
        if (proposedPrompts[pageId].length == 0)
            revert StoryChain__NoProposalsForTheStory();

        PromptProposal memory pp = proposedPrompts[pageId][
            currentTopPromptIndex[pageId]
        ];
        s.updating = true;
        emit PromptEntered(
            pp.prompt,
            storyNonce,
            s.pages,
            s.category,
            pp.author
        );
    }

    //user vote power in the story is number of nfts on that story PLUS creator bonus to break the equalities
    function getUserVotePowerInStory(
        address user,
        uint256 storyNonce
    ) public view returns (uint256) {
        uint256 userVoteCount;
        Story memory s = stories[storyNonce];
        for (uint256 i = 0; i < s.pages; i++) {
            if (ownerOf(storyNonce * 10000 + s.pages) == user) {
                userVoteCount += 10;
            }
        }
        if (s.creator == user) userVoteCount += 1;
        return userVoteCount;
    }

    //-----------
    //OWNER FUNCTIONS
    //-----------

    //the prompt is set available to voting after AI checks if it is suitable for the category
    function addPromptForVotingAfterModeration(
        string memory prompt,
        uint256 storyNonce,
        address author
    ) external onlyOwner {
        uint256 pageId = getCurrentPageId(storyNonce);
        uint256 index = proposedPrompts[pageId].length;
        PromptProposal storage pp = proposedPrompts[pageId][index];
        pp.prompt = prompt;
        pp.author = author;
        pp.votes = 1;
        if (currentTopPromptVote[pageId] == 0) currentTopPromptVote[pageId] = 1;
    }

    //the prompt failed the moderation, reject it so other prompts can be entered
    function rejectPrompt(uint256 storyNonce) external onlyOwner {
        Story storage s = stories[storyNonce];
        s.updating = false;
        if (s.pages == 0) s.creationRejected = true;
    }

    //the prompt passed moderation and AI generated story and image, updating the story with the new page data
    function updateStory(
        uint256 storyNonce,
        address author,
        string memory nftURI,
        uint256 storyPage
    ) external onlyOwner {
        Story storage s = stories[storyNonce];
        if (storyPage != s.pages + 1)
            revert StoryChain__EnteredPageIsNotCurrentPage();
        storyLastUpdate[storyNonce] = block.timestamp;
        s.pages++;
        s.updating = false;

        uint256 nftId = storyNonce * 10000 + s.pages;
        _mint(author, nftId);
        _setTokenURI(nftId, nftURI);

        emit StoryUpdated(storyNonce, s.pages, author, nftURI);
    }

    //-------------
    //SETTER FUNCTIONS
    //-------------

    function setFixedCost(uint256 _cost) external onlyOwner {
        fixedCost = _cost;
        emit UpdateFixedCost(_cost);
    }

    function setllmCost(uint256 _id, uint256 _cost) external onlyOwner {
        llmCost[_id] = _cost;
        emit UpdatellmCost(_id, _cost);
    }

    function setImageAICost(uint256 _cost) external onlyOwner {
        imageAICost = _cost;
        emit UpdateImageAICost(_cost);
    }

    function recoverTreasury(address _to, uint256 _amount) external onlyOwner {
        (bool success, ) = _to.call{value: _amount}("");
        if (!success) revert StoryChain__TransferFailed();
    }

    //-------------
    //NFT FUNCTIONS
    //-------------

    function _burn(
        uint256 tokenId
    ) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function tokenURI(
        uint256 tokenId
    ) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(
        bytes4 interfaceId
    )
        public
        view
        override(ERC721, ERC721Enumerable, ERC721URIStorage)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId,
        uint256 batchSize
    ) internal override(ERC721, ERC721Enumerable) {
        super._beforeTokenTransfer(from, to, tokenId, batchSize);
    }
}
