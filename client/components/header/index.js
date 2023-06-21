import { useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
// assets
import LogoFile from "assets/svgs/logo.svg";
// hooks
import useWindowDimensions from "hooks/useWindowDimensions";
// components
import Caption from "components/caption";
import { IoSearch } from "react-icons/io5";
const Logo = dynamic(() => import("components/logo"), { ssr: false });
const SearchModal = dynamic(() => import("components/search"), { ssr: false });

export default function CustomHeader() {
  const { width } = useWindowDimensions();
  const [showSearch, setShowSearch] = useState(false);
  return (
    <header className="relative flex flex-row items-center justify-between py-5 md:pt-10 mb:mb-10 w-auto px-5 h-auto top-0 z-50 container max-w-[900px]">
      <div className="flex items-center justify-between">
        <Link href="/" className="flex items-center justify-center gap-2 no-underline	text-white">
          {width > 767 ? (
            <Logo height="30" width="30" alt={"Mors"} LogoFile={LogoFile} />
          ) : (
            <Logo height="25" width="25" alt={"Mors"} LogoFile={LogoFile} />
          )}
          <Caption text className={"text-2xl md:text-3xl text-white"}>
            mors
          </Caption>
        </Link>
      </div>
      <div className="flex items-center justify-center bg-white px-2 py-1 rounded-2xl">
        <div
          className="text-xl md:text-3xl leading-3 text-center text-black cursor-pointer flex items-center justify-center"
          onClick={() => setShowSearch(true)}
        >
          <IoSearch className="ml-2" />
          <Caption text style={{ color: "black" }}>
            search
          </Caption>
        </div>
        <SearchModal open={showSearch} setOpen={setShowSearch} />
      </div>
    </header>
  );
}
