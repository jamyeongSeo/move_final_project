import { Link, useNavigate } from "react-router-dom";
import "./default.css";
import { useRecoilState } from "recoil";
import { loginIdState, memberLevelState } from "../utils/RecoilData";
import axios from "axios";

const Header = () => {
  return (
    <header className="header-wrap">
      <div className="header-div">
        <Link to="/" className="header-logo">
          I_MOVE_U
        </Link>
        <HeaderNavi />
        <AuthNavi />
      </div>
    </header>
  );
};
const HeaderNavi = () => {
  return (
    <nav className="nav-menu">
      <ul>
        <li>
          <Link to="/movie/list">영화</Link>
        </li>
        <li>
          <Link to="/booking/main">예매하기</Link>
        </li>
        <li>
          <Link to="/cs/notice">고객센터</Link>
        </li>
        <li>
          <Link to="/admin/main">관리자페이지</Link>
        </li>
      </ul>
    </nav>
  );
};

const AuthNavi = () => {
  const [memberId, setmemberId] = useRecoilState(loginIdState);
  const [memberLevel, setMemberLevel] = useRecoilState(memberLevelState);
  const isLogin = false;
  const navigate = useNavigate();
  const logout = () => {
    setmemberId("");
    setMemberLevel(0);
    delete axios.defaults.headers.common["Authorization"];
    window.localStorage.removeItem("refreshToken");
    navigate("/");
  };
  return (
    <>
      {memberId !== "" && memberLevel === 1 ? (
        <div className="auth-nav">
          <Link to="/" onClick={logout}>
            로그아웃
          </Link>
          <Link to="/admin/main">관리자페이지</Link>
        </div>
      ) : memberId !== "" && memberLevel === 2 ? (
        <div className="auth-nav">
          <Link to="/" onClick={logout}>
            로그아웃
          </Link>
          <Link to="/member/memberMain">마이페이지</Link>
        </div>
      ) : (
        <div className="auth-nav">
          <Link to="/common/login">로그인</Link>
          <Link to="/member/join">회원가입</Link>
        </div>
      )}
    </>
  );
};

export default Header;
