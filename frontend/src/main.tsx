/**
 * Application entrypoint: mounts React app and provides the Redux store.
 *
 * This file bootstraps the app into the DOM and should remain minimal.
 * @module src/main
 */
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Provider } from "react-redux";
import { store } from "./shared/store/store.ts";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <StrictMode>
      <App />
    </StrictMode>
  </Provider>,
);
