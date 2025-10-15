import { useState } from "react";
import NoticeFrm from "./NoticeFrm";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import axios from "axios";

const NoticeWrite = () => {
  const [noticeTitle, setNoticeTitle] = useState("");
  const [noticeFile, setNoticeFile] = useState([]);
  const [noticeContent, setNoticeContent] = useState("");
  //const [memberId, setMemberId] = useRecoilState(null);
  const nav = useNavigate();
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
            nav("/cs/notice");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  return (
    <section className="section">
      <div className="title-wrap">
        <div className="title">공지사항 작성</div>
      </div>
      <div className="frm-input-wrap">
        <NoticeFrm />
      </div>
      <div className="btn-zone">
        <button type="submit">등록하기</button>
      </div>
    </section>
  );
};
export default NoticeWrite;
