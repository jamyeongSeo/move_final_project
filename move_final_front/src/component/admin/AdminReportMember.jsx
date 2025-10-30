import axios from "axios";
import { useState } from "react";

const AdminReportMember = () =>{   
    const [memberList, setMemberList] = useState([]);
    const [reqPage, setReqPage] = useState(1);
    //const [stopDays, setStopDays] = useState("1");

    useState(()=>{
        axios
        .get(`${import.meta.env.VITE_BACK_SERVER}/admin/member`)
        .then((res)=>{
            setMemberList(res.data.memberList);
        })
    })

    // const reportDays = (memberId) => {
    //     return memberList.find((m)=>{
    //         const 
    //     })
    // }
    // return(
    //     <div className="admin-title">신고된 관리</div>
    // )
};

export default AdminReportMember;