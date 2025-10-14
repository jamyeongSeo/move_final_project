import { useEffect, useRef, useState } from "react";

import "./default.css";
import "./login.css";
import { Link } from "react-router-dom";

import SearchIdModal from "../member/SearchIdModal";
import SearchPwModal from "../member/SearchPwModal";
const Login = () => {
  const [member, setMember] = useState({
    memberId: "",
    memberPw: "",
  });
  const inputmemberDate = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    const newMember = { ...member, [name]: value };
    setMember(newMember);
  };
  const inputIdCss = useState(false);
  const inputPwCss = useState(false);
  const chageIdCss = () => {
    inputIdCss(true);
    inputPwCss(false);
  };

  const [isModalId, setIsModalId] = useState(false);
  const openIdModal = () => {
    setIsModalId(true);
  };
  const [isModalPw, setIsModalPw] = useState(false);
  const openPwModal = () => {
    setIsModalPw(true);
  };

  return (
    <div className="content-wrap section login-wrap">
      <div>
        <section>
          <div className="title-logo">I_MOVE_U</div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <div className="input-item ">
              <input
                className="login-input"
                type="text"
                name="memberId"
                id="memberId"
                value={member.memberId}
                onChange={inputmemberDate}
                placeholder="아이디"
              ></input>
            </div>
            <div className="input-item">
              <input
                className="login-input"
                type="password"
                name="memberPw"
                id="memberPw"
                value={member.memberPw}
                onChange={inputmemberDate}
                placeholder="비밀번호"
              ></input>
            </div>
            <div className="login-button-box">
              <button type="submit" className="btn-red login-btn">
                로그인
              </button>
            </div>
          </form>
        </section>
        <div className="login-other-link">
          <button type="button" onClick={openIdModal}>
            아이디 찾기
          </button>
          <SearchIdModal
            isModalId={isModalId}
            setIsModalId={setIsModalId}
          ></SearchIdModal>
          <span> / </span>
          <button type="button" onClick={openPwModal}>
            비밀번호 찾기
          </button>
          <SearchPwModal
            isModalPw={isModalPw}
            setIsModalPw={setIsModalPw}
          ></SearchPwModal>
          <span> / </span>
          <Link to="/member/Join">회원가입</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
