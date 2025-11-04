import { useState } from "react";
import { useRecoilState } from "recoil";
import { loginIdState } from "../utils/RecoilData";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import FAQFrm from "./FAQFrm";

const FAQWrite = () => {
  const [faqQuestion, setFaqQuestion] = useState("");
  const [faqAnswer, setFaqAnswer] = useState("");
  const [memberId, setMemberId] = useRecoilState(loginIdState);
  const navigate = useNavigate();

  const write = () => {
    if (faqQuestion !== "" && faqAnswer !== "") {
      const form = new FormData();
      form.append("faqQuestion", faqQuestion);
      form.append("faqAnswer", faqAnswer);
      form.append("memberId", memberId);
      axios
        .post(`${import.meta.env.VITE_BACK_SERVER}/cs/faq/frm`, form, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          if (res.data > 0) {
            navigate("/cs/faq");
          }
        })
        .catch((err) => {});
    }
  };
  return (
    <section className="section write-wrap">
      <div className="title-wrap">
        <div className="title">FAQ 작성</div>
      </div>
      <div className="frm-input-wrap">
        <FAQFrm
          memberId={memberId}
          setMemberId={setMemberId}
          faqQuestion={faqQuestion}
          setFaqQuestion={setFaqQuestion}
          faqAnswer={faqAnswer}
          setFaqAnswer={setFaqAnswer}
        />
      </div>
      <div className="btn-zone writeBtn">
        <button type="submit" onClick={write} className="btn-red">
          등록하기
        </button>
      </div>
    </section>
  );
};
export default FAQWrite;
