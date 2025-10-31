import axios from "axios";
import { useEffect, useRef, useState } from "react";

const JoinEmailCode = (props) => {
  const setEmailCodeCheck = props.setEmailCodeCheck;
  const memberEmail = props.memberEmail;
  const joinEmailRe = props.joinEmailRe;
  const [emailCode, setEmailCode] = useState(""); //발송된 인증번호
  const [emailCodeReMsg, setEmailCodeReMsg] = useState(0); //인증코드 확인용(1:성공/2:실패)
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
            //console.log(prev);(시간 카운팅 관련)
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
                    : emailCodeReMsg == 2 && "인증 실패"}
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

export default JoinEmailCode;
