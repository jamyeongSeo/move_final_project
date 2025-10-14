import { useEffect, useRef, useState } from "react";
import LeftSideMenu from "../utils/LeftSideMenu";
import { Link, useNavigate } from "react-router-dom";
import SearchIdModal from "./SearchIdModal";
import SearchPwModal from "./SearchPwModal";
import axios from "axios";

const MemberUpdate = () => {
  const [menus, setMenus] = useState([
    {
      url: [
        "/member/memberMain",
        "/member/memberUpdate",
        "/member/memberDelete",
      ],
      text: "내 정보",
    },
    { url: "/member/join", text: "내가 본 영화" },
    { url: "/member/join", text: "예약 / 결제" },
  ]);

  const updateCheckPw = useRef();
  const memberUpdateMain = useRef();

  const nextUpdate = () => {
    updateCheckPw.current.classList.add("updateCheckPw-none");
    memberUpdateMain.current.classList.remove("memberUpdateMain-none");
  };

  const [member, setMember] = useState({
    memberName: "",
    memberId: "",
    memberEmail: "",
  });
  const inputData = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    const newMember = { ...member, [name]: value };
    setMember(newMember);
  };
  const searchPwModal = useRef();
  const modal = useRef();
  const resultModal = useRef();
  const openPwModal = () => {
    searchPwModal.current.classList.remove("login-searchPwModal-none");
  };
  const nextModal = () => {
    modal.current.classList.add("login-searchPwModal-none");
    resultModal.current.classList.remove("login-searchPwModal-none");
  };
  const closeModal = () => {
    resultModal.current.classList.add("login-searchPwModal-none");
    modal.current.classList.remove("login-searchPwModal-none");
    searchPwModal.current.classList.add("login-searchPwModal-none");
  };

  return (
    <div className="content-wrap">
      <section className="left-side-menu-side">
        <Link to="/member/memberMain">
          <div className="left-side-menu-title">마이페이지</div>
        </Link>
        <LeftSideMenu menus={menus}></LeftSideMenu>
      </section>

      <div className="left-side-menu-other member-mypage-wrap">
        <section ref={updateCheckPw}>
          <div className="memberMain-title">
            <h1>회원 정보 수정</h1>
            <span className="memberUpdate-title-contnet">
              회원님의 정보보호를 위한 확인 절차입니다
            </span>
          </div>

          <div className="member-mypage-content-wrap">
            <div className="member-mypage-content-line input-line">
              <input
                className="member-mypage-content-left"
                placeholder="비밀번호를 입력하세요"
              ></input>
            </div>
            <div className="memberUpdate-searchPw">
              <span>비밀번호가 기억나지 않는다면?</span>
              <button type="button" className="input-box" onClick={openPwModal}>
                비밀번호 찾기
              </button>
            </div>
          </div>

          <div className="member-mypage-btn-wrap">
            <button
              type="button"
              className="btn-red member-mypage-btn"
              onClick={nextUpdate}
            >
              확인
            </button>
          </div>
        </section>
        <section ref={searchPwModal} className="login-searchPwModal-none">
          <div>
            <div className="memberModal">
              <div className="memberModal-wrap">
                <div className="memberModal-content-box-wrap">
                  <div className="memberModal-content-box">
                    <div className="memberModal-title">
                      <h2>비밀번호 찾기</h2>
                    </div>
                    <section ref={modal}>
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          nextModal();
                        }}
                      >
                        <div className="memberModal-content-wrap">
                          <div>
                            <input
                              style={{ width: "650px" }}
                              className="input-line"
                              type="text"
                              name="memberName"
                              id="memberName"
                              placeholder="이름 입력"
                              value={member.memberName}
                              onChange={inputData}
                            />
                          </div>
                          <div>
                            <input
                              style={{ width: "650px" }}
                              className="input-line"
                              type="text"
                              name="memberId"
                              id="memberId"
                              placeholder="아이디 입력"
                              value={member.memberId}
                              onChange={inputData}
                            />
                          </div>
                          <div>
                            <input
                              style={{ width: "650px" }}
                              className="input-line"
                              type="text"
                              name="memberEmail"
                              id="memberEmail"
                              placeholder="이메일주소 입력"
                              value={member.memberEmail}
                              onChange={inputData}
                            />
                          </div>
                        </div>

                        <div>
                          <button
                            style={{ marginRight: "10px" }}
                            type="submit"
                            className="btn-red memberModal-btn"
                          >
                            확인
                          </button>
                          <button
                            type="button"
                            className="btn-red memberModal-btn"
                            onClick={closeModal}
                          >
                            닫기
                          </button>
                        </div>
                      </form>
                    </section>
                    <section
                      ref={resultModal}
                      className="login-searchPwModal-none"
                    >
                      <SearchPwResult></SearchPwResult>
                      <div>
                        <button
                          type="button"
                          className="btn-red memberModal-btn"
                          onClick={closeModal}
                        >
                          닫기
                        </button>
                      </div>
                    </section>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section ref={memberUpdateMain} className="memberUpdateMain-none">
          <MemberUpdateMain></MemberUpdateMain>
        </section>
      </div>
    </div>
  );
};

const MemberUpdateMain = () => {
  const [member, setMember] = useState({
    memberPw: "member.memberPw",
    memberEmail: "member.memberEmail",
    memberPhone: "member.memberPhone",
  });
  const [memberPwRe, setMemberPwRe] = useState("");
  const [memberEmailRe, setMemberEmailRe] = useState("");
  const pwMsgRef = useRef(null);
  const inputData = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    const newMember = { ...member, [name]: value };
    setMember(newMember);
  };

  const checkPwRe = (e) => {
    setMemberPwRe(e.target.value);
  };
  const checkPw = () => {
    pwMsgRef.current.classList.remove("join-su");
    pwMsgRef.current.classList.remove("join-f");
    if (memberPwRe !== "") {
      if (member.memberPw === memberPwRe) {
        pwMsgRef.current.classList.add("join-su");
        pwMsgRef.current.innerText = "비밀번호 일치";
      } else {
        pwMsgRef.current.classList.add("join-f");
        pwMsgRef.current.innerText = "비밀번호가 일치하지 않습니다.";
      }
    } else {
      pwMsgRef.current.classList.remove("join-su");
      pwMsgRef.current.classList.remove("join-f");
      pwMsgRef.current.innerText = "";
    }
  };
  const changePw = useRef();
  const inputDataPw = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    const newMember = { ...member, [name]: value };
    setMember(newMember);
    changePw.current.classList.remove("memberUpdatePw-not");
  };

  const [joinEmailRe, setJoinEmailRe] = useState(false);
  const [memberEmail, setMemberEmail] = useState("");
  const [checkEmailMsg, setCheckEailMsg] = useState("");

  const inputDataEmail = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    const newMember = { ...member, [name]: value };
    setMember(newMember);
    joinEmailRe.current.classList.remove("join-item-none");
    joinEmailRe.current.classList.add("join-item");
  };
  useEffect(() => {
    setJoinEmailRe(false);
    setMemberEmail("");
  }, [member.memberEmail]);
  const backServer = import.meta.env.VITE_BACK_SERVER;
  const checkEmail = () => {
    if (member.memberEmail != "") {
      axios
        .get(
          `${backServer}/member/checkEmail?memberEmail=${member.memberEmail}`
        )
        .then((res) => {
          console.log(res);
          if (res.data == 1) {
            setJoinEmailRe(false);
            setCheckEailMsg("이미 사용 중인 이메일입니다");
          } else {
            //사용 가능 이메일이면.
            setMemberEmail(memberEmail.memberEmail);
            setJoinEmailRe(true);
            setCheckEailMsg("사용 가능한 이메일입니다");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <section>
      <div className="memberMain-title">
        <h1>회원 정보 수정</h1>
        <span className="memberUpdate-title-contnet">
          변경 할 정보를 수정해주세요
        </span>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <div className="member-mypage-content-wrap">
          <div className="memberUpdateMain-wrap">
            <div className="memberUpdate-item">
              <label htmlFor="memberPhone">휴대전화번호</label>
              <ul className="input-line memberUpdate-line">
                <label htmlFor="memberPhone">
                  <li className="join-input">
                    <input
                      className="memberUpdate-input-content"
                      type="text"
                      name="memberPhone"
                      id="memberPhone"
                      value={member.memberPhone}
                      onChange={inputData}
                    />
                  </li>
                </label>
              </ul>
            </div>

            <div className="memberUpdate-item">
              <label htmlFor="memberPw">비밀번호</label>
              <ul className="input-line memberUpdate-line">
                <label htmlFor="memberPw">
                  <li className="join-input">
                    <input
                      className="memberUpdate-input-content"
                      type="password"
                      name="memberPw"
                      id="memberPw"
                      value={member.memberPw}
                      onChange={inputDataPw}
                      onBlur={checkPw}
                    />
                  </li>
                  <li className="join-span">
                    <span className="join-f">
                      영문, 숫자 4~12 글자로 입력하세요
                    </span>
                  </li>
                </label>
              </ul>
            </div>

            {/*비밀번호 변경하면 뜨도록 구현*/}
            <div
              ref={changePw}
              className="memberUpdate-item memberUpdatePw-not"
            >
              <label htmlFor="memberPwRe">변경 비밀번호 확인</label>
              <ul className="input-line memberUpdate-line">
                <label htmlFor="memberPwRe">
                  <li className="join-input">
                    <input
                      className="memberUpdate-input-content"
                      type="password"
                      name="memberPwRe"
                      id="memberPwRe"
                      value={memberPwRe}
                      onChange={checkPwRe}
                      onBlur={checkPw}
                    />
                  </li>
                  <li className="join-span">
                    <span className="" ref={pwMsgRef}></span>
                  </li>
                </label>
              </ul>
            </div>

            <div className="memberUpdate-item">
              <label htmlFor="memberEmail">이메일 변경</label>
              <ul className="input-line memberUpdate-line">
                <label htmlFor="memberEmail">
                  <li className="join-input">
                    <input
                      className="memberUpdate-input-content"
                      type="text"
                      name="memberEmail"
                      id="memberEmail"
                      value={member.memberEmail}
                      onChange={inputDataEmail}
                      onBlur={checkEmail}
                    />
                  </li>
                  <li className="join-span">
                    <span className={joinEmailRe ? "join-su" : "join-f"}>
                      {member.memberEmail == "" ? "" : checkEmailMsg}
                    </span>
                  </li>
                </label>
              </ul>
            </div>

            <section>
              <JoinEmailCode
                joinEmailRe={joinEmailRe}
                memberEmail={memberEmail}
              ></JoinEmailCode>
            </section>
          </div>
        </div>
        <div className="member-mypage-btn-wrap">
          <button type="submit" className="btn-red member-mypage-btn">
            수정
          </button>
          <Link to="/member/memberMain" className="btn-red member-mypage-btn">
            취소
          </Link>
        </div>
      </form>
    </section>
  );
};

const JoinEmailCode = (props) => {
  const memberEmail = props.memberEmail;
  const joinEmailRe = props.joinEmailRe;
  const [memberEmailRe, setMemberEmailRe] = useState("");
  const [emailCodeCheck, setEmailCodeCheck] = useState();
  const emailRe = () => {
    //if 이메일 발송 성공하면
    emailTimeRe.current.innerText = "3:00";
  };
  const emailTimeRe = useRef(null);
  const emailMsgRe = useRef(null);
  return (
    <section>
      <div className={joinEmailRe ? "join-item" : "join-item-none"}>
        <div style={{ overflow: "hidden" }}>
          <div className="join-btn">
            <button type="button" className="input-box" onClick={emailRe}>
              인증번호 발송
            </button>
            {/*이메일발송하면 btn-red 로 변경하고, 인증번호 시간 끝나면 원래 색상으로 변경 할 수 있으면 ㄱㄱ*/}
            <span ref={emailTimeRe}></span>
          </div>
          <ul className="input-line">
            <label htmlFor="memberEmailRe">
              <li className="join-input">
                <input
                  type="text"
                  name="memberEmailRe"
                  id="memberEmailRe"
                  placeholder="인증번호 입력"
                  value={memberEmailRe}
                  onChange={(e) => {
                    setMemberEmailRe(e.target.value);
                  }}
                />
              </li>
              <li className="join-span">
                <span className="join-f">인증 실패</span>
              </li>
            </label>
          </ul>
        </div>
      </div>
    </section>
  );
};

const SearchPwResult = () => {
  return (
    <section>
      <div className="memberModal-content-wrap">
        <div className="memberModal-searchResult-box">
          <span className="memberModal-searchResult">
            메일로 임시 비밀번호를 발송했습니다
          </span>
        </div>
      </div>
    </section>
  );
};

export default MemberUpdate;
