import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
// auth
import { NonLogin } from "auth";
// api
import { useSignupUser } from "apis/users";
// layouts
import MainLayout from "layouts/main";
// components
import { FcPhotoReel } from "react-icons/fc";
import CustomInput from "components/input";
import Caption from "components/caption";
import CustomButton from "components/button";
import { translateText } from "components/translate";
// assets
// import MoviePic from "assets/images";

const SignUp = () => {
  const router = useRouter();
  const [data, setData] = useState({ username: "", password: "", email: "" });

  const [{ loading }, apiCall] = useSignupUser(() => router.push("/"));

  return (
    <div className="min-h-max flex flex-col items-center justify-center max-w-[20rem] mx-auto gap-4 my-16">
      <span className="text-9xl -m-8">
        <FcPhotoReel />
      </span>
      <Caption text className="text-white text-2xl">
        signinToMORS
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
        type="text"
        placeholder="pleaseEnterEmail"
        label="email"
        labelClassName="text-white"
        mandatory
        mb=""
        value={data.email}
        onChange={(e) => setData({ ...data, email: e.target.value })}
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
        {translateText("haveAnAccount")}
        <Link href="/login">{translateText("login")}</Link>
      </Caption>
      <CustomButton
        loading={loading}
        onClick={() => apiCall(data)}
        className="bg-blue-500 border-blue-500 hover:bg-blue-400 hover:border-blue-400 hover:text-black"
      >
        signup
      </CustomButton>
    </div>
  );
};

SignUp.getLayout = function getLayout(page) {
  return (
    <NonLogin>
      <MainLayout>{page}</MainLayout>
    </NonLogin>
  );
};

export default SignUp;
