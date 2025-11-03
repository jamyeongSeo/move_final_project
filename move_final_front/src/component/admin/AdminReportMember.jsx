import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import "./adminMember";

const AdminReportMember = () => {
  const [reportMember, setReportMember] = useState([]);
  const [suspendDays, setSuspendDays] = useState({});
  const [suspendReason, setSuspendReason] = useState({});

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACK_SERVER}/admin/reportMember`)
      .then((res) => {
        console.log(res);
        setReportMember(res.data);
      })
      .catch((err) => {
        console.log("신고 회원 목록 불러오기 실패:", err);
        setReportMember([]);
      });
  }, []);

  const insertSuspend = (MEMBER_NO_KEY) => {
    const days = suspendDays[MEMBER_NO_KEY];
    const reason = suspendReason[MEMBER_NO_KEY];

    if (!days || !reason) {
      Swal.fire({
        title: "입력 누락",
        text: "정지일수와 사유를 모두 선택해주세요.",
        icon: "warning",
      });
      return;
    }

    axios
      .post(`${import.meta.env.VITE_BACK_SERVER}/admin/memberSuspend`, {
        MEMBER_NO: MEMBER_NO_KEY,
        suspendDays: days,
        suspendReason: reason,
      })
      .then(() => {
        Swal.fire({
          title: "정지 처리 완료",
          text: `${days}일 정지 처리되었습니다.`,
          icon: "success",
        });
      })
      .catch((err) => {
        console.log("정지 등록 실패:", err);
        Swal.fire("정지 등록 실패");
      });
  };

  const dayOptions = [3, 5, 7, 14];
  const reasonOptions = [
    "부적절한 단어 사용",
    "지나친 비방글",
    "스팸/광고성 댓글",
    "기타",
  ];

  return (
    <div className="admin-main-wrap">
      <section className="admin-header">
        <div className="admin-page-title">신고된 회원</div>
      </section>

      <div className="admin-content-box scrollable">
        <table className="admin-content-tbl">
          <thead>
            <tr>
              <th>아이디</th>
              <th>신고된 댓글 내용</th>
              <th>정지일수</th>
              <th>정지사유</th>
              <th>처리</th>
            </tr>
          </thead>
          <tbody>
            {reportMember.length > 0 ? (
              reportMember.map((member, index) => (
                <tr key={`member-${index}`}>
                  {/* 아이디 */}
                  <td>{member.MEMBER_ID || "아이디 없음"}</td>

                  {/* 신고된 댓글 내용 미리보기 + 클릭 시 모달 */}
                  <td
                    className="comment-cell"
                    onClick={() =>
                      Swal.fire({
                        title: "신고된 댓글",
                        text: member.REPORTED_COMMENT || "내용 없음",
                        icon: "info",
                      })
                    }
                  >
                    <div className="comment-preview">
                      {member.REPORTED_COMMENT || "내용 없음"}
                    </div>
                  </td>

                  {/* 정지일수 */}
                  <td>
                    <select
                      value={suspendDays[member.MEMBER_ID] || ""}
                      onChange={(e) =>
                        setSuspendDays({
                          ...suspendDays,
                          [member.MEMBER_ID]: e.target.value,
                        })
                      }
                    >
                      <option value="">선택</option>
                      {dayOptions.map((d) => (
                        <option key={d} value={d}>
                          {d}일
                        </option>
                      ))}
                    </select>
                  </td>

                  {/* 정지사유 */}
                  <td>
                    <select
                      value={suspendReason[member.MEMBER_ID] || ""}
                      onChange={(e) =>
                        setSuspendReason({
                          ...suspendReason,
                          [member.MEMBER_ID]: e.target.value,
                        })
                      }
                    >
                      <option value="">선택</option>
                      {reasonOptions.map((r, i) => (
                        <option key={i} value={r}>
                          {r}
                        </option>
                      ))}
                    </select>
                  </td>

                  {/* 등록 버튼 */}
                  <td>
                    <button
                      className="suspend-btn"
                      onClick={() => insertSuspend(member.MEMBER_ID)}
                    >
                      정지 등록
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  style={{ textAlign: "center", padding: "20px" }}
                >
                  신고된 회원이 없습니다.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminReportMember;