import { useState, useCallback } from "react";
import SideBar from "./side-bar";
import PortalDrawer from "./portal-drawer";
import { Web3Button } from "./wallet/Web3Button";
import { Link } from "react-router-dom";

const Header = () => {
  const [isSideBarOpen, setSideBarOpen] = useState(false);

  const onLogoClick = useCallback(() => {
    // Please sync "Create Story Sayfası" to the project
  }, []);

  const onMenuButtonCreateClick = useCallback(() => {
    // Please sync "Create Story Sayfası" to the project
  }, []);

  const openSideBar = useCallback(() => {
    setSideBarOpen(true);
  }, []);

  const closeSideBar = useCallback(() => {
    setSideBarOpen(false);
  }, []);

  return (
    <>
      <div className="self-stretch bg-darkgray box-border h-[80px] flex flex-col pt-2 px-0 pb-0 items-center justify-start border-b-[0.5px] border-solid border-neutral-80">
        <div className="self-stretch flex-1 flex flex-row py-0 px-[30px] items-center justify-between sm:flex-1">
          <Link
            className="no-underline cursor-pointer [border:none] p-0 bg-[transparent] flex flex-row items-center justify-center gap-[9.33px]"
            to="/"
          >
            <img
              className="relative w-[76.67px] h-[33.35px] md:hidden"
              alt=""
              src="/logovector1.svg"
            />
            <div className="flex flex-row items-center justify-center">
              <div className="relative text-11xl leading-[160%] font-semibold font-font text-white text-left">
                STORY
              </div>
              <div className="relative text-11xl leading-[160%] font-semibold font-font text-lightseagreen text-left">
                CHAIN
              </div>
            </div>
          </Link>
          <div className="self-stretch flex-1 flex flex-row items-center justify-end">
            <div className="self-stretch flex-1 flex flex-row items-center justify-end">
              <div className="self-stretch flex flex-row items-center justify-end gap-[10px] sm:hidden">
                <Link
                  to="/#about"
                  className="no-underline cursor-pointer [border:none] py-[3px] px-2.5 bg-[transparent] rounded-8xs flex flex-col items-center justify-center hover:bg-lightseagreen"
                >
                  <div className="relative text-base leading-[160%] font-font text-neutral-8o text-left">
                    About
                  </div>
                </Link>
                <Link
                  to="/#howto"
                  className="no-underline cursor-pointer [border:none] py-[3px] px-2.5 bg-[transparent] rounded-8xs flex flex-row items-center justify-center hover:bg-lightseagreen"
                >
                  <div className="relative text-base leading-[160%] font-font text-white text-left">
                    How To
                  </div>
                </Link>
                <Link
                  to="/#faq"
                  className="no-underline  cursor-pointer [border:none] py-[3px] px-2.5 bg-[transparent] rounded-8xs flex flex-col items-center justify-center hover:bg-lightseagreen"
                >
                  <div className="relative text-base leading-[160%] font-font text-white text-left">
                    FAQ
                  </div>
                </Link>
                {/* <Link
                  to="/nfts"
                  className="no-underline cursor-pointer [border:none] py-[3px] px-2.5 bg-[transparent] rounded-8xs flex flex-col items-center justify-center hover:bg-lightseagreen"
                >
                  <div className="relative text-base leading-[160%] font-font text-neutral-8o text-left">
                    User NFTs
                  </div>
                </Link> */}
                <Link
                  to="/stories"
                  className="no-underline cursor-pointer [border:none] py-[3px] px-2.5 bg-[transparent] rounded-8xs flex flex-col items-center justify-center hover:bg-lightseagreen"
                >
                  <div className="relative text-base leading-[160%] font-font text-neutral-8o text-left">
                    Explore
                  </div>
                </Link>
                <Link
                  className="no-underline cursor-pointer [border:none] py-[3px] px-2.5 bg-[transparent] rounded-8xs flex flex-col items-center justify-center hover:bg-lightseagreen"
                  to="/create"
                >
                  <div className="relative text-base leading-[160%] font-font text-neutral-8o text-left">
                    Create
                  </div>
                </Link>
                <Web3Button />
              </div>
            </div>
            <button
              className="cursor-pointer [border:none] py-[11px] px-[7px] bg-gainsboro rounded-8xs w-10 h-10 overflow-hidden shrink-0 hidden flex-col box-border items-center justify-center gap-[4px] sm:flex"
              onClick={openSideBar}
            >
              <div className="relative bg-black w-6 h-[3px] overflow-hidden shrink-0" />
              <div className="relative bg-black w-6 h-[3px] overflow-hidden shrink-0" />
              <div className="relative bg-black w-6 h-[3px] overflow-hidden shrink-0" />
            </button>
          </div>
        </div>
      </div>
      {isSideBarOpen && (
        <PortalDrawer
          overlayColor="rgba(113, 113, 113, 0.3)"
          placement="Left"
          onOutsideClick={closeSideBar}
        >
          <SideBar onClose={closeSideBar} />
        </PortalDrawer>
      )}
    </>
  );
};

export default Header;
