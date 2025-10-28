import { useRecoilState } from "recoil";
import { loginIdState } from "../utils/RecoilData";

const FAQFrm = (props) => {
  const faqQuestion = props.faqQuestion;
  const setFaqQuestion = props.setFaqQuestion;
  const faqAnswer = props.faqAnswer;
  const setFaqAnswer = props.setFaqAnswer;
  const [memberId, setMemberId] = useRecoilState(loginIdState);
  return (
    <div className="frm-wrap">
      <div className="input-title">작성자 : 관리자</div>
      <div className="input-title">질문</div>
      <input
        type="text"
        value={faqQuestion}
        onChange={(e) => setFaqQuestion(e.target.value)}
      ></input>
      <div className="input-title">답변</div>
      <input
        type="text"
        value={faqAnswer}
        onChange={(e) => setFaqAnswer(e.target.value)}
      ></input>
    </div>
  );
};

export default FAQFrm;
