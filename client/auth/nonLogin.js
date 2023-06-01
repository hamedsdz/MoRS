import { useRouter } from "next/router";
import { useEffect, useState } from "react";
// redux
import { useSelector } from "react-redux";
// components
import Loading from "components/loading";

export default function NonLogin({ children }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const { isLoggedIn, token } = useSelector((state) => state.user);

  useEffect(() => {
    if (isLoggedIn && token) router.replace("/");
    else setLoading(false);
  }, []); // eslint-disable-line

  if (loading) return <Loading />;

  return children;
}
