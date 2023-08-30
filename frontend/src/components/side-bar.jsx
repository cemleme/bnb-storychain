import { useCallback, useEffect } from "react"
import { Web3Button } from "./wallet/Web3Button"

const SideBar = ({ onClose }) => {
  useEffect(() => {
    const scrollAnimElements = document.querySelectorAll("[data-animate-on-scroll]")
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting || entry.intersectionRatio > 0) {
            const targetElement = entry.target
            targetElement.classList.add("animate")
            observer.unobserve(targetElement)
          }
        }
      },
      {
        threshold: 0.15,
      }
    )

    for (let i = 0; i < scrollAnimElements.length; i++) {
      observer.observe(scrollAnimElements[i])
    }

    return () => {
      for (let i = 0; i < scrollAnimElements.length; i++) {
        observer.unobserve(scrollAnimElements[i])
      }
    }
  }, [])

  const onLogoClick = useCallback(() => {
    // Please sync "Create Story Sayfası" to the project
  }, [])

  return (
    <div
      className="relative bg-gray-100 box-border w-[266px] h-full overflow-hidden flex flex-col pt-6 px-6 pb-8 items-start justify-between [&.animate]:animate-[0.25s_ease_0s_1_normal_forwards_slide-in-left] opacity-[0] max-w-[90%] text-left text-xl text-gray-shades-light-gray-2 font-font border-r-[1px] border-solid border-gray-shades-dark-shade"
      data-animate-on-scroll
    >
      <div className="self-stretch flex-1 flex flex-col items-start justify-start gap-[44px]">
        <button
          className="cursor-pointer [border:none] p-0 bg-[transparent] self-stretch flex flex-col items-center justify-center gap-[9.33px]"
          onClick={onLogoClick}
        >
          <img className="relative w-[153.34px] h-[66.7px]" alt="" src="/logovector.svg" />
          <div className="flex flex-row items-center justify-center">
            <div className="relative text-11xl leading-[160%] font-semibold font-font text-white text-left">
              STORY
            </div>
            <div className="relative text-11xl leading-[160%] font-semibold font-font text-lightseagreen text-left">
              CHAIN
            </div>
          </div>
        </button>
        <div className="self-stretch flex-1 flex flex-col items-start justify-start">
          <div className="self-stretch rounded-lg flex flex-col p-4 items-center justify-center">
            <div className="relative leading-[140%]">About</div>
          </div>
          <div className="self-stretch rounded-lg flex flex-col p-4 items-center justify-center">
            <div className="relative leading-[140%]">How To</div>
          </div>
          <div className="self-stretch rounded-lg flex flex-col p-4 items-center justify-center">
            <div className="relative leading-[140%]">FAQ</div>
          </div>
          <div className="self-stretch rounded-lg flex flex-col p-4 items-center justify-center">
            <div className="relative leading-[140%]">Explore</div>
          </div>
          <div className="self-stretch rounded-lg flex flex-col p-4 items-center justify-center">
            <div className="relative leading-[140%]">Create</div>
          </div>
        </div>
      </div>
      <div className="self-stretch flex flex-row items-center justify-center">
        <Web3Button />
      </div>
    </div>
  )
}

export default SideBar
