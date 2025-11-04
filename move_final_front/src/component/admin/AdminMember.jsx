import axios from "axios";
import { useEffect, useState } from "react";
import "./adminMember.css";
import { Link, useNavigate } from "react-router-dom";
import AdminReportMember from "./AdminReportMember";

const AdminMember = () => {
  const [memberList, setMemberList] = useState([]);
  const [search, setSearch] = useState("");
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    let url = `${import.meta.env.VITE_BACK_SERVER}/admin/member`;
    if (search.trim() !== "") {
      url += `?memberId=${search}`;
    }

    axios
      .get(url)
      .then((res) => {
        setMemberList(res.data.memberList || []);
        setTotalCount(res.data.totalCount || 0);
      })
      // .catch(err);
  }, [search]);

  const navigate = useNavigate();
  const reportClick = () =>{
    navigate("/admin/main/report-member");
  };
  
  return (
    <div className="admin-member-wrap">
      {/* 타이틀 */}
      <div className="admin-page-title">회원 관리</div>

      {/* 신고관리 + total + 검색창 */}
      <div className="admin-member-topbar">

          <button className="admin-report-btn"
          onClick={reportClick}>신고 관리</button>

        <div className="admin-total">
          total: <span>{totalCount}</span>명
        </div>

        <div className="admin-search-item">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="회원 아이디 검색"
          />
        </div>
      </div>

      {/* 스크롤 가능한 테이블 */}
      <div className="admin-content-box scrollable">
        <table className="admin-content-tbl">
          <thead>
            <tr>
              <th style={{ width: "20%" }}>아이디</th>
              <th style={{ width: "20%" }}>이름</th>
              <th style={{ width: "30%" }}>휴대폰 번호</th>
              <th style={{ width: "30%" }}>이메일</th>
            </tr>
          </thead>
          <tbody>
            {memberList.length > 0 ? (
              memberList.map((member, index) => (
                <tr key={"member-" + index}>
                  <td>{member.memberId}</td>
                  <td>{member.memberName}</td>
                  <td>{member.memberPhone}</td>
                  <td>{member.memberEmail}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" style={{ textAlign: "center", padding: "20px" }}>
                  회원 정보가 없습니다.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminMember;
