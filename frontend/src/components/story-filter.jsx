const StoryFilter = () => {
  return (
    <div className="self-stretch flex flex-row py-1 items-center justify-end gap-[10px] border-b-[0.5px] border-solid border-teal sm:hidden">
      <select
        className="w-[200px] rounded-3xl px-2 py-1 bg-transparent text-silver-300 border-2 border-solid border-teal"
        name="category"
        id="category"
      >
        <option disabled selected>
          Category
        </option>
        <option value="All">Category: All</option>
        <option value="Children's Stories">Children's Stories</option>
        <option value="Other Stories">Other Stories</option>
      </select>
      <select
        className="w-[200px] rounded-3xl px-2 py-1 bg-transparent text-silver-300 border-2 border-solid border-teal"
        name="imageAI"
        id="imageAI"
      >
        <option disabled selected>
          Image AI Model
        </option>
        <option value="All">All</option>
        <option value="DreamShaper">DreamShaper</option>
        <option value="SDXL">SDXL</option>
        <option value="Pastel Anime">Pastel Anime</option>
      </select>
      <select
        className="w-[200px] rounded-3xl px-2 py-1 bg-transparent text-silver-300 border-2 border-solid border-teal"
        name="imageStyle"
        id="imageStyle"
      >
        <option disabled selected>
          Image Style
        </option>
        <option value="All">All</option>
        <option value="colored">colored</option>
        <option value={`b&w sketch`}>{`b&w sketch`}</option>
      </select>
      <select
        className="w-[200px] rounded-3xl px-2 py-1 bg-transparent text-silver-300 border-2 border-solid border-teal"
        name="storyAI"
        id="storyAI"
      >
        <option disabled selected>
          Story AI
        </option>
        <option value="All">All</option>
        <option value="ChatGPT v3.5">ChatGPT v3.5</option>
        <option value="ChatGPT v4">ChatGPT v4</option>
      </select>
    </div>
  );
};

export default StoryFilter;
