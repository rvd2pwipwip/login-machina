import React from "react";
import ReactDOM from "react-dom";
import GlobalStyles from "./globalStyles";
import SignIn from "./SignIn";

const App = () => (
  <>
    <GlobalStyles />
    <SignIn />
  </>
);

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
