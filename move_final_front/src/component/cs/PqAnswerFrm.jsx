import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const PqAnswerFrm = (props) => {
  const pqAnswer = props.pqAnswer;
  const pqNo = props.pqNo;
  const checkAnswer = props.checkAnswer;
  const [pqAnswerValue, setPqAnswerValue] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    if (pqAnswer) {
      setPqAnswerValue(pqAnswer);
    }
  }, [pqAnswer]);
  const pqAnswerFunc = () => {
    axios
      .patch(`${import.meta.env.VITE_BACK_SERVER}/cs/pq/pqAnswer`, {
        pqNo,
        pqAnswer: pqAnswerValue,
      })
      .then((res) => {
        console.log(res);
        if (res.data > 0) {
          Swal.fire({
            title: "등록 성공",
            text: "답변이 등록되었습니다.",
            icon: "info",
          }).then((res) => {
            window.location.reload();
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="pq-answer-content">
      <textarea
        value={pqAnswer}
        onChange={(e) => {
          setPqAnswerValue(e.target.value);
        }}
      ></textarea>
      <button onClick={pqAnswerFunc} className="btn-red">
        등록
      </button>
    </div>
  );
};
export default PqAnswerFrm;
