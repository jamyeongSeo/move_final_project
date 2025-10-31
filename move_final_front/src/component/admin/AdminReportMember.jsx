import axios from "axios";
import { useState } from "react";

const AdminReportMember = () => {   
    const [reportMember, setReportMember] = useState([]); //신고 당한 회원 뽑아오는 목록 담기(회원 아이디, 신고 당한 댓글 내용)
    // const [commentList, setCommentList] = useState([]); 
    // const [suspend, setSuspend] = useState([]); //정지관련
    const [reqPage, setReqPage] = useState(1); 
    const [pi, setPi] = useState(null);

    //백에서 신고 회원 목록 가져오기
    useState(()=>{
        axios
        .get(`${import.meta.env.VITE_BACK_SERVER}/admin/reportMember`)
        .then((res)=>{
            setReportMember(reportMember)
        })
        .catch((err)=>{
            console.log("신고 회원 목록 불러오기 실패:", err);
        })
    })


    {/* 1.정지일수 (셀렉트 버튼으로) 주고 어떤 사유로 정지 됐는지는 인풋박스로 텍스트 입력
        2.신고된 댓글 내용은 클릭 시 모달창 띄워서 전체 내용 띄우기
        3.정지 쪽 const생성
        */}
    
    return(
        <div className="admin-main-wrap">
            <section className="admin-header">
                <div className="admin-page-title">신고된 회원</div>
            </section>

            <div className="admin-content-box scrollable">
                <table className="admin-content-tbl">
                    <thead>
                        <tr>
                            <th style={{width:"20%"}}>아이디</th>
                            <th style={{width:"30%"}}>신고된 댓글 내용</th>
                            <th style={{width:"10%"}}>정지일수</th>
                            <th style={{width:"60%"}}>정지사유</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reportMember.length > 0 ? (
                            reportMember.map((member, index)=>{
                                <tr key={"member-" + index}>
                                    <td>{member.memberId}</td>
                                    <td>{movieCommentNo}</td>
                                    <td>{suspendDays}</td>
                                    {selectSuspend === "3일" && (
                                    <td>
                                        <span className={`status-badge status-${suspend.suspendDays}`}
                                        >
                                            {{
                                                1: "5일",
                                                2: "7일",
                                                3: "14일",
                                            }[suspend.suspendDays] || "-"}
                                        </span>
                                    </td>
                                    )}
                                </tr>
                            })
                        ) : (
                            <tr>
                                <td colSpan="4" style={{ textAlign : "center", padding: "20px"}}>
                                    회원 정보가 없습니다.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
};

export default AdminReportMember;