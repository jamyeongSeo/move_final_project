import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

// import "./adminMember"; // ⚠️ [오류 수정]: 해당 파일을 찾을 수 없어 import 구문을 제거했습니다.

const AdminReportMember = () => {
  const [reportMember, setReportMember] = useState([]);
  const [suspendDays, setSuspendDays] = useState({});
  const [suspendReason, setSuspendReason] = useState({});

  useEffect(() => {
    // ⚠️ [경고]: import.meta.env 사용 시 컴파일 환경에 따라 경고가 발생할 수 있습니다.
    axios
      .get(`${import.meta.env.VITE_BACK_SERVER}/admin/reportMember`)
      .then((res) => {
        console.log("신고 회원 목록:", res.data);
        setReportMember(res.data || []); // null 또는 undefined일 경우 빈 배열 사용
      })
      .catch((err) => {
        console.error("신고 회원 목록 불러오기 실패:", err);
        setReportMember([]);
      });
  }, []);

  // MEMBER_ID_KEY를 사용하여 상태를 조회하고 API를 호출
  const insertSuspend = (memberIdKey) => {
    // memberIdKey는 member.MEMBER_ID (문자열 ID)를 사용함.
    const days = suspendDays[memberIdKey];
    const reason = suspendReason[memberIdKey];

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
        memberId: memberIdKey, // 백엔드에서 식별할 ID (MEMBER_ID)
        suspendDays: days,
        suspendReason: reason,
      })
      .then(() => {
        Swal.fire({
          title: "정지 처리 완료",
          text: `${days}일 정지 처리되었습니다.`,
          icon: "success",
        });
        
        // 정지 처리 후 해당 회원을 목록에서 제거하여 UI 갱신
        setReportMember(prevMembers => 
            prevMembers.filter(member => member.MEMBER_ID !== memberIdKey)
        );

        // 선택했던 정지 일수/사유 상태 초기화
        setSuspendDays(prev => {
            const newDays = { ...prev };
            delete newDays[memberIdKey];
            return newDays;
        });
        setSuspendReason(prev => {
            const newReasons = { ...prev };
            delete newReasons[memberIdKey];
            return newReasons;
        });

      })
      .catch((err) => {
        console.error("정지 등록 실패:", err);
        Swal.fire({
            title: "정지 등록 실패",
            text: "서버 요청 중 오류가 발생했습니다. 자세한 내용은 콘솔을 확인하세요.",
            icon: "error"
        });
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
                          // MEMBER_ID를 키로 사용
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
                      // MEMBER_ID를 키로 사용
                      value={suspendReason[member.MEMBER_ID] || ""}
                      onChange={(e) =>
                        setSuspendReason({
                          ...suspendReason,
                          // MEMBER_ID를 키로 사용
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
                      // MEMBER_ID를 insertSuspend 함수로 넘겨서 사용
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
