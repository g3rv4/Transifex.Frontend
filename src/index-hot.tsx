import * as React from "react";
import * as ReactDOM from "react-dom";
import { AppContainer } from 'react-hot-loader';

import Filter from "./apps/Filter/Filter";

const render = (TheApp: typeof Filter) => ReactDOM.render(
  <AppContainer>
    <TheApp/>
  </AppContainer>,
  document.getElementById("root")
);

render(Filter);

if(module.hot) {
  module.hot.accept("./apps/Filter/Filter", () => {
    const NextApp = require<{default: typeof Filter}>("./apps/Filter/Filter").default;
    render(NextApp);
  });
}
