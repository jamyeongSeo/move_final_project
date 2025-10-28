import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import "./admin.css";

//new Date.toISOString() = 날짜와 시간을 맞춰줌
//split('T')[0] : toISOString은 날짜와 시간을 T로 구분하므로
//(2024-12-27T14:30:00.000Z), split('T')[0]을 사용하여 날짜 부분만 추출하는 방식
const AdminScheduleList = () => {
  const navigate = useNavigate();
  const [scheduleList, setScheduleList] = useState([]);
  const [startDate, setStartDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  //  주간 스케줄 불러오기
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACK_SERVER}/admin/schedule/week`, {
        params: { startDate },
      })
      .then((res) => {
        console.log("주간 스케줄:", res.data);
        setScheduleList(res.data);
      })
      .catch((err) => console.error("스케줄 불러오기 실패:", err));
  }, [startDate]);

  const days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(startDate);
    d.setDate(d.getDate() + i);
    return d.toISOString().split("T")[0];
  });

  const hours = Array.from({ length: 18 }, (_, i) => 7 + i);

  // 해당 날짜/시간에 스케줄이 있는지 찾기
  const findSchedule = (date, hour) => {
    return scheduleList.find((s) => {
      const startHour = parseInt(s.scheduleTimeStart.split(":")[0]);
      return s.scheduleOpen === date && startHour === hour;
    });
  };

  // 삭제 함수
  const deleteSchedule = async (scheduleNo) => {
    try {
      const result = await Swal.fire({
        title: "삭제하시겠습니까?",
        text: "삭제된 스케줄은 복구할 수 없습니다.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "삭제",
        cancelButtonText: "취소",
        confirmButtonColor: "#c0392b",
      });

      if (!result.isConfirmed) return;

      await axios.delete(
        `${import.meta.env.VITE_BACK_SERVER}/admin/schedule/${scheduleNo}`
      );

      setScheduleList((prev) =>
        prev.filter((s) => s.scheduleNo !== scheduleNo)
      );

      Swal.fire({
        icon: "success",
        title: "삭제 완료",
        text: "스케줄이 성공적으로 삭제되었습니다.",
        confirmButtonColor: "#c0392b",
      });
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "삭제 실패",
        text: "서버 오류가 발생했습니다.",
        confirmButtonColor: "#c0392b",
      });
    }
  };

  //  수정 / 삭제 팝업
  const handleCellClick = (schedule) => {
    if (!schedule) return;

    Swal.fire({
      title: `${schedule.movieTitle}`,
      html: `
        <b>${schedule.scheduleOpen}</b><br/>
        ${schedule.scheduleTimeStart} ~ ${schedule.scheduleTimeEnd}<br/>
        ${schedule.screenNo}관`,
      showCancelButton: true,
      confirmButtonText: "수정",
      cancelButtonText: "삭제",
      confirmButtonColor: "#1e40af",
      cancelButtonColor: "#c0392b",
    }).then((result) => {
      if (result.isConfirmed) {
        navigate(`/admin/main/schedule/edit/${schedule.scheduleNo}`);
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        deleteSchedule(schedule.scheduleNo);
      }
    });
  };

  return (
    <div className="admin-schedule-list-wrap">
      <div className="admin-schedule-list-header">
        <h2>스케줄 타임테이블</h2>
        <div className="date-picker">
          <label>시작일 선택: </label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
      </div>

      <div className="admin-schedule-timetable-container">
        <table className="admin-schedule-table">
          <thead>
            <tr>
              <th>시간</th>
              {days.map((d) => (
                <th key={d}>{d}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {hours.map((hour) => (
              <tr key={hour}>
                <td>{hour}:00</td>
                {days.map((d) => {
                  const schedule = findSchedule(d, hour);
                  return (
                    <td
                      key={d}
                      className={schedule ? "occupied" : "available"}
                      onClick={() => handleCellClick(schedule)}
                    >
                      {schedule ? `${schedule.movieTitle}` : ""}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminScheduleList;
