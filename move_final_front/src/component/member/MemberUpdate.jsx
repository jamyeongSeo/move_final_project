import { useEffect, useRef, useState } from "react";
import LeftSideMenu from "../utils/LeftSideMenu";
import { Link, useNavigate } from "react-router-dom";
import SearchIdModal from "./SearchIdModal";
import SearchPwModal from "./SearchPwModal";
import axios from "axios";
import { useRecoilState } from "recoil";
import { loginIdState } from "../utils/RecoilData";
import Swal from "sweetalert2";
import JoinEmailCode from "./JoinEmailCode";
import NoMemberInfo from "./NoMemberInfo";

const MemberUpdate = () => {
  const [memberId, setMemberId] = useRecoilState(loginIdState);
  const [memberPw, setMemberPw] = useState("");
  const [menus, setMenus] = useState([
    { url: "/member/memberMain", text: "내 정보" },
    { url: "/member/watchedMovieList", text: "내가 본 영화" },
    { url: "/member/bookingMovieList", text: "예약 / 결제" },
  ]);

  const updateCheckPw = useRef();
  const memberUpdateMain = useRef();
  const BackServer = import.meta.env.VITE_BACK_SERVER;
  const [changeFrm, setChangeFrm] = useState(false);
  const nextUpdate = () => {
    if (memberId != "" && memberPw != "") {
      axios
        .post(
          `${BackServer}/member/searchMember?memberId=${memberId}&&memberPw=${memberPw}`
        )
        .then((res) => {
          if (res.data == 1) {
            updateCheckPw.current.classList.add("updateCheckPw-none");
            memberUpdateMain.current.classList.remove("memberUpdateMain-none");
            setChangeFrm(true);
          } else {
            Swal.fire({
              title: "조회 실패",
              text: "비밀번호를 재확인해주세요",
              icon: "info",
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      Swal.fire({
        title: "입력값 확인",
        text: "비밀번호를 입력해주세요",
        icon: "info",
      });
    }
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
    setIsModalPw(true);
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
  const [isModalPw, setIsModalPw] = useState(false);

  return (
    <>
      {memberId === "" ? (
        <NoMemberInfo></NoMemberInfo>
      ) : (
        <div className="content-wrap  member-wrap">
          <section className="left-side-menu-side">
            <Link to="/member/memberMain">
              <div className="left-side-menu-title">마이페이지</div>
            </Link>
            <LeftSideMenu menus={menus}></LeftSideMenu>
          </section>

          <div className="left-side-menu-other member-mypage-wrap">
            <section ref={updateCheckPw}>
              <div className="memberMain-title">
                <p style={{ fontWeight: "600", fontSize: "32px" }}>
                  회원 정보 수정
                </p>
                <span className="memberUpdate-title-contnet">
                  회원님의 정보보호를 위한 확인 절차입니다
                </span>
              </div>

              <div className="member-mypage-content-wrap">
                <div className="member-mypage-content-line input-line">
                  <input
                    type="password"
                    className="member-mypage-content-left"
                    placeholder="비밀번호를 입력하세요"
                    value={memberPw}
                    onChange={(e) => {
                      setMemberPw(e.target.value);
                    }}
                  ></input>
                </div>
                <div className="memberUpdate-searchPw">
                  <span>비밀번호가 기억나지 않는다면?</span>
                  <button type="button" onClick={openPwModal}>
                    비밀번호 찾기
                  </button>
                  <SearchPwModal
                    isModalPw={isModalPw}
                    setIsModalPw={setIsModalPw}
                  ></SearchPwModal>
                </div>
              </div>

              <div className="member-mypage-btn-wrap">
                <button
                  style={{
                    marginRight: "10px",
                    padding: "3px 8px",
                    height: "36.67px",
                    width: "145px",
                  }}
                  type="button"
                  className="btn-red member-mypage-btn"
                  onClick={nextUpdate}
                >
                  확인
                </button>
                <Link
                  style={{ padding: "5px 56px" }}
                  to="/member/memberMain"
                  className="btn-red member-mypage-btn"
                >
                  취소
                </Link>
              </div>
            </section>
            <section ref={memberUpdateMain} className="memberUpdateMain-none">
              {changeFrm && (
                <MemberUpdateMain memberPw={memberPw}></MemberUpdateMain>
              )}
            </section>
          </div>
        </div>
      )}
    </>
  );
};

const MemberUpdateMain = (props) => {
  const navigate = useNavigate();
  const memberPw = props.memberPw;
  const [memberId, setMemberId] = useRecoilState(loginIdState);
  const BackServer = import.meta.env.VITE_BACK_SERVER;
  const [memberEmail, setMemberEmail] = useState("");
  const [memberPhone, setMemberPhone] = useState("");
  const [member, setMember] = useState({
    memberId: memberId,
    memberPw: memberPw,
    memberEmail: "",
    memberPhone: "",
  });
  const [memberPwRe, setMemberPwRe] = useState("");
  const [memberEmailRe, setMemberEmailRe] = useState("");
  const pwMsgRef = useRef(null);
  const [updatePw, setUpdatePw] = useState(false);
  const [updateEmail, setUpdateEmail] = useState(false);

  useEffect(() => {
    axios
      .get(`${BackServer}/member/selectMember?memberId=${memberId}`)
      .then((res) => {
        setMember({
          ...member,
          memberPhone: res.data.memberPhone,
          memberEmail: res.data.memberEmail,
        });
        setMemberEmail(res.data.memberEmail);
        setMemberPhone(res.data.memberPhone);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  //console.log(member);
  const inputData = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    const newMember = { ...member, [name]: value };
    setMember(newMember);
  };
  const changePw = useRef();
  const noChangePwMsg = useRef();
  //비밀번호
  const checkPw = () => {
    pwMsgRef.current.classList.remove("join-su");
    pwMsgRef.current.classList.remove("join-f");
    if (member.memberPw !== "") {
      if (member.memberPw === memberPw) {
        changePw.current.classList.add("memberUpdatePw-not");
        noChangePwMsg.current.classList.add("join-su");
        noChangePwMsg.current.innerText = "기존 비밀번호 사용";
        setUpdatePw(false);
      } else {
        noChangePwMsg.current.classList.remove("join-su");
        noChangePwMsg.current.innerText = "";
        setUpdatePw(true);
        changePw.current.classList.remove("memberUpdatePw-not");
        if (memberPwRe != "") {
          if (member.memberPw === memberPwRe) {
            pwMsgRef.current.classList.add("join-su");
            pwMsgRef.current.innerText = "비밀번호 일치";
          } else {
            pwMsgRef.current.classList.add("join-f");
            pwMsgRef.current.innerText = "비밀번호가 일치하지 않습니다.";
          }
        }
      }
    }
  };
  const checkPwRe = (e) => {
    setMemberPwRe(e.target.value);
  };

  //이메일
  const [joinEmailRe, setJoinEmailRe] = useState(false);
  const [checkEmailMsg, setCheckEmailMsg] = useState("");
  const [joinEmailReCss, setJoinEmailReCss] = useState(false);
  useEffect(() => {
    setJoinEmailRe(false);
    setCheckEmailMsg("");
  }, [member.memberEmail]);

  //이메일 코드 인증 결과
  const [emailCodeCheck, setEmailCodeCheck] = useState(false);

  const backServer = import.meta.env.VITE_BACK_SERVER;
  const checkEmail = () => {
    //console.log(member);
    if (member.memberEmail !== "") {
      if (member.memberEmail !== memberEmail) {
        //이메일 형식 유효성 검사
        const emailRef = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]/;
        if (emailRef.test(member.memberEmail)) {
          setUpdateEmail(true);
          axios
            .get(
              `${backServer}/member/checkEmail?memberEmail=${member.memberEmail}`
            )
            .then((res) => {
              if (res.data != 0) {
                if (member.memberEmail != memberEmail) {
                  setJoinEmailRe(false);
                  setJoinEmailReCss(false);
                  setCheckEmailMsg("이미 사용 중인 이메일입니다");
                }
              } else {
                //사용 가능 이메일이면.
                setJoinEmailRe(true);
                setJoinEmailReCss(true);
                setCheckEmailMsg("사용 가능한 이메일입니다");
              }
            })
            .catch((err) => {
              console.log(err);
            });
        } else if (!emailRef.test(member.memberEmail)) {
          //이메일 형식 틀림
          setJoinEmailRe(false);
          setJoinEmailReCss(false);
          setCheckEmailMsg("이메일 형식을 확인해주세요");
        }
      } else if (member.memberEmail === memberEmail) {
        setUpdateEmail(false);
        //인증번호 발송 창 나올 필요 없음
        setCheckEmailMsg("기존 이메일 사용");
        setJoinEmailRe(false);
        setJoinEmailReCss(true);
      }
    }
  };

  const updateMember = () => {
    //모든 값 입력 확인
    if (
      member.memberPw != "" &&
      member.memberEmail &&
      member.memberPhone != ""
    ) {
      if (!updatePw && !updateEmail) {
        //1.비밀번호, 이메일 기존 사용
        axios
          .patch(`${backServer}/member`, member)
          .then((res) => {
            if (res.data == 1) {
              Swal.fire({
                title: "회원정보 수정 성공",
                text: "회원정보 수정이 완료되었습니다. ",
                icon: "success",
              });

              navigate("/member/memberMain");
            } else {
              Swal.fire({
                title: "회원정보 수정 실패",
                text: "다시 시도해 주세요",
                icon: "error",
              });
              navigate("/member/memberMain");
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } else if (updatePw && !updateEmail) {
        //2. 비밀번호 변경 , 이메일 기존 사용
        if (member.memberPw == memberPwRe) {
          axios
            .patch(`${backServer}/member`, member)
            .then((res) => {
              if (res.data == 1) {
                Swal.fire({
                  title: "회원정보 수정 성공",
                  text: "회원정보 수정이 완료되었습니다. ",
                  icon: "success",
                });

                navigate("/member/memberMain");
              } else {
                Swal.fire({
                  title: "회원정보 수정 실패",
                  text: "다시 시도해 주세요",
                  icon: "error",
                });
                navigate("/member/memberMain");
              }
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          Swal.fire({
            title: "입력값 확인",
            text: "비밀번호 일치 여부를 확인하세요",
            icon: "info",
          });
        }
      } else if (!updatePw && updateEmail) {
        //3. 비밀번호 기존 사용, 이메일 변경
        if (emailCodeCheck) {
          axios
            .patch(`${backServer}/member`, member)
            .then((res) => {
              if (res.data == 1) {
                Swal.fire({
                  title: "회원정보 수정 성공",
                  text: "회원정보 수정이 완료되었습니다. ",
                  icon: "success",
                });

                navigate("/member/memberMain");
              } else {
                Swal.fire({
                  title: "회원정보 수정 실패",
                  text: "다시 시도해 주세요",
                  icon: "error",
                });
                navigate("/member/memberMain");
              }
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          Swal.fire({
            title: "입력값 확인",
            text: "이메일 인증코드를 확인하세요",
            icon: "info",
          });
        }
      } else if (updatePw && updateEmail) {
        //4. 이메일, 비밀번호 변경
        if (member.memberPw == memberPwRe && emailCodeCheck) {
          axios
            .patch(`${backServer}/member`, member)
            .then((res) => {
              if (res.data == 1) {
                Swal.fire({
                  title: "회원정보 수정 성공",
                  text: "회원정보 수정이 완료되었습니다. ",
                  icon: "success",
                });

                navigate("/member/memberMain");
              } else {
                Swal.fire({
                  title: "회원정보 수정 실패",
                  text: "다시 시도해 주세요",
                  icon: "error",
                });
                navigate("/member/memberMain");
              }
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          Swal.fire({
            text: "입력값 확인",
            title: "비밀번호 일치여부, 이메일 인증코드를 확인하세요 ",
            icon: "info",
          });
        }
      }
    }
  };

  return (
    <section>
      <div className="memberMain-title">
        <p style={{ fontWeight: "600", fontSize: "32px" }}>회원 정보 수정</p>
        <span className="memberUpdate-title-contnet">
          변경 할 정보만 수정해주세요
        </span>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          updateMember();
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
                      placeholder="ex. 000-0000-0000"
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
                      onChange={inputData}
                      onBlur={checkPw}
                    />
                  </li>
                  <li className="join-span">
                    <span className="" ref={noChangePwMsg}></span>
                  </li>
                </label>
              </ul>
            </div>

            <div
              ref={changePw}
              className="memberUpdate-item memberUpdatePw-not"
            >
              <label htmlFor="memberPwRe">비밀번호 확인</label>
              <ul className="input-line memberUpdate-line">
                <label htmlFor="memberPwRe">
                  <li className="join-input">
                    <input
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
              <label htmlFor="memberEmail">이메일</label>
              <ul className="input-line memberUpdate-line">
                <label htmlFor="memberEmail">
                  <li className="join-input">
                    <input
                      className="memberUpdate-input-content"
                      type="text"
                      name="memberEmail"
                      id="memberEmail"
                      placeholder="ex. ID@example.com"
                      value={member.memberEmail}
                      onChange={inputData}
                      onBlur={checkEmail}
                    />
                  </li>
                  <li className="join-span">
                    <span className={joinEmailReCss ? "join-su" : "join-f"}>
                      {member.memberEmail == "" ? "" : checkEmailMsg}
                    </span>
                  </li>
                </label>
              </ul>
            </div>

            <section>
              <JoinEmailCode
                joinEmailRe={joinEmailRe}
                memberEmail={member.memberEmail}
                setEmailCodeCheck={setEmailCodeCheck}
              ></JoinEmailCode>
            </section>
          </div>
        </div>
        <div className="member-mypage-btn-wrap">
          <button
            style={{
              marginRight: "10px",
              padding: "3px 8px",
              height: "36.67px",
              width: "145px",
            }}
            type="submit"
            className="btn-red member-mypage-btn"
          >
            수정
          </button>
          <Link
            style={{ padding: "5px 56px" }}
            to="/member/memberMain"
            className="btn-red member-mypage-btn"
          >
            취소
          </Link>
        </div>
      </form>
    </section>
  );
};

export default MemberUpdate;
