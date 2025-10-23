import { useState } from "react";
import PQFrm from "./PQFrm";
import { useRecoilState } from "recoil";
import { loginIdState } from "../utils/RecoilData";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import TextEditor from "../utils/TextEditor";

const PQWrite = () => {
  const [pqTitle, setPqTitle] = useState("");
  const [pqFile, setPqFile] = useState([]);
  const [pqContent, setPqContent] = useState([]);
  const [memberId, setMemberId] = useRecoilState(loginIdState);
  const navigate = useNavigate();
  const write = () => {
    if (pqTitle !== "" && pqContent !== "") {
      const form = new FormData();
      form.append("pqTitle", pqTitle);
      form.append("pqContent", pqContent);
      form.append("memberId", memberId);
      for (let i = 0; i < pqFile.length; i++) {
        form.append("pqFile", pqFile[i]);
      }
      axios
        .post(`${import.meta.env.VITE_BACK_SERVER}/cs/pq/frm`, form, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          console.log(res.data);
          if (res.data > 0) {
            navigate("/cs/pq");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  return (
    <section className="section pq-write-wrap">
      <div className="title-wrap">
        <div className="title">1:1 문의</div>
      </div>
      <div className="frm-input-wrap">
        <PQFrm
          memberId={memberId}
          setMemberId={setMemberId}
          pqTitle={pqTitle}
          setPqTitle={setPqTitle}
          pqFile={pqFile}
          setPqFile={setPqFile}
        />
        <div className="texteditor-wrap">
          <div className="input-title">내용</div>
          <TextEditor data={pqContent} setData={setPqContent} />
        </div>
      </div>
      <div className="btn-zone writeBtn">
        <button type="submit" onClick={write} className="btn-red">
          등록하기
        </button>
      </div>
    </section>
  );
};
export default PQWrite;
