import { HeroSection } from "./components/landing/hero-section";
import SectionSubscribe from "./components/landing/subscribe";
import SectionAbout from "./components/landing/about";
import SectionHowTo from "./components/landing/howto";
import SectionStyles from "./components/landing/styles";
import SectionRoadMap from "./components/landing/roadmap";
import SectionFAQ from "./components/landing/faq";
import { useLocation } from "react-router-dom";
import { useEffect, useRef } from "react";

function Landing() {
  const location = useLocation();
  const aboutRef = useRef(null);
  const aboutHowto = useRef(null);
  const aboutFaq = useRef(null);
  useEffect(() => {
    if (location.hash) {
      if (location.hash === "#about") {
        window.scrollTo({
          top: aboutRef.current.offsetTop,
          left: 0,
          behavior: "smooth",
        });
      } else if (location.hash === "#howto") {
        window.scrollTo({
          top: aboutHowto.current.offsetTop,
          left: 0,
          behavior: "smooth",
        });
      } else if (location.hash === "#faq") {
        window.scrollTo({
          top: aboutFaq.current.offsetTop,
          left: 0,
          behavior: "smooth",
        });
      }
    }
  }, [location]);

  return (
    <>
      <HeroSection />
      <SectionSubscribe />
      <div ref={aboutRef}>
        <SectionAbout />
      </div>
      <div ref={aboutHowto}>
        <SectionHowTo />
      </div>
      <SectionStyles />
      <SectionRoadMap />
      <div ref={aboutFaq}>
        <SectionFAQ />
      </div>
    </>
  );
}

export default Landing;
