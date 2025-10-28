//회원관리

import axios from "axios";
import { useState } from "react";
import AdminReportMember from "./AdminReportMember";
import PageNavigation from "../utils/PageNavigation";

const AdminMember = () =>{
    const [memberList, setMemberList] = useState([]);
    const [reqPage, setReqPage] = useState(1);
    const [pi, setPi] = useState(null);

    useState(()=>{
        axios
        .get(`${import.meta.env.VITE_BACK_SERVER}/admin/member?reqPage=${reqPage}`)
        .then((res) =>{
            console.log(res);
            setMemberList(res.data.memberList);
            setPi(res.data.pi);
        })
        .catch((err)=>{
            console.log(err);
        })
    },[reqPage]);
    return (
        <div>
            <div className="admin-page-title">회원 관리</div>
                <div className="admin-member-report-btn">
                    <button type="button" className="admin-report-btn" onClick={<AdminReportMember />}>
                    신고관리
                    </button>
                </div>
                <table className="admin-member-tbl">
                    <thead>
                        <tr>
                            <th style={{width:"20%"}}>아이디</th>
                            <th style={{width:"20%"}}>이름</th>
                            <th style={{width:"30$"}}>전화번호</th>
                            <th style={{width:"30%"}}>등급</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr key={"member-" + index}>
                            <td>{member.memberId}</td>
                            <td>{member.memberName}</td>
                            <td>{member.memberPhone}</td>
                            <td>{member.memberGrade}</td>
                        </tr>
                    </tbody>
                </table>
                <div className="admin-page-wrap" style={{marginTop:"50px"}}>
                    {pi && (
                        <PageNavigation pi = {pi} reqPage={reqPage} setReqPage={setReqPage}/>
                    )}
            </div>
        </div>
    )
}
export default AdminMember;