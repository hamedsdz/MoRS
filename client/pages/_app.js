import { useEffect } from "react";
// redux
import { wrapper } from "store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
// app
import MORS from "./_mors";
// components
import SeoHead from "components/SEO";
import NProgress from "nprogress";
// styles
import "nprogress/nprogress.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "styles/globals.css";

function App({ Component, router, ...rest }) {
  const { store, props } = wrapper.useWrappedStore(rest);
  const { pageProps } = props;

  useEffect(() => {
    const handleRouteStart = () => NProgress.start();
    const handleRouteDone = () => NProgress.done();

    router.events.on("routeChangeStart", handleRouteStart);
    router.events.on("routeChangeComplete", handleRouteDone);
    router.events.on("routeChangeError", handleRouteDone);

    return () => {
      // Make sure to remove the event handler on unmount!
      router.events.off("routeChangeStart", handleRouteStart);
      router.events.off("routeChangeComplete", handleRouteDone);
      router.events.off("routeChangeError", handleRouteDone);
    };
  }, [router.events]);

  return (
    <>
      <Provider store={store}>
        <SeoHead title={""} />
        <PersistGate persistor={process.browser ? store.__persistor : store} loading="Loading">
          <MORS Component={Component} {...pageProps} />
        </PersistGate>
      </Provider>
    </>
  );
}

export default App;
