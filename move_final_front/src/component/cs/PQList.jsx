import { useNavigate, useParams } from "react-router-dom";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import {
  authReadyState,
  loginIdState,
  memberLevelState,
} from "../utils/RecoilData";
import axios from "axios";
import PageNavigation from "../utils/PageNavigation";
import Swal from "sweetalert2";
import Select from "@mui/material/Select";
import { Box, FormControl, InputLabel, MenuItem } from "@mui/material";

const PQList = () => {
  const [pqList, setPqList] = useState([]); //1:1문의 리스트를 저장하는 state
  const [reqPage, setReqPage] = useState(1); //현재 페이지 값을 저장하는 state
  const [pi, setPi] = useState(null); //현재 페이지가 갖고있는 데이터 값을 저장하는 state
  const [totalCount, setTotalCount] = useState(0); //전체 게시물 수를 저장하는 state
  const [search, setSearch] = useState(""); //검색 결과를 저장하는 state
  const [authReady, setAuthReady] = useRecoilState(authReadyState); //refresh 초기회 확인용 데이터를 저장하는 recoil
  const [memberLevel, setMemberLevel] = useRecoilState(memberLevelState); //해당 recoil 계정의 memberLevel값을 갖고있는 state
  const [loginId, setLoginId] = useRecoilState(loginIdState);
  const [category, setCategory] = useState(0);
  const navigate = useNavigate();
  const pqFunc = () => {
    axios
      .get(
        `${
          import.meta.env.VITE_BACK_SERVER
        }/cs/pq?reqPage=${reqPage}&pqTitle=${search}&memberId=${loginId}&memberLevel=${memberLevel}&category=${category}`
      )
      .then((res) => {
        console.log(res);
        setPqList(res.data.pqList);
        setPi(res.data.pi);
        setTotalCount(res.data.totalCount);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (!authReady) {
      Swal.fire({
        title: "권한 없음.",
        text: "로그인 후 이용바랍니다.",
        icon: "warning",
      }).then((res) => {
        navigate("/common/login");
      });
      return;
    } else if (authReady) {
      pqFunc();
    }
  }, [reqPage, authReady, category]);

  const searchInput = () => {
    setReqPage(1);
    pqFunc();
  };
  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    switchList(1, value);
  };
  const switchList = () => {};

  return (
    <section className="section pq-list-wrap">
      <div className="title-wrap">
        {memberLevel === 1 ? (
          <div className="title">1:1 문의 내역</div>
        ) : (
          <div className="title">나의 문의 내역</div>
        )}
        {memberLevel !== 1 && (
          <div className="add-icon" onClick={() => navigate("/cs/pq/frm")}>
            <AddBoxIcon />
          </div>
        )}
      </div>

      <div className="input-wrap">
        <div className="select-wrap">
          <div className="list-count">전체 : {totalCount}건</div>
          <div
            className="select-box"
            style={{ display: "flex", alignItems: "center", gap: "4px" }}
          >
            <Box size="small" sx={{ minWidth: 100 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">문의 유형</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={category}
                  label="문의 유형"
                  onChange={handleCategoryChange}
                  sx={{
                    height: 32,
                    fontSize: "16px",
                    ".MuiSelect-select": {
                      paddingTop: "4px",
                      paddingBottom: "4px",
                      textAlign: "center",
                    },
                  }}
                >
                  <MenuItem value={0}>전체</MenuItem>
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
        <div className="input-wrap2">
          <input
            type="text"
            id="pqTitle"
            name="pqTitle"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            placeholder="검색어를 입력하십시오"
          ></input>
          <button type="submit" onClick={searchInput}>
            입력
          </button>
        </div>
      </div>
      <div className="list-wrap">
        <table className="tbl">
          <thead>
            <tr>
              <th style={{ width: "15%" }}>번호</th>
              <th style={{ width: "20%" }}>아이디</th>
              <th style={{ width: "40%" }}>제목</th>
              <th style={{ width: "25%" }}>등록일</th>
            </tr>
          </thead>
          <tbody>
            {pqList.map((pq, index) => {
              return (
                <tr
                  key={"pq-" + index}
                  onClick={() => navigate(`/cs/pq/detail/${pq.pqNo}`)}
                >
                  <td>{pq.pqNo}</td>
                  <td>{pq.memberId}</td>
                  <td>{pq.pqTitle}</td>
                  <td>{pq.pqDate}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="page-navi">
        {pi && (
          <PageNavigation pi={pi} reqPage={reqPage} setReqPage={setReqPage} />
        )}
      </div>
    </section>
  );
};

export default PQList;
