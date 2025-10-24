import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import {
  authReadyState,
  loginIdState,
  memberLevelState,
} from "../utils/RecoilData";
import axios from "axios";
import PqAnswerFrm from "./PqAnswerFrm";

const PQDetail = () => {
  const params = useParams();
  const pqNo = params.pqNo;
  const [pq, setPq] = useState(null);
  const [memberId, setMemberId] = useRecoilState(loginIdState);
  const [authReady, setAuthReady] = useRecoilState(authReadyState);
  const [memberLevel, setMemberLevel] = useRecoilState(memberLevelState);
  const navigate = useNavigate();
  const backToList = () => {
    navigate("/cs/pq");
  };
  console.log(memberId);
  console.log(pq);
  const detailFunc = () => {
    axios
      .get(`${import.meta.env.VITE_BACK_SERVER}/cs/pq/detail/${pqNo}`)
      .then((res) => {
        console.log(res);
        setPq(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    detailFunc();
  }, [pqNo]);
  return (
    <section className="section pq-detail-wrap">
      {pq && (
        <>
          <div className="title-wrap detailWrap">
            <div className="title">{pq.pqTitle}</div>
          </div>
          <div className="info-wrap">
            <div className="writer pq-writer">작성자 : {pq.memberId}</div>
            <div className="date pq-date">{pq.pqDate}</div>
          </div>
          <div className="input-title">첨부파일</div>
          <div className="file-zone">
            {pq.pqFileList.map((file, index) => {
              return <FileItem key={"file-" + index} file={file} />;
            })}
          </div>
          <div className="input-title">내용</div>
          <div
            className="pq-content-wrap"
            dangerouslySetInnerHTML={{ __html: pq.pqContent }}
          ></div>
          {pq.pqAnswer ? (
            <>
              <div className="input-title">답변</div>
              <div className="pq-answer-wrap answered">
                <div className="pq-admin-name">관리자</div>
                <div className="pq-answer-content-frm">{pq.pqAnswer}</div>
              </div>
            </>
          ) : memberLevel === 1 ? (
            <>
              <div className="input-title">답변 등록하기</div>
              <div className="pq-answer-wrap not-answered">
                <PqAnswerFrm pqNo={pq.pqNo} pqAnswer={pq.pqAnswer} />
              </div>
            </>
          ) : (
            <>
              <div className="input-title">답변</div>
              <div className="pq-answer-wrap no-answer">답글 없음</div>
            </>
          )}
          <div className="btn-zone">
            <button
              type="button"
              className="btn-red backBtn"
              onClick={backToList}
            >
              뒤로가기
            </button>
          </div>
        </>
      )}
    </section>
  );
};
export default PQDetail;
