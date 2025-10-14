import { Link } from "react-router-dom";

const AuthNavi = () => {
  return (
    <div className="auth-nav">
      <Link to="/common/login">로그인</Link>
      <Link to="/member/join">회원가입</Link>
    </div>
  );
};
export default AuthNavi;
