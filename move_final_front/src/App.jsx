import { Route, Routes } from "react-router-dom";
import Header from "./component/common/Header";
import Footer from "./component/common/Footer";
import Main from "./component/common/Main";
import CSMain from "./component/cs/CSMain";

function App() {
  return (
    <div className="wrap">
      <Header />
      <main className="content">
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/cs/*" element={<CSMain />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
