// redux
import { wrapper } from "store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
// app
import MORS from "./_mors";
// components
import SeoHead from "components/SEO";
// styles
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "styles/globals.css";

function App({ Component, ...rest }) {
  const { store, props } = wrapper.useWrappedStore(rest);
  const { pageProps } = props;
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
