import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AdminScheduleRegistFrm from "./AdminSheduleRegistFrm";

const AdminScheduleEdit = (props) => {
    const navigate = useNavigate();
    const params = useParams();
    const scheduleNo = params.scheduleNo;
    const [scheduleList, setScheduleList] = useState([]);
    //스케줄 번호로 스케줄 상세 정보 불러오기
    useEffect(()=>{
        axios
        .get(`${import.meta.env.VITE_BACK_SERVER}/schedule/${scheduleNo}`)
        .then((res)=>{
            console.log("상영 스케줄 목록:", res.data);
            setScheduleList(res.data.scheduleList);
        })
        .catch((err)=>{
            console.log(err)
        })
    },[])
    //수정 값 받기
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [scheduleOpen, setScheduleOpen] = useState("");
    const [scheduleClose, setScheduleClose] = useState("");
    const [scheduleTimeStart, setScheduleTimeStart] = useState("");
    const [scheduleTimeEnd, setScheduleTimeEnd] = useState("");
    const [screenNo, setScreenNo] = useState("");
    const editSchedule = () => {
    const eForm = new FormData();
    eForm.append("scheduleNo", scheduleNo);
    eForm.append("scheduleOpen", scheduleOpen);
    eForm.append("scheduleClose", scheduleClose);
    eForm.append("scheduleTimeStart", scheduleTimeStart);
    eForm.append("scheduleTimeEnd", scheduleTimeEnd);
    eForm.append("screenNo", screenNo);

    axios
    .patch(`${import.meta.env.VITE_BACK_SERVER}/schedule`, eForm)
    .then((res)=>{
        console.log("수정한 스케줄 내용:"+res)
        navigate(`/schedule/list/${scheduleNo}`)
    })
    .catch((err)=>{
        confirm.length(err);
    });
}
    return (
     <div className="admin-schedule-regist-title">스케줄 수정</div>
    //   <AdminScheduleRegistFrm 
    //         movieList={movieList}
    //         selectedMovie={selectedMovie}
    //         setSelectedMovie={setSelectedMovie}
    //         scheduleOpen={scheduleOpen}
    //         setScheduleOpen={setScheduleOpen}
    //         scheduleClose={scheduleClose}
    //         setScheduleClose={setScheduleClose}
    //         scheduleTimeStart={scheduleTimeStart}
    //         setScheduleTimeStart={setScheduleTimeStart}
    //         scheduleTimeEnd={scheduleTimeEnd}
    //         setScheduleTimeEnd={setScheduleTimeEnd}
    //         screenNo={screenNo}
    //         setScreenNo={setScreenNo}
    //  />
    // <div className="admin-btn-wrap">
    //     <button type="button" className="btn-red" onClick={editSchedule}
    // </div>
    )
};

export default AdminScheduleEdit;
