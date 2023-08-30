import CreateStoryForm from "./create-story-form";
import CreateStoryExamples from "./create-story-examples";
import { useState } from "react";

const CreateStory = () => {
  const [model, setModel] = useState(0);
  const [style, setStyle] = useState(0);
  return (
    <div className="flex-1 rounded-[7.42px] bg-ffffff [backdrop-filter:blur(29.69px)] overflow-hidden flex flex-col py-[37px] px-[52px] items-center justify-start gap-[21px] sm:p-2.5 sm:box-border">
      <CreateStoryForm
        model={model}
        style={style}
        setStyle={setStyle}
        setModel={setModel}
      />
      <CreateStoryExamples model={model} style={style} />
    </div>
  );
};

export default CreateStory;
