import { useState } from "react";
import NoticeFrm from "./NoticeFrm";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import axios from "axios";
import TextEditor from "../utils/TextEditor";

const NoticeWrite = () => {
  const [noticeTitle, setNoticeTitle] = useState("");
  const [noticeFile, setNoticeFile] = useState([]);
  const [noticeContent, setNoticeContent] = useState("");
  //const [memberId, setMemberId] = useRecoilState(null);
  const navigate = useNavigate();
  const write = () => {
    if (noticeTitle !== "" && noticeContent !== "") {
      const form = new FormData();
      form.append("noticeTitle", noticeTitle);
      form.append("noticeContent", noticeContent);
      form.append("noticeWriter", memberId);
      for (let i = 0; i < noticeFile.length; i++) {
        form.append("noticeFile", noticeFile[i]);
      }
      axios
        .post(`${import.meta.env.VITE_BACK_SERVER}/cs`, form, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          console.log(res);
          if (res.data > 0) {
            navigate("/cs/notice");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  return (
    <section className="section write-wrap">
      <div className="title-wrap">
        <div className="title">공지사항 작성</div>
      </div>
      <div className="frm-input-wrap">
        <NoticeFrm
          noticeTitle={noticeTitle}
          setNoticeTitle={setNoticeTitle}
          noticeFile={noticeFile}
          setNoticeFile={setNoticeFile}
        />
        <div className="texteditor-wrap">
          <div className="input-title">내용</div>
          <TextEditor data={noticeContent} setData={setNoticeContent} />
        </div>
      </div>
      <div className="btn-zone">
        <button type="submit" onClick={write}>
          등록하기
        </button>
      </div>
    </section>
  );
};
export default NoticeWrite;
