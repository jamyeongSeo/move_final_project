import { Route, Routes, useLocation } from "react-router-dom";
import Header from "./component/common/Header";
import Footer from "./component/common/Footer";
import Main from "./component/common/Main";
import CSMain from "./component/cs/CSMain";
import BookingMain from "./component/booking/BookingMain";

import AdminMain from "./component/admin/AdminMain";
import AdminList from "./component/admin/AdminList";
import Join from "./component/member/join";
import Login from "./component/common/Login";
import MemberMain from "./component/member/MemberMain";
import MemberUpdate from "./component/member/MemberUpdate";
import MemberDelete from "./component/member/MemberDelete";
import MovieList from "./component/movie/MovieList";
import { useRecoilState } from "recoil";
import {
  authReadyState,
  loginIdState,
  memberLevelState,
} from "./component/utils/RecoilData";
import axios from "axios";
import { useEffect } from "react";
import AdminRegist from "./component/admin/AdminRegist";
import WatchedMovieList from "./component/member/WatchedMovieList";
import BookingMovieList from "./component/member/BookingMovieList";
import NoMemberInfo from "./component/member/NoMemberInfo";

import AdminScheduleRegist from "./component/admin/AdminScheduleRegist";
import AdminView from "./component/admin/AdminView";
import BookingSeat from "./component/booking/BookingSeat";
import AdminScheduleList from "./component/admin/AdminScheduleList";
import AdminScheduleEdit from "./component/admin/AdminScheduleEdit";


import AdminReportMember from "./component/admin/AdminReportMember";
import AdminMember from "./component/admin/AdminMember";


import PayPage from "./component/booking/PayPage";

import MovieDetail from "./component/movie/MovieDetail";

function App() {
  const [memberId, setMemberId] = useRecoilState(loginIdState);
  const [memberLevel, setMemberLevel] = useRecoilState(memberLevelState);
  const [authReady, setAuthReady] = useRecoilState(authReadyState);

  //다시보기 이해 요망
  useEffect(() => {
    refreshLogin();
    window.setInterval(1000 * 60 * 50);
  }, []);

  const refreshLogin = () => {
    //최초 화면을 접속시, localStorage에 저장되어있는 refreshToken을 가져와 자동 로그인 처리
    const refreshToken = window.localStorage.getItem("refreshToken");

    //한번도 로그인 x or 로그아웃 시
    if (refreshToken !== null) {
      //refreshToken존재시, 해당 토큰으로 인증 및 로그인 처리(accessToken, refreshToken 갱신)
      axios.defaults.headers.common["Authorization"] = refreshToken;

      axios
        .get(`${import.meta.env.VITE_BACK_SERVER}/member/refresh`)
        .then((res) => {
          setMemberId(res.data.memberId);
          setMemberLevel(res.data.memberLevel);
          axios.defaults.headers.common["Authorization"] = res.data.accessToken;
          window.localStorage.setItem("refreshToken", res.data.refreshToken);
          setAuthReady(true);
        })
        .catch((err) => {
          console.log(err);
          setMemberId("");
          setMemberLevel(0);
          delete axios.defaults.headers.common["Authorization"];
          window.localStorage.removeItem("refreshToken");
          setAuthReady(true);
        });
    } else {
      //재로그인 안하는 경우
      setAuthReady(true);
    }

    setAuthReady(true);
  };
  const location = useLocation();
  return (
    <>
      {location.pathname === "/" ? (
        <div className="wrap">
          <Header />
          <Routes>
            <Route path="/" element={<Main></Main>} />
          </Routes>
          <Footer />
        </div>
      ) : (
        <div className="wrap">
          <Header />
          <main
            className={
              location.pathname.startsWith("/movie/detail")
                ? "content movie-detail-content"
                : "content"
            }
          >
            <Routes>
              <Route path="/" element={<Main />} />
              <Route path="/cs/*" element={<CSMain />} />
              <Route path="/booking/main" element={<BookingMain />} />
              <Route
                path="/booking/bookingSeat/:screenNo/:movieNo"
                element={<BookingSeat />}
              />
              <Route path="booking/pay" element={<PayPage />} />

              <Route path="/admin/main" element={<AdminMain />}>
                {/*index route : /admin/mian 일 때 기본 컴포 */}
                <Route index element={<AdminList/>}/>
                <Route path="movie/list" element={<AdminList />} />
                <Route path="movie/regist" element={<AdminRegist />} />
                <Route path="schedule/list" element={<AdminScheduleList />} />
                <Route
                  path="schedule/regist"
                  element={<AdminScheduleRegist />}
                />
                <Route path="schedule/edit/:scheduleNo"element={<AdminScheduleEdit />}/>
                <Route path="member" element={<AdminMember />} />
              </Route>
                
              

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
              <Route path="/movie/detail/:movieNo" element={<MovieDetail />} />
              <Route
                path="/member/watchedMovieList"
                element={<WatchedMovieList></WatchedMovieList>}
              />
              <Route
                path="/member/bookingMovieList"
                element={<BookingMovieList></BookingMovieList>}
              />
              <Route
                path="/member/noMemberInfo"
                element={<NoMemberInfo></NoMemberInfo>}
              />
            </Routes>
          </main>
          <Footer />
        </div>
      )}
    </>
  );
}

export default App;
