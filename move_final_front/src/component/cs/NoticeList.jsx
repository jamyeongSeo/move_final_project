import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const NoticeList = () => {
  const [noticeList, setNoticeList] = useState([]);
  const [reqPage, setReqPage] = useState(1);
  const [pi, setPi] = useState(null);
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACK_SERVER}/cs?reqPage=${reqPage}`)
      .then((res) => {
        console.log(res);
        setNoticeList(res.data.noticeList);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [reqPage]);
  return (
    <section className="section notice-list">
      <div className="notice-title">공지사항</div>
      <div className="input-wrap">
        <div className="list-count">전체 : 100건</div>
        <input
          type="text"
          id="noticeContent"
          name="noticeContent"
          value={noticeList.noticeContent}
          placeholder="검색어를 입력하십시오"
        ></input>
      </div>
      <div className="notice-list-wrap">
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
                <tr key={"notice-" + index}>
                  <td>{notice.noticeNo}</td>
                  <td>{notice.noticeTitle}</td>
                  <td>{notice.noticeDate}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
};

const NoticeItem = (props) => {
  const notice = props.notice;
  const navigate = useNavigate();
  return;
};

export default NoticeList;
