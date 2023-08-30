import React from "react"

function ExampleImage({ path }) {
  return (
    <div className="rounded-[25px] bg-color flex flex-row p-[5px] items-end justify-start">
      <img
        src={path}
        alt="Example Generation"
        width={185}
        height={247}
        className="rounded-[20px] w-[185px] h-[247px] object-cover mix-blend-normal"
      />
    </div>
  )
}

export default ExampleImage
