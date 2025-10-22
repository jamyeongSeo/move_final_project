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
  const [memberId] = useRecoilState(loginIdState);
  const [showFileList, setShowFileList] = useState([]); // 새로 추가한 파일 이름 목록
  // 파일 추가
  const addNoticeFile = (e) => {
    const files = e.target.files;
    const newNoticeFile = [...noticeFile];
    const newShowList = [...showFileList];
    for (let i = 0; i < files.length; i++) {
      newNoticeFile.push(files[i]);
      newShowList.push(files[i].name);
    }
    setNoticeFile(newNoticeFile);
    setShowFileList(newShowList);
  };

  return (
    <div className="frm-wrap">
      <div className="input-title">작성자 : {memberId}</div>

      <div className="input-title">제목</div>
      <input
        type="text"
        value={noticeTitle}
        onChange={(e) => setNoticeTitle(e.target.value)}
      />

      <div className="input-title">첨부파일</div>
      <input
        type="file"
        multiple
        style={{ display: "none" }}
        id="noticeFile"
        onChange={addNoticeFile}
      />
      <label htmlFor="noticeFile" className="btn-gray fileInput">
        파일첨부
      </label>

      <div className="input-title">첨부목록</div>
      <div className="file-zone">
        {/* 기존 파일 */}
        {fileList &&
          fileList.map((noticeFile, i) => {
            const deleteFile = () => {
              const newFileList = fileList.filter((item, index) => {
                return i != index; // 기존 파일 삭제
              });
              setFileList(newFileList);
              // 삭제된 파일번호 기록
              setDelFileNo([...delFileNo, noticeFile.noticeFileNo]);
            };
            return (
              <p key={"notice-file-" + i}>
                <span className="filename">{noticeFile.filename}</span>
                <DeleteIcon onClick={deleteFile} />
              </p>
            );
          })}

        {/* 새로 추가한 파일 */}
        {showFileList &&
          showFileList.map((filename, i) => {
            const deleteFile = () => {
              const newShowFileList = showFileList.filter((item, index) => {
                return i != index; // 화면에 보여주는 파일 이름 제거
              });
              setShowFileList(newShowFileList);

              const newNoticeFileList = noticeFile.filter((item, index) => {
                return i != index; // 실제 첨부파일 배열에서도 제거
              });
              setNoticeFile(newNoticeFileList);
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
