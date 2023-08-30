import ExampleImage from "./example-image"

const CreateStoryExamples = ({model = 0, style = 0}) => {

  const imagePath = (i) => {
    const imageName = model.toString() + style.toString() + i.toString()
    return `/examples/${imageName}.jpg`
  }

  return (
    <div className="flex flex-col items-center justify-center gap-[20px] text-left text-lg text-white font-font sm:pl-5 sm:pr-5 sm:box-border">
      <div className="relative leading-[160%] md:text-md md:self-stretch md:w-auto sm:text-base sm:text-center">
        Example generations using selected Image AI model and style:
      </div>
      <div className="flex flex-row items-end justify-start gap-[20px] sm:self-stretch sm:w-auto sm:flex-col sm:items-center sm:justify-start">
        <ExampleImage path={imagePath(1)} />
        <ExampleImage path={imagePath(2)} />
        <ExampleImage path={imagePath(3)} />
      </div>
    </div>
  )
}

export default CreateStoryExamples
