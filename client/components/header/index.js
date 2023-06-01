import { useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
// assets
import LogoFile from "assets/svgs/logo.svg";
// components
import Caption from "components/caption";
import { IoSearchCircle, IoPersonCircle } from "react-icons/io5";
const Logo = dynamic(() => import("components/logo"), { ssr: false });
const SearchModal = dynamic(() => import("components/search"), { ssr: false });

export default function CustomHeader() {
  const [showSearch, setShowSearch] = useState(false);
  return (
    <header className="relative flex flex-row items-center justify-between pt-10 mb-5 w-auto px-5 h-auto top-0 z-50 container max-w-[900px]">
      <div className="flex items-center justify-between">
        <Link href="/" className="flex items-center justify-center gap-2 no-underline	text-gray-100">
          <Logo height="30" width={30} alt={"Giraffe Fries"} LogoFile={LogoFile} />
          <Caption text className={"text-3xl text-gray-100"}>
            mors
          </Caption>
        </Link>
      </div>
      <div className="flex items-center justify-center">
        <div className="text-4xl leading-3 text-center text-gray-100 cursor-pointer">
          <IoSearchCircle onClick={() => setShowSearch(true)} />
          <SearchModal open={showSearch} setOpen={setShowSearch} />
        </div>
        <Link
          href={"/login"}
          className="text-[2.1rem] leading-3 text-center text-gray-100 cursor-pointer h-[2.1rem]"
        >
          <IoPersonCircle />
        </Link>
      </div>
    </header>
  );
}
