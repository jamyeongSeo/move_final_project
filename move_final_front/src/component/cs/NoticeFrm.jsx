import { useState } from "react";
import { useRecoilState } from "recoil";

const NoticeFrm = (props) => {
  const noticeTitle = props.noticeTitle;
  const setNoticeTitle = props.setNoticeTitle;
  const noticeFile = props.noticeFile;
  const setNoticeFile = props.setNoticeFile;
  const noticeContent = props.noticeContent;
  const setNoticeContent = props.setNoticeContent;
  //const [memberId,setMemberId] = useRecoilState(loginIdState);
  const [showFileList, setShowFileList] = useState([]);
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
      <div className="input-title">파일첨부</div>
    </div>
  );
};
export default NoticeFrm;
