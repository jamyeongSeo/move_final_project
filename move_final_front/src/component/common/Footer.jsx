import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer-wrap">
      <div className="footer-div">
        <div className="footer-logo">
          <Link to={"/"}>I_MOVE_U</Link>
        </div>

        <div className="footer-menu">
          <Link to={"/cs/TermsOfService"}>이용약관</Link>
          <Link to={"/cs/privatePolicy"}>개인정보처리방침</Link>
          <Link to={"/cs/faq"}>FAQ</Link>
        </div>

        <div className="footer-info">
          <p>서울특별시 영등포구 선유동 2로 57</p>
          <p>이레빌딩 19F I_MOVE_U</p>
          <p>공동대표 : 김윤지,서자명,심재현,채희찬</p>
          <p>TEL) 010-1234-5678</p>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
