import axios from "axios";
import { useState } from "react";

const AdminReportMember = () =>{   
    //신고된 회원 목록을 따로 빼야되나? 회원 목록 말고?
    const [member, setMemberReport] = useState([]);
    const [reqPage, setReqPage] = useState(1);
    const [pi, setPi] = useState(null);

    useState(()=>{
        axios
        .get(
            
        )
    })
    return(
        <div className="admin-title">신고된 관리</div>
    )

};

export default AdminReportMember;