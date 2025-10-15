import { Route, Routes } from "react-router-dom";
import Header from "./component/common/Header";
import Footer from "./component/common/Footer";
import Main from "./component/common/Main";
import CSMain from "./component/cs/CSMain";
import BookingMain from "./component/booking/BookingMain";

import AdminMain from "./component/admin/AdminMain";

import Join from "./component/member/join";
import Login from "./component/common/Login";
import MemberMain from "./component/member/MemberMain";
import MemberUpdate from "./component/member/MemberUpdate";
import MemberDelete from "./component/member/MemberDelete";
import MovieList from "./component/movie/MoiveList";

function App() {
  return (
    <div className="wrap">
      <Header />
      <main className="content">
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/cs/*" element={<CSMain />} />
          <Route path="/booking/main" element={<BookingMain />} />

          <Route path="/admin/main" element={<AdminMain />} />

          <Route path="/member/join" element={<Join></Join>} />
          <Route path="/common/login" element={<Login></Login>} />
          <Route
            path="/member/memberMain"
            element={<MemberMain></MemberMain>}
          />
          <Route
            path="/member/memberUpdate"
            element={<MemberUpdate></MemberUpdate>}
          ></Route>
          <Route
            path="/member/memberDelete"
            element={<MemberDelete></MemberDelete>}
          ></Route>
          <Route path="/movie/list" element={<MovieList />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
