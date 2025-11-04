import { useEffect, useRef, useState } from "react";

import "./default.css";
import "./login.css";
import { Link, useNavigate } from "react-router-dom";

import SearchIdModal from "../member/SearchIdModal";
import SearchPwModal from "../member/SearchPwModal";
import axios from "axios";
import Swal from "sweetalert2";
import { useRecoilState } from "recoil";
import { loginIdState, memberLevelState } from "../utils/RecoilData";
const Login = () => {
  const [memberId, setMemberId] = useRecoilState(loginIdState);
  const [memberLevel, setmemberLevel] = useRecoilState(memberLevelState);
  //console.log(memberId, memberLevel);

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
  const backServer = import.meta.env.VITE_BACK_SERVER;
  const navigate = useNavigate();
  const login = () => {
    if (member.memberId !== "" && member.memberPw !== "") {
      axios
        .post(`${backServer}/member/login`, member)
        .then((res) => {
          setMemberId(res.data.memberId);
          setmemberLevel(res.data.memberLevel);
          //다시 보기
          //로그인 이후 axios 통한 요청을 수행하는경우 토큰값을 자동으로 axios에 추가하는 로직
          axios.defaults.headers.common["Authorization"] = res.data.accessToken;
          //로그인을 성공하면 갱신을위한 refreshToken을 브라우저에 저장
          window.localStorage.setItem("refreshToken", res.data.refreshToken);
          Swal.fire({
            title: "로그인",
            text: "회원 접속 되었습니다.",
            icon: "info",
          });
          navigate("/");
        })
        .catch((err) => {
          console.log(err);
          Swal.fire({
            title: "로그인 실패",
            text: "아이디 또는 비밀번호를 확인하세요",
            icon: "warning",
          });
        });
    } else {
      Swal.fire({
        title: "입력값 확인",
        text: "입력값을 확인하세요",
        icon: "info",
      });
    }
  };

  return (
    <div className="content-wrap section login-wrap">
      <div>
        <section>
          <div className="title-logo" style={{ fontSize: "32px" }}>
            I_MOVE_U
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              login();
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
              <button
                type="submit"
                className="btn-red login-btn"
                style={{ fontSize: "17px" }}
              >
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
