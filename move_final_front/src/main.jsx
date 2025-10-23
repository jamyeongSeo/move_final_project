import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";
import ScrollTop from "./component/utils/ScrollTop.jsx";

createRoot(document.getElementById("root")).render(
  <RecoilRoot>
    <BrowserRouter>
      <ScrollTop />
      <App />
    </BrowserRouter>
  </RecoilRoot>
);
