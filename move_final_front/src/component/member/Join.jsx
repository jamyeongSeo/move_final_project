import { use, useEffect } from "react";
import { useRef, useState } from "react";
import "./member.css";
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Join = () => {
  const joinAgreeEnd = useRef();
  const joinMainStart = useRef();

  const [checks, setChecks] = useState({
    agree1: false,
    agree2: false,
    agree3: false,
    allAgree: false,
  });
  const allCheck = (e) => {
    const checked = e.target.checked;
    const newChecks = {
      agree1: checked,
      agree2: checked,
      agree3: checked,
      allAgree: checked,
    };
    setChecks(newChecks);
  };
  const checkAll = (e) => {
    const checked = e.target.checked;
    const name = e.target.name;
    const newChecks = { ...checks, [name]: checked };
    const agreeAllChecks =
      newChecks.agree1 && newChecks.agree2 && newChecks.agree3;
    setChecks({ ...newChecks, allAgree: agreeAllChecks });
  };
  const nextJoin = () => {
    if (checks.agree1 && checks.agree2) {
      joinAgreeEnd.current.classList.add("joinAgree-none");
      joinMainStart.current.classList.remove("joinMain-none");
    } else {
      Swal.fire({
        title: "필수 약관에 모두 동의 후 회원가입 진행 가능합니다",
      });
    }
  };
  return (
    <div className="content-wrap">
      <div className="join-wrap">
        <div className="title-logo">I_MOVE_U</div>
        <section ref={joinAgreeEnd}>
          <div className="joinAgree-title">
            <h3>약관동의 및 정보활용동의</h3>
            <span>I_MOVE_U 서비스 이용을 위한 약관에 동의해주세요</span>
            <hr></hr>
          </div>
          <div className="joinAgree-content">
            <div>
              <input
                type="checkbox"
                name="agree1"
                value="agree1"
                id="agree1"
                checked={checks.agree1}
                onChange={checkAll}
              />
              <label className="joinAgree-checkbox-title" htmlFor="agree1">
                서비스 이용 약관 동의(필수)
              </label>
              <div className="joinAgree-checkbox-content">
                <p>
                  제1조 (목적) 이 약관은 I_MOVE_U (이하 "회사")가 제공하는
                  온라인 서비스(웹사이트, 모바일 앱 포함)의 이용 조건 및 절차,
                  회사와 회원 간의 권리, 의무 및 책임사항 등을 규정함을 목적으로
                  합니다.
                </p>
                <br></br>
                <p>
                  제2조 (회원가입) 회원은 회사가 정한 가입 양식에 따라
                  회원정보를 기입하고 본 약관에 동의함으로써 가입이 완료됩니다.
                </p>
                <br></br>
                <p>
                  제3조 (서비스 제공) 회사는 영화 예매, 할인 정보 제공, 포인트
                  적립 등 다양한 온라인 서비스를 제공합니다.
                </p>
                <br></br>
                <p>
                  제4조 (회원의 의무) 회원은 타인의 개인정보를 도용하거나 허위
                  정보를 제공해서는 안 됩니다. 회원은 서비스 이용 시 관계 법령과
                  본 약관을 준수해야 합니다.
                </p>
                <br></br>
                <p>
                  제5조 (계약 해지 및 제한) 회원은 언제든지 회원 탈퇴를 요청할
                  수 있으며, 회사는 부정행위 적발 시 서비스 이용을 제한할 수
                  있습니다.
                </p>
              </div>
            </div>

            <div>
              <input
                type="checkbox"
                name="agree2"
                value="agree1"
                id="agree2"
                checked={checks.agree2}
                onChange={checkAll}
              />
              <label className="joinAgree-checkbox-title" htmlFor="agree2">
                개인정보 수집 및 이용 동의(필수)
              </label>
              <div className="joinAgree-checkbox-content">
                <p>▶수집 항목</p>
                <p>
                  필수: 이름, 생년월일, 성별, 휴대전화번호, 이메일, 아이디,
                  비밀번호, 닉네임
                </p>
                <p>선택: 장르, 이벤트 참여 내역 등</p>
                <br></br>
                <p>▶수집 목적</p>
                <p>회원가입 및 본인 확인</p>
                <p>영화 예매 및 서비스 이용</p>
                <p>고객 응대 및 문의 처리</p>
                <p>쿠폰누적 및 사용 관리</p>
                <br></br>
                <p>▶보유 및 이용 기간</p>
                <p>각 쿠폰 만료 시까지 또는 회원 탈퇴 시까지</p>
                <p>
                  관계 법령에 따라 일정 기간 보관될 수 있음 (예: 전자상거래법상
                  거래 기록)
                </p>
                <br></br>
                <p>
                  동의 거부권 안내 이용자는 개인정보 수집에 대한 동의를 거부할
                  수 있으나, 이 경우 회원가입이 제한될 수 있습니다.
                </p>
              </div>
            </div>

            <div>
              <input
                type="checkbox"
                name="agree3"
                value="agree1"
                id="agree3"
                checked={checks.agree3}
                onChange={checkAll}
              />
              <label className="joinAgree-checkbox-title" htmlFor="agree3">
                마케팅 활용을 위한 개인정보 수집 및 이용 동의(선택)
              </label>
              <div className="joinAgree-checkbox-content">
                <p>▶수집 항목</p>
                <p>
                  이름, 연락처(이메일, 휴대폰 번호), 서비스 이용 이력, 관심 장르
                </p>
                <br></br>
                <p>▶이용 목적</p>
                <p>이벤트, 할인 혜택, 신작 개봉 소식 등 광고성 정보 전달</p>
                <p>개인 맞춤형 서비스 및 콘텐츠 추천</p>
                <p>마케팅 통계 분석</p>
                <br></br>
                <p>▶보유 및 이용 기간</p>
                <p>회원 탈퇴 또는 동의 철회 시까지</p>
                <p>
                  광고성 정보 수신에 대한 철회는 언제든지 설정을 통해 변경 가능
                </p>
                <br></br>
                <p>
                  동의 거부 시 불이익 동의를 거부해도 서비스 이용에는 지장이
                  없으나, 마케팅 혜택을 받지 못할 수 있습니다.
                </p>
              </div>
            </div>

            <div>
              <input
                type="checkbox"
                name="allAgree"
                value="agree1"
                id="allAgree"
                onChange={allCheck}
                checked={checks.allAgree}
              />
              <label className="joinAgree-checkbox-title" htmlFor="allAgree">
                전체동의(선택)
              </label>
            </div>
          </div>
          <div className="joinAgree-btn-box">
            <button
              type="button"
              className="btn-red joinAgree-btn"
              onClick={nextJoin}
            >
              확인
            </button>
          </div>
        </section>
        <div ref={joinMainStart} className="joinMain-none">
          <JoinMain></JoinMain>
        </div>
      </div>
    </div>
  );
};

const JoinMain = () => {
  const [member, setMember] = useState({
    memberId: "",
    memberPw: "",
    memberEmail: "",
    memberName: "",
    memberBirth: "",
    memberGender: "",
    memberPhone: "",
  });

  //이름, 생년월일, 전화번호
  const inputData = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    const newMember = { ...member, [name]: value };
    setMember(newMember);
  };

  //아이디 유효성 검사
  const [IdCheckMsg, setIdcheckMsg] = useState(0); //0:검사 전/1:사용가능//2:사용 불가(중복)//3:사용불가(정규표현식)
  const memberIdCheck = () => {
    //정규표현식
    const idRef = /^[a-zA-Z0-9]{6,12}$/;
    if (member.memberId != "") {
      if (idRef.test(member.memberId)) {
        //true면 아이디 중복체크
        axios
          .get(`${backServer}/member/checkId?memberId=${member.memberId}`)
          .then((res) => {
            if (res.data == 0) {
              //사용 가능한 아이디 입니다.
              setIdcheckMsg(1);
            } else {
              //이미 사용중인 아이디입니다.
              setIdcheckMsg(2);
            }
          });
      } else {
        //정규표현식 조건 불충
        setIdcheckMsg(3);
      }
    } else {
      setIdcheckMsg(0);
    }
  };

  //비밀번호
  const [memberPwRe, setMemberPwRe] = useState("");
  const pwMsgRef = useRef(null);
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
  const checkPwRe = (e) => {
    setMemberPwRe(e.target.value);
  };

  //이메일
  const [joinEmailRe, setJoinEmailRe] = useState(false);
  const [checkEmailMsg, setCheckEmailMsg] = useState("");
  const [memberEmail, setMemberEmail] = useState("");
  useEffect(() => {
    setJoinEmailRe(false);
    setMemberEmail("");
    setCheckEmailMsg("");
  }, [member.memberEmail]);

  //이메일 코드 인증 결과
  const [emailCodeCheck, setEmailCodeCheck] = useState(false);

  const backServer = import.meta.env.VITE_BACK_SERVER;
  const checkEmail = () => {
    if (member.memberEmail != "") {
      axios
        .get(
          `${backServer}/member/checkEmail?memberEmail=${member.memberEmail}`
        )
        .then((res) => {
          if (res.data != 0) {
            setJoinEmailRe(false);
            setCheckEmailMsg("이미 사용 중인 이메일입니다");
          } else {
            //사용 가능 이메일이면.
            setJoinEmailRe(true);
            setMemberEmail(member.memberEmail);
            setCheckEmailMsg("사용 가능한 이메일입니다");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  //성별 체크
  const checkGender = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    const newMember = { ...member, memberGender: value };
    setMember(newMember);
  };

  //회원가입 조건 검사 및 회원가입
  const navigate = useNavigate();
  const joinMember = () => {
    /*
    //모든 값 입력 확인
    if (
      member.memberId != "" &&
      member.memberPw != "" &&
      member.memberEmail &&
      member.memberName != "" &&
      member.memberBirth != "" &&
      member.memberGender != "" &&
      member.memberPhone != ""
    ) {
      //아이디/비밀번호/이메일인증
      if (IdCheckMsg == 1 && member.memberPw == memberPwRe && emailCodeCheck) {
        axios.post(`${backServer}/member`, member).then((res) => {
          if (res.data == 1) {
            Swal.fire({
              title: "회원가입 성공",
              text: "환영합니다",
              icon: "success",
            });
            axios
              .get(
                `${backServer}/email/wellcomCupon?memberEmail=${member.memberEmail}`
              )
              .then((res) => {
                Swal.fire({
                  title: "WellcomCupon!!",
                  text: "환영합니다. 웰컴 쿠폰이 발행되었습니다. 자세한 내용은 마이페이지에서 확인해주세요!",
                  icon: "success", //쿠폰 이미지 나중에 변경하기
                });
              })
              .catch((err) => {
                console.log(err);
              });
          }
        });
      }
    } else {
      Swal.fire({
        title: "입력값 확인",
        text: "입력값을 확인하세요",
        icon: "warning",
      });
    }*/
  };

  console.log(member);

  return (
    <section>
      <div className="joinAgree-title">
        <h3>회원가입 정보입력</h3>
        <span> 가입을 위한 마지막 단계예요</span>
        <hr></hr>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          joinMember();
        }}
      >
        <div className="joinAgree-content">
          <div className="join-item">
            <ul className="input-line">
              <label htmlFor="memberId">
                <li className="join-input">
                  <input
                    type="text"
                    name="memberId"
                    id="memberId"
                    placeholder="아이디 영문, 숫자(6~12자)"
                    value={member.memberId}
                    onChange={inputData}
                    onBlur={memberIdCheck}
                  />
                </li>
                <li className="join-span">
                  <span className={IdCheckMsg == 1 ? "join-su" : "join-f"}>
                    {IdCheckMsg == 0
                      ? ""
                      : IdCheckMsg == 1
                      ? "사용 가능한 아이디입니다"
                      : IdCheckMsg == 2
                      ? "이미 사용중인 아이디입니다"
                      : IdCheckMsg == 3 && "영문,숫자 조합 6~12자로 입력하세요"}
                  </span>
                </li>
              </label>
            </ul>
          </div>

          <div className="join-item">
            <ul className="input-line">
              <label htmlFor="memberPw">
                <li className="join-input">
                  <input
                    type="password"
                    name="memberPw"
                    id="memberPw"
                    placeholder="비밀번호"
                    value={member.memberPw}
                    onChange={inputData}
                    onBlur={checkPw}
                  />
                </li>
              </label>
            </ul>
          </div>

          <div className="join-item">
            <ul className="input-line">
              <label htmlFor="memberPwRe">
                <li className="join-input">
                  <input
                    type="password"
                    name="memberPwRe"
                    id="memberPwRe"
                    placeholder="비밀번호 확인"
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

          <div className="join-item">
            <ul className="input-line">
              <label htmlFor="memberEmail">
                <li className="join-input">
                  <input
                    type="text"
                    name="memberEmail"
                    id="memberEmail"
                    placeholder="이메일주소 입력"
                    value={member.memberEmail}
                    onChange={inputData}
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
              setEmailCodeCheck={setEmailCodeCheck}
            ></JoinEmailCode>
          </section>

          <div className="join-item">
            <ul className="input-line">
              <label htmlFor="memberName">
                <li className="join-input">
                  <input
                    type="text"
                    name="memberName"
                    id="memberName"
                    placeholder="이름"
                    value={member.memberName}
                    onChange={inputData}
                  />
                </li>
              </label>
            </ul>
          </div>

          <div className="join-item join-memberBG">
            <ul className="join-memberBirth input-line ">
              <label htmlFor="memberBirth">
                <li className="join-input">
                  <input
                    type="text"
                    name="memberBirth"
                    id="memberBirth"
                    placeholder="생년월일 8자리(199990101)"
                    value={member.memberBirth}
                    onChange={inputData}
                  />
                </li>
              </label>
            </ul>

            <div className="join-radio">
              <input
                type="radio"
                onChange={checkGender}
                id="memberGenderM"
                name="memberGender"
                value={1}
              />
              <label
                htmlFor="memberGenderM"
                className={
                  member.memberGender == 1 ? "join-btn-red" : "join-btn-gray"
                }
              >
                남자
              </label>
              <input
                type="radio"
                onChange={checkGender}
                id="memberGenderG"
                name="memberGender"
                value={2}
              />
              <label
                htmlFor="memberGenderG"
                className={
                  member.memberGender == 2 ? "join-btn-red" : "join-btn-gray"
                }
              >
                여자
              </label>
            </div>
          </div>

          <div className="join-item">
            <ul className="input-line">
              <label htmlFor="memberPhone">
                <li className="join-input">
                  <input
                    type="text"
                    name="memberPhone"
                    id="memberPhone"
                    placeholder="휴대폰번호 '-'포함 입력"
                    value={member.memberPhone}
                    onChange={inputData}
                  />
                </li>
              </label>
            </ul>
          </div>
        </div>
        <div className="joinAgree-btn-box">
          <button type="submit" className="btn-red joinAgree-btn">
            회원가입
          </button>
        </div>
      </form>
    </section>
  );
};

const JoinEmailCode = (props) => {
  const setEmailCodeCheck = props.setEmailCodeCheck;
  const memberEmail = props.memberEmail;
  const joinEmailRe = props.joinEmailRe;
  const [emailCode, setEmailCode] = useState(""); //발송된 인증번호
  const [emailCodeReMsg, setEmailCodeReMsg] = useState(0); //인증코드 확인용(1:성공/2:실패/3:이메일 형식을 확인하세요)
  const codeCheck = useRef();

  const [sendEmailMsg, setSendEmailMsg] = useState(0);
  //0:발송 전 및 인증시간 초과:  / 1발송 성공 :"인증번호 입력"
  const [timer, setTimer] = useState(0); //인증 시간 3분
  const [timerIntervalId, setTimerIntervalId] = useState(null);
  const [resultCode, setResultCode] = useState("");
  const backServer = import.meta.env.VITE_BACK_SERVER;
  const sendCode = () => {
    //초기값 세팅
    setSendEmailMsg(0);
    setTimer(0);
    setResultCode("");
    if (timerIntervalId) {
      clearInterval(timerIntervalId);
    }
    setTimerIntervalId(null);
    setShowtimer();
    setEmailCodeCheck(false);
    setEmailCodeReMsg(0);
    codeCheck.current.classList.add("join-checkEmailCode-none");
    setEmailCode("");
    //인증번호 발송 버튼 순차적 시작
    axios
      .get(`${backServer}/email/sendCode?memberEmail=${memberEmail}`)
      .then((res) => {
        setResultCode(res.data);
        setSendEmailMsg(1);
        setTimer(180);
        //!!!!!!  interval 재이해 필요
        const id = setInterval(() => {
          setTimer((prev) => {
            console.log(prev);
            return prev - 1;
          });
        }, 1000);
        setTimerIntervalId(id);

        codeCheck.current.classList.remove("join-checkEmailCode-none");
      })

      .catch((err) => {
        console.log(err);
        setSendEmailMsg(0);
        setTimer(0);
        setResultCode("");
        if (timerIntervalId) {
          clearInterval(timerIntervalId);
        }
        setTimerIntervalId(null);
        setShowtimer();
        setEmailCodeReMsg(3);
      });
  };
  //타이머 분,초(0:00) 형식으로 저장할 변수
  const [showTimer, setShowtimer] = useState();
  //타이머 카운팅  //!!!!!!  interval 재이해 필요
  useEffect(() => {
    timeFunc();
  }, [timer]);
  const timeFunc = () => {
    if (0 <= timer && timer <= 180) {
      const minutes = Math.floor(timer / 60);
      const seconds = timer % 60;
      if (seconds < 10) {
        setShowtimer(`${minutes}:0${seconds}`);
      } else {
        setShowtimer(`${minutes}:${seconds}`);
      }
      if (timer == 0) {
        if (emailCodeReMsg == 1) {
          setSendEmailMsg(1);
        } else {
          setSendEmailMsg(0);
        }
      }
    } else if (timer < 0) {
      if (timerIntervalId) {
        clearInterval(timerIntervalId);
      }
    }
  };

  //이메일 코드 확인
  const emailCodeRe = () => {
    if (resultCode != "") {
      if (resultCode == emailCode) {
        setTimer(0);
        setEmailCodeReMsg(1);
        setEmailCodeCheck(true);
      } else if (resultCode != emailCode) {
        setEmailCodeReMsg(2);
        setEmailCodeCheck(false);
      }
    } else {
      setEmailCodeReMsg(0);
    }
  };
  //이메일주소 수정 시
  useEffect(() => {
    if (!joinEmailRe) {
      setSendEmailMsg(0);
      setTimer(0);
      setResultCode("");
      if (timerIntervalId) {
        clearInterval(timerIntervalId);
      }
      setTimerIntervalId(null);
      setShowtimer();
      setEmailCodeCheck(false);
      setEmailCodeReMsg(0);
      setEmailCode("");
      codeCheck.current.classList.add("join-checkEmailCode-none");
    }
  }, [joinEmailRe]);

  const emailMsgRe = useRef(null);
  return (
    <section>
      <div className={joinEmailRe ? "join-item" : "join-item-none"}>
        <div style={{ overflow: "hidden" }}>
          <div className="join-btn">
            <button
              type="button"
              className={sendEmailMsg == 0 ? "input-box" : "join-sendCode-btn"}
              onClick={sendCode}
            >
              인증번호 발송
            </button>
            <span>{showTimer == "0:00" ? "" : showTimer}</span>
          </div>
          <ul className="input-line" style={{ width: "585px", float: "right" }}>
            <label htmlFor="memberEmailRe">
              <li className="join-input">
                <input
                  style={{ height: "35px" }}
                  type="text"
                  name="memberEmailRe"
                  id="memberEmailRe"
                  placeholder={
                    sendEmailMsg == 1
                      ? "인증번호 입력"
                      : "인증번호를 발송해주세요"
                  }
                  value={emailCode}
                  onChange={(e) => {
                    setEmailCode(e.target.value);
                  }}
                />
              </li>
              <li className="join-span">
                <span className={emailCodeReMsg == 1 ? "join-su" : "join-f"}>
                  {emailCodeReMsg == 0
                    ? ""
                    : emailCodeReMsg == 1
                    ? "인증 성공"
                    : emailCodeReMsg == 2
                    ? "인증 실패"
                    : emailCodeReMsg == 3 && "이메일 형식을 확인하세요"}
                </span>
                <button
                  ref={codeCheck}
                  style={{ marginLeft: "10px" }}
                  type="button"
                  className="input-box join-checkEmailCode-none"
                  onClick={emailCodeRe}
                >
                  인증번호 확인
                </button>
              </li>
            </label>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Join;
