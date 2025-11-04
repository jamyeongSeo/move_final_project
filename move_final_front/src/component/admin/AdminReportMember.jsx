import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useSetRecoilState } from "recoil";
import { suspendDaysState } from "../utils/RecoilData";

const AdminReportMember = () => {
  const [reportMember, setReportMember] = useState([]);
  const [suspendDays, setSuspendDays] = useState({});
  const [suspendReason, setSuspendReason] = useState({});

  //Recoil 상태 업데이트 (정지일수/사유 등록 시 프론트에도 반영)
  const setRecoilSuspendDays = useSetRecoilState(suspendDaysState);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACK_SERVER}/admin/reportMember`)
      .then((res) => {
        setReportMember(res.data || []);
      })
      .catch((err) => {
        setReportMember([]);
      });
  }, []);

  const insertSuspend = async (MEMBER_NO_KEY) => {
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

    try {
      const res = await axios.post(`${import.meta.env.VITE_BACK_SERVER}/admin/memberSuspend`, {
        MEMBER_NO: Number(MEMBER_NO_KEY),
        suspendDays: Number(days),
        suspendReason: reason,
      });

      if (res.data === 0) {
        Swal.fire({
          title: "이미 정지된 회원",
          text: "해당 회원은 현재 정지 상태입니다.",
          icon: "info",
        });
        return;
      }

      //SweetAlert 표시 + 전역 상태 업데이트
      Swal.fire({
        title: "정지 처리 완료",
        html: `
          <p><b>${days}일</b> 정지 처리되었습니다.</p>
          <p>사유: ${reason}</p>
        `,
        icon: "success",
      }).then(() => {
        //1) 목록에서 제거
        setReportMember((prevList) =>
          prevList.filter((member) => member.MEMBER_NO !== MEMBER_NO_KEY)
        );

        //2) 전역 Recoil 상태도 갱신 (로그인된 사용자와 동일한 회원이면 프론트에서도 막힘)
        setRecoilSuspendDays({
          SUSPENDED_DAYS: days,
          SUSPENDED_AT: new Date().toISOString().split("T")[0],
          SUSPENDED_UNTIL: new Date(Date.now() + days * 24 * 60 * 60 * 1000)
            .toISOString()
            .split("T")[0],
          REASON: reason,
        });
      });
    } catch (err) {
      Swal.fire({
        title: "정지 등록 실패",
        text: "서버 오류 또는 중복된 정지 요청입니다.",
        icon: "error",
      });
    }
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

                  {/* 신고된 댓글 내용 미리보기 */}
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
                      value={suspendDays[member.MEMBER_NO] || ""}
                      onChange={(e) =>
                        setSuspendDays({
                          ...suspendDays,
                          [member.MEMBER_NO]: e.target.value,
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
                      value={suspendReason[member.MEMBER_NO] || ""}
                      onChange={(e) =>
                        setSuspendReason({
                          ...suspendReason,
                          [member.MEMBER_NO]: e.target.value,
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
                      onClick={() => insertSuspend(member.MEMBER_NO)}
                    >
                      정지 등록
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" style={{ textAlign: "center", padding: "20px" }}>
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
