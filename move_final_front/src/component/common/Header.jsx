import { Link } from "react-router-dom";
import "./default.css";

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
          <Link to="/cs/main">고객센터</Link>
        </li>
      </ul>
    </nav>
  );
};

const AuthNavi = () => {
  return (
    <div className="auth-nav">
      <Link to="/common/login">로그인</Link>
      <Link to="/member/join">회원가입</Link>
    </div>
  );
};

export default Header;
