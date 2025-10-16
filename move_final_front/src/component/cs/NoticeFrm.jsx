import { useState } from "react";
import { useRecoilState } from "recoil";

const NoticeFrm = (props) => {
  const noticeTitle = props.noticeTitle;
  const setNoticeTitle = props.setNoticeTitle;
  const noticeFile = props.noticeFile;
  const setNoticeFile = props.setNoticeFile;
  //const [memberId,setMemberId] = useRecoilState(loginIdState);
  const [showFileList, setShowFileList] = useState([]);

  const addNoticeFile = (e) => {
    const files = e.target.value;
    const fileArr = new Array();
    const fileNameArr = new Array();
    for (let i = 0; i < files.length; i++) {
      fileArr.push(files[i]);
      fileNameArr.push(files[i]);
    }
    setNoticeFile(...noticeFile, ...fileArr);
    setShowFileList(...showFileList, fileNameArr);
  };

  return (
    <div className="frm-wrap">
      <div className="input-title">제목</div>
      <input
        type="text"
        name="noticeTitle"
        id="noticeTitle"
        value={noticeTitle}
        onChange={(e) => {
          setNoticeTitle(e.target.value);
        }}
      ></input>
      <div className="input-title">첨부파일</div>
      <input
        type="file"
        id="noticeFile"
        multiple
        style={{ display: "none" }}
        onChange={addNoticeFile}
      ></input>
      <label htmlFor="noticeFile" className="add-file"></label>
    </div>
  );
};
export default NoticeFrm;
