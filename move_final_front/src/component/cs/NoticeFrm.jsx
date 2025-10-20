import { useState } from "react";
import { useRecoilState } from "recoil";
import { loginIdState } from "../utils/RecoilData";
import { DeleteIcon } from "lucide-react";

const NoticeFrm = (props) => {
  const noticeTitle = props.noticeTitle;
  const setNoticeTitle = props.setNoticeTitle;
  const noticeFile = props.noticeFile;
  const setNoticeFile = props.setNoticeFile;
  const fileList = props.fileList;
  const setFileList = props.setFileList;
  const delFileNo = props.delFileNo;
  const setDelFileNo = props.setDelFileNo;
  const [memberId, setMemberId] = useRecoilState(loginIdState);
  const [showFileList, setShowFileList] = useState([]);

  const addNoticeFile = (e) => {
    const files = e.target.files;
    const fileArr = new Array();
    const fileNameArr = new Array();
    for (let i = 0; i < files.length; i++) {
      fileArr.push(files[i]);
      fileNameArr.push(files[i].name);
    }
    setNoticeFile([...noticeFile, ...fileArr]);
    setShowFileList([...showFileList, ...fileNameArr]);
  };
  console.log("update fileList =", fileList);
  return (
    <div className="frm-wrap">
      <div className="input-title">작성자 : {memberId}</div>
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
      <div className="input-title ">첨부파일</div>
      <input
        type="file"
        id="noticeFile"
        multiple
        style={{ display: "none" }}
        onChange={addNoticeFile}
      ></input>
      <label htmlFor="noticeFile" className="btn-gray fileInput">
        파일첨부
      </label>
      <div className="input-title">첨부목록</div>
      <div className="file-zone">
        {fileList &&
          fileList.map((noticeFile, i) => {
            const deleteFile = () => {
              const newFileList = fileList.filter((item, index) => {
                return i != index;
              });
              setFileList(newFileList);
              //기존 파일 중 삭제하는 파일번호를 저장
              setDelFileNo([...delFileNo, noticeFile.noticeFileNo]);
            };
            return (
              <p key={"notice-file-" + i}>
                <span className="filename">{noticeFile.filename}</span>
                <DeleteIcon onClick={deleteFile} />
              </p>
            );
          })}
        {showFileList.map((filename, i) => {
          const deleteFile = () => {
            const newFileList = showFileList.filter((item, index) => {
              return index !== i;
            });
            setShowFileList(newFileList);
            const newNoticeFile = noticeFile.filter((item, index) => {
              return index !== i;
            });
            setNoticeFile(newNoticeFile);
          };
          return (
            <p key={"file-" + i}>
              <span className="filename">{filename}</span>
              <DeleteIcon onClick={deleteFile} />
            </p>
          );
        })}
      </div>
    </div>
  );
};
export default NoticeFrm;
