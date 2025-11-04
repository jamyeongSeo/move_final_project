import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import NoticeFrm from "./NoticeFrm";
import TextEditor from "../utils/TextEditor";

const NoticeUpdate = () => {
  const params = useParams();
  const noticeNo = params.noticeNo;
  const navigate = useNavigate();

  const [noticeTitle, setNoticeTitle] = useState("");
  const [noticeFile, setNoticeFile] = useState([]); // 새로 첨부할 파일
  const [fileList, setFileList] = useState([]); // 기존 파일 목록
  const [delFileNo, setDelFileNo] = useState([]); // 삭제할 파일 번호
  const [noticeContent, setNoticeContent] = useState("");

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACK_SERVER}/cs/notice/detail/${noticeNo}`)
      .then((res) => {
        setNoticeTitle(res.data.noticeTitle);
        setNoticeContent(res.data.noticeContent);
        setFileList(res.data.noticeFileList || []);
      })
      .catch((err) => {});
  }, []);

  // 수정 버튼 클릭 시
  const updateNotice = () => {
    if (noticeTitle === "" || noticeContent === "") {
      alert("제목과 내용을 입력해주세요.");
      return;
    }

    const form = new FormData();
    form.append("noticeNo", noticeNo);
    form.append("noticeTitle", noticeTitle);
    form.append("noticeContent", noticeContent);

    // 새로 추가된 파일들 첨부
    for (let i = 0; i < noticeFile.length; i++) {
      form.append("noticeFile", noticeFile[i]);
    }

    // 삭제할 파일 번호 첨부
    for (let i = 0; i < delFileNo.length; i++) {
      form.append("delFileNo", delFileNo[i]);
    }

    axios
      .patch(`${import.meta.env.VITE_BACK_SERVER}/cs/notice`, form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        navigate(`/cs/notice/detail/${noticeNo}`);
      })
      .catch((err) => {});
  };

  return (
    <section className="section update-wrap">
      <div className="title-wrap">
        <div className="input-title">게시글 수정</div>
      </div>

      <NoticeFrm
        noticeTitle={noticeTitle}
        setNoticeTitle={setNoticeTitle}
        noticeFile={noticeFile}
        setNoticeFile={setNoticeFile}
        fileList={fileList}
        setFileList={setFileList}
        delFileNo={delFileNo}
        setDelFileNo={setDelFileNo}
      />

      <div className="texteditor-wrap">
        <TextEditor data={noticeContent} setData={setNoticeContent} />
      </div>

      <div className="btn-zone updateButton">
        <button type="button" className="btn-red" onClick={updateNotice}>
          수정하기
        </button>
      </div>
    </section>
  );
};

export default NoticeUpdate;
