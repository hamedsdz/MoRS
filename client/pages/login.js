import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
// auth
import { NonLogin } from "auth";
// api
import { useLoginUser } from "apis/users";
// layouts
import SimpleLayout from "layouts/simple";
// components
import { FcFilmReel } from "react-icons/fc";
import CustomInput from "components/input";
import Caption from "components/caption";
import CustomButton from "components/button";
import { translateText } from "components/translate";

const Login = () => {
  const router = useRouter();
  const [data, setData] = useState({ username: "", password: "" });

  const [{ loading }, apiCall] = useLoginUser(() => router.push("/"));

  return (
    <div className="min-h-[calc(100vh-5rem)]  flex flex-col items-center justify-center max-w-[20rem] mx-auto gap-4 my-10">
      <span className="text-8xl md:text-9xl  -m-8">
        <FcFilmReel />
      </span>
      <Caption text className="text-white text-xl md:text-2xl">
        loginToMORS
      </Caption>
      <CustomInput
        type="text"
        placeholder="pleaseEnterUsername"
        label="username"
        labelClassName="text-white"
        mandatory
        mb=""
        value={data.username}
        onChange={(e) => setData({ ...data, username: e.target.value })}
      />
      <CustomInput
        type="password"
        placeholder="pleaseEnterPassword"
        label="password"
        labelClassName="text-white"
        mandatory
        mb=""
        value={data.password}
        onChange={(e) => setData({ ...data, password: e.target.value })}
      />
      <Caption
        paragraph
        doTranslate={false}
        className="flex gap-1 items-start w-full mb-0 text-gray-100"
      >
        {translateText("wannaJoin")}
        <Link href="/signup">{translateText("signup")}</Link>
      </Caption>
      <CustomButton
        loading={loading}
        onClick={() => apiCall(data)}
        className="bg-blue-500 border-blue-500 hover:bg-blue-400 hover:border-blue-400 hover:text-black"
      >
        login
      </CustomButton>
    </div>
  );
};

Login.getLayout = function getLayout(page) {
  return (
    <NonLogin>
      <SimpleLayout>{page}</SimpleLayout>
    </NonLogin>
  );
};

export default Login;
