import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PageNavigation from "../utils/PageNavigation";
import AddBoxIcon from "@mui/icons-material/AddBox";

const NoticeList = () => {
  const [noticeList, setNoticeList] = useState([]);
  const [reqPage, setReqPage] = useState(1);
  const [pi, setPi] = useState(null);
  const [totalCount, setTotalCount] = useState(0);
  const [search, setSearch] = useState("");
  const noticeFunc = () => {
    axios
      .get(
        `${
          import.meta.env.VITE_BACK_SERVER
        }/cs/notice?reqPage=${reqPage}&noticeTitle=${search}`
      )
      .then((res) => {
        console.log(res);
        setNoticeList(res.data.noticeList);
        setPi(res.data.pi);
        setTotalCount(res.data.totalCount);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    noticeFunc(reqPage);
  }, [reqPage]);
  const searchInput = () => {
    setReqPage(1);
    noticeFunc(1, search);
  };
  const navigate = useNavigate();

  return (
    <section className="section notice-list-wrap">
      <div className="title-wrap">
        <div className="title">공지사항</div>
        <div className="add-icon" onClick={() => navigate("/cs/notice/frm")}>
          <AddBoxIcon />
        </div>
      </div>
      <div className="input-wrap">
        <div className="list-count">전체 : {totalCount}건</div>
        <input
          type="text"
          id="noticeTitle"
          name="noticeTitle"
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
              <th style={{ width: "20%" }}>번호</th>
              <th style={{ width: "50%" }}>제목</th>
              <th style={{ width: "30%" }}>등록일</th>
            </tr>
          </thead>
          <tbody>
            {noticeList.map((notice, index) => {
              return (
                <tr
                  key={"notice-" + index}
                  onClick={() =>
                    navigate(`/cs/notice/detail/${notice.noticeNo}`)
                  }
                >
                  <td>{notice.noticeNo}</td>
                  <td>{notice.noticeTitle}</td>
                  <td>{notice.noticeDate}</td>
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

export default NoticeList;
