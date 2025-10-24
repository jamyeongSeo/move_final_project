    import { useEffect, useState } from "react";
    import axios from "axios";
    import Swal from "sweetalert2";
    import "./admin.css";
import { useNavigate } from "react-router-dom";

    const AdminScheduleList = () => {
    const [scheduleList, setScheduleList] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        axios
        .get(`${import.meta.env.VITE_BACK_SERVER}/admin/schedule`)
        .then((res) => setScheduleList(res.data))
        .catch((err) => console.error(err));
    }, []);

    const deleteSchedule = (scheduleNo) => {
        Swal.fire({
        title: "삭제하시겠습니까?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "삭제",
        cancelButtonText: "취소",
        }).then((result) => {
        if (result.isConfirmed) {
            axios
            .delete(`${import.meta.env.VITE_BACK_SERVER}/admin/schedule/${scheduleNo}`)
            .then(() => {
                setScheduleList((s) =>
                s.filter((schedule) => schedule.scheduleNo !== scheduleNo)
                );
                Swal.fire("삭제 완료", "스케줄이 삭제되었습니다.", "success");
            })
            .catch((err) => {
                console.error(err);
                Swal.fire("삭제 실패", "서버 오류가 발생했습니다.", "error");
            });
        }
        });
    };

    return (
        <div className="admin-schedule-list-wrap">
            <section className="admin-schedule-list-header">
            <div className="admin-schedule-list-title">스케줄 목록</div>
            
            <div className="admin-schedule-content-box">
            <table className="admin-schedule-list-tbl">
                <thead>
                    <tr>
                        <th style={{width:"5%"}}>No</th>
                        <th style={{width:"15%"}}>영화 제목</th>
                        <th style={{width:"5%"}}>상영관</th>
                        <th style={{width:"15%"}}>시작 시간</th>
                        <th style={{width:"15%"}}>종료 시간</th>
                        <th style={{width:"15%"}}>시작일</th>
                        <th style={{width:"15%"}}>종료일</th>
                        <th style={{width:"10%"}}>관리</th>
                    </tr>
                </thead>
            
                <tbody>
                {scheduleList.map((s) => (
                    <tr key={s.scheduleNo}>
                    <td style={{width:"5%"}}>{s.scheduleNo}</td>
                    <td style={{width:"15%"}}>{s.movieTitle}</td>
                    <td style={{width:"5%"}}>{s.screenNo}</td>
                    <td style={{width:"15%"}}>{s.scheduleTimeStart}</td>
                    <td style={{width:"15%"}}>{s.scheduleTimeEnd}</td>
                    <td style={{width:"15%"}}>{s.scheduleOpen}</td>
                    <td style={{width:"20%"}}>{s.scheduleClose}</td>
                    <td>
                        <button
                        onClick={() =>
                            navigate(`/admin/main/schedule/edit/${s.scheduleNo}`)
                        }
                        className="btn-edit"
                        >
                        수정 / 
                        </button>
                        <button
                        onClick={() => deleteSchedule(s.scheduleNo)}
                        className="btn-delete"
                        >
                        삭제
                        </button>
                    </td>
                    </tr>
                ))}
                </tbody>
                
            </table>
            </div>
            </section>
            </div>
    );
    };

    export default AdminScheduleList;
