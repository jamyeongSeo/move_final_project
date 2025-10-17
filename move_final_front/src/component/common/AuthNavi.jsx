import { Link, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { loginIdState, memberLevelState } from "../utils/RecoilData";
import axios from "axios";

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
export default AuthNavi;
