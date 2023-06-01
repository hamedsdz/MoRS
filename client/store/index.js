import { createStore, applyMiddleware } from "redux";
import { createWrapper } from "next-redux-wrapper";
import thunkMiddleware from "redux-thunk";
// reducers
import reducers from "./reducers";
// storage
import storage from "./storage";

// BINDING MIDDLEWARE
const bindMiddleware = (middleware) => {
  return applyMiddleware(...middleware);
};

const makeStore = ({ isServer }) => {
  if (isServer) return createStore(reducers, bindMiddleware([thunkMiddleware]));
  else {
    const { persistStore, persistReducer } = require("redux-persist");

    const persistConfig = {
      key: "morsStorage",
      whitelist: ["user", "movie"],
      storage,
    };

    const persistedReducer = persistReducer(persistConfig, reducers);

    const store = createStore(persistedReducer, bindMiddleware([thunkMiddleware]));

    store.__persistor = persistStore(store);

    return store;
  }
};

export const wrapper = createWrapper(makeStore);
