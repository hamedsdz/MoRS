import { useEffect, useState } from "react";
import { useRouter } from "next/router";
// redux
import { useSelector, useDispatch } from "react-redux";
import { USER_INFO, LOGOUT } from "store/names";
// api
import AxiosInstance from "apis/instance";
// components
import { message } from "antd";
import Loading from "components/loading";
import { translateText } from "components/translate";

export default function Protected({ children, requiredRoles }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const { token, userPermissions, isLoggedIn } = useSelector((state) => state.user);
  const validationRoles = userPermissions
    ? userPermissions.some((role) => requiredRoles.includes(role))
    : [];

  function redirectToLogin() {
    dispatch({ type: LOGOUT });
    AxiosInstance.defaults.headers.common["x-auth-token"] = undefined;
    router.push("/login");
  }

  async function initLogin() {
    setLoading(true);
    try {
      if (token) {
        AxiosInstance.defaults.headers.common["x-auth-token"] = token;
        AxiosInstance.get("/api/auth/")
          .then((res) => {
            dispatch({ type: USER_INFO, payload: res.data });
          })
          .catch((err) => {
            if (
              err.response.status === 401 ||
              err.response.status === 403 ||
              err.response.status === 404
            ) {
              redirectToLogin();
              message.error(translateText("loginAgain"));
            }
          });
        setLoading(false);
      } else {
        setLoading(false);
        redirectToLogin();
      }
    } catch (err) {
      setLoading(false);
      redirectToLogin();
    }
  }

  async function initNotLogin() {
    if (!isLoggedIn) redirectToLogin();
    else if (isLoggedIn && requiredRoles.length && !validationRoles) router.push("/access-denied");
  }

  useEffect(() => {
    if (isLoggedIn) initLogin();
    else initNotLogin();
  }, []);

  if (loading) return <Loading />;

  return children;
}
