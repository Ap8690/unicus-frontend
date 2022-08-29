import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";
import { UserProvider } from "./context/UserContext";
import { TransactionProvider } from "./context/Web3Context";
import { ChainProvider } from "./context/ChainContext";

// redux integration
import { Provider } from "react-redux";
import { store } from "./Redux/Store";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <Provider store={store}>
      <ChainProvider>
      <UserProvider>
        <TransactionProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </TransactionProvider>
      </UserProvider>
      </ChainProvider>
    </Provider>
);
