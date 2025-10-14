import { Route, Routes } from "react-router-dom";
import Header from "./component/common/Header";
import Footer from "./component/common/Footer";
import Main from "./component/common/Main";
import CSMain from "./component/cs/CSMain";
import AdminMain from "./component/admin/AdminMain";

function App() {
  return (
    <div className="wrap">
      <Header />
      <main className="content">
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/cs/*" element={<CSMain />} />

          <Route path="admin/main" element={<AdminMain />}/>
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
