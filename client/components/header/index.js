import { useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import Link from "next/link";
// redux
import { connect, useDispatch } from "react-redux";
import { LOGOUT, RESET } from "store/names";
// api
import AxiosInstance from "apis/instance";
// assets
import LogoFile from "assets/svgs/logo.svg";
// hooks
import useWindowDimensions from "hooks/useWindowDimensions";
// components
import Caption from "components/caption";
import { IoSearch, IoLogOut } from "react-icons/io5";
import { Avatar, Dropdown } from "antd";
const Logo = dynamic(() => import("components/logo"), { ssr: false });
const SearchModal = dynamic(() => import("components/search"), { ssr: false });

function CustomHeader({ avatar }) {
  const dispatch = useDispatch();
  const router = useRouter();
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
      <div className="flex items-center justify-center">
        <div
          className="text-xl md:text-3xl leading-3 text-center text-black cursor-pointer flex items-center justify-center bg-white px-2 py-1 rounded-2xl"
          onClick={() => setShowSearch(true)}
        >
          <IoSearch className="ml-2" />
          <Caption text style={{ color: "black" }}>
            search
          </Caption>
        </div>
        <div className="rounded-full bg-white p-0.5 md:p-0 cursor-pointer mr-2">
          <Dropdown
            menu={{
              items: [
                {
                  key: "2",
                  label: (
                    <div
                      className="flex items-center gap-2 text-white"
                      onClick={() => {
                        dispatch({ type: LOGOUT });
                        dispatch({ type: RESET });
                        AxiosInstance.defaults.headers.common["x-auth-token"] = undefined;
                        router.push("/login");
                      }}
                    >
                      <IoLogOut className="text-gray-900 text-xl" />
                      <Caption text>logout</Caption>
                    </div>
                  ),
                },
              ],
            }}
            placement="bottomLeft"
            arrow={{
              pointAtCenter: true,
            }}
          >
            <Avatar
              src={avatar}
              shape="circle"
              size={{
                xs: 28,
                sm: 28,
                md: 40,
                lg: 40,
                xl: 40,
                xxl: 40,
              }}
            />
          </Dropdown>
        </div>
        <SearchModal open={showSearch} setOpen={setShowSearch} />
      </div>
    </header>
  );
}

export default connect((state) => state.user)(CustomHeader);
