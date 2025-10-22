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

const PQList = () => {
  const [pqList, setPqList] = useState([]); //1:1문의 리스트를 저장하는 state
  const [reqPage, setReqPage] = useState(1); //현재 페이지 값을 저장하는 state
  const [pi, setPi] = useState(null); //현재 페이지가 갖고있는 데이터 값을 저장하는 state
  const [totalCount, setTotalCount] = useState(0); //전체 게시물 수를 저장하는 state
  const [search, setSearch] = useState(""); //검색 결과를 저장하는 state
  const [authReady, setAuthReady] = useRecoilState(authReadyState); //refresh 초기회 확인용 데이터를 저장하는 recoil
  const [memberLevel, setMemberLevel] = useRecoilState(memberLevelState); //해당 recoil 계정의 memberLevel값을 갖고있는 state
  const [loginId, setLoginId] = useRecoilState(loginIdState);
  const navigate = useNavigate();
  const pqFunc = () => {
    axios
      .get(
        `${
          import.meta.env.VITE_BACK_SERVER
        }/cs/pq?reqPage=${reqPage}&pqTitle=${search}&memberId=${loginId}&memberLevel=${memberLevel}`
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
  }, [reqPage, authReady]);

  const searchInput = () => {
    setReqPage(1);
    pqFunc();
  };

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
        <div className="list-count">전체 : {totalCount}건</div>
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
