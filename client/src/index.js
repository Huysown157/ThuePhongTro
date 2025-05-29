import React from "react";
import ReactDOM from "react-dom/client";
import { PersistGate } from "redux-persist/integration/react";
import App from "./App";
import "./index.css";
//Bọc App trong PersistGate giúp delay việc render UI cho tới khi store dc updated
import { Provider } from "react-redux";
import reduxStore from "./redux";
import { BrowserRouter } from "react-router-dom"; //Quan ly tat ca route trong app
const { store, persistor } = reduxStore();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </PersistGate>
  </Provider>
);
/*BrowserRouter: kết nối ứng dụng với URL của trình duyệt*/
