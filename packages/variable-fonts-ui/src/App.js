import React from "react";
import { Provider } from "~/store/Provider";
import App from "~/containers/App";
import { hot } from "react-hot-loader";
import "rheostat/initialize";
import "rheostat/css/rheostat.css";

import initStore from "~/store";

const store = initStore();

const MyApp = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

export default hot(module)(MyApp);
