import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import NoticeFrm from "./NoticeFrm";
import TextEditor from "../utils/TextEditor";

const NoticeUpdate = () => {
  const params = useParams();
  const noticeNo = params.noticeNo;
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACK_SERVER}/cs/notice/detail/${noticeNo}`)
      .then((res) => {
        console.log(res);
        setNoticeTitle(res.data.noticeTitle);
        setFileList(res.data.fileList);
        setNoticeContent(res.data.noticeContent);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const [noticeTitle, setNoticeTitle] = useState("");
  const [noticeFile, setNoticeFile] = useState([]);
  const [noticeContent, setNoticeContent] = useState("");
  const [fileList, setFileList] = useState([]);
  const [delFileNo, setDelFileNo] = useState([]);

  const updateNotice = () => {
    if (noticeTitle !== "" && noticeContent !== "") {
      const form = new FormData();
      form.append("noticeNo", noticeNo);
      form.append("noticeTitle", noticeTitle);
      form.append("noticeContent", noticeContent);
      for (let i = 0; i < noticeFile.length; i++) {
        form.append("noticeFile", noticeFile[i]);
      }
      for (let i = 0; i < delFileNo.length; i++) {
        form.append("delFileNo", delFileNo[i]);
      }
      axios
        .patch(`${import.meta.env.VITE_BACK_SERVER}/cs/notice/update`, form, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          navigate(`/cs/notice/detail/${noticeNo}`);
        });
    }
  };
  return (
    <section className="section update-wrap">
      <div className="title-wrap">
        <div className="input-title">게시글 수정</div>
      </div>
      <NoticeFrm
        noticeTitle={noticeTitle}
        setNoticeTitle={setNoticeTitle}
        noticefile={noticeFile}
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
