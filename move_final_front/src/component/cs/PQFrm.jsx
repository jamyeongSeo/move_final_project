import { useRecoilState } from "recoil";
import { loginIdState } from "../utils/RecoilData";
import { useState } from "react";
import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { DeleteIcon } from "lucide-react";

const PQFrm = (props) => {
  const pqTitle = props.pqTitle;
  const setPqTitle = props.setPqTitle;
  const pqFile = props.pqFile;
  const setPqFile = props.setPqFile;
  const fileList = props.fileList;
  const setFileList = props.setFileList;
  const delFileNo = props.delFileNo;
  const setDelFileNo = props.setDelFileNo;
  const pqCategory = props.pqCategory;
  const setPqCategory = props.setPqCategory;
  const [memberId, setMemberId] = useRecoilState(loginIdState);
  const [showFileList, setShowFileList] = useState([]);
  const [categoryValue, setCategoryValue] = useState(0);

  const addPqFile = (e) => {
    const files = e.target.files;
    const newPqFile = [...pqFile];
    const newShowList = [...showFileList];
    for (let i = 0; i < files.length; i++) {
      newPqFile.push(files[i]);
      newShowList.push(files[i].name);
    }
    setPqFile(newPqFile);
    setShowFileList(newShowList);
  };
  const handleCategoryChange = (e) => {
    setCategoryValue(e.target.value);
    setPqCategory(e.target.value);
  };
  return (
    <div className="frm-wrap">
      <div className="input-title">제목</div>
      <input
        type="text"
        value={pqTitle}
        onChange={(e) => setPqTitle(e.target.value)}
      />
      <div className="sub-title-wrap">
        <div className="input-title pqFileTitle">
          첨부목록
          <input
            type="file"
            multiple
            style={{ display: "none" }}
            id="pqFile"
            onChange={addPqFile}
          />
          <label htmlFor="pqFile" className="btn-gray pqFileInput">
            파일첨부
          </label>
        </div>
        <dic className="input-title selectCategoty">문의유형</dic>
      </div>
      <div className="sub-input-wrap">
        <div className="file-input-wrap">
          <div className="file-zone pqFileZone">
            {/* 기존 파일 */}
            {fileList &&
              fileList.map((pqFile, i) => {
                const deleteFile = () => {
                  const newFileList = fileList.filter((item, index) => {
                    return i != index; // 기존 파일 삭제
                  });
                  setFileList(newFileList);
                  // 삭제된 파일번호 기록
                  setDelFileNo([...delFileNo, pqFile.pqFileNo]);
                };
                return (
                  <p key={"pq-file-" + i}>
                    <span className="filename">{pqFile.filename}</span>
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

                  const newPqFileList = pqFile.filter((item, index) => {
                    return i != index; // 실제 첨부파일 배열에서도 제거
                  });
                  setPqFile(newPqFileList);
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
        <div className="category-zone">
          <Box size="small" sx={{ width: "100%" }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">문의 유형</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={categoryValue}
                label="문의 유형"
                onChange={handleCategoryChange}
                sx={{
                  width: "100%",
                  height: 42,
                  fontSize: "16px",
                  ".MuiSelect-select": {
                    paddingTop: "4px",
                    paddingBottom: "4px",
                    textAlign: "center",
                  },
                }}
              >
                <MenuItem value={0}>선택</MenuItem>
                <MenuItem value={1}>영화정보</MenuItem>
                <MenuItem value={2}>회원</MenuItem>
                <MenuItem value={3}>결제</MenuItem>
                <MenuItem value={4}>예매</MenuItem>
                <MenuItem value={5}>기타</MenuItem>
                <MenuItem value={6}>제안/건의</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </div>
      </div>
    </div>
  );
};
export default PQFrm;
