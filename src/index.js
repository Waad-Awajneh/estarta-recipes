import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store, { persistor } from "./redux/store/store";
import { PersistGate } from "redux-persist/integration/react";
import { Suspense } from "react";
import Loading from "./Components/Loading/Loading";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Suspense fallback={<Loading />}>
          <App />
        </Suspense>
      </PersistGate>
    </Provider>
  </BrowserRouter>
);
