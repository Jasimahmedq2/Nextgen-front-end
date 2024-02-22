/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Provider } from "react-redux";

import { RouterProvider } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "./redux/store.ts";

import router from "./router/index.tsx";
import { SocketProvider } from "./socketio/socketInstance.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SocketProvider>
          <RouterProvider router={router} />
        </SocketProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
