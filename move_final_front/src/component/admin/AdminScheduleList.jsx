import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
// import "./admin.css";
import "./adminSchedule.css";

const AdminScheduleList = () => {
  const navigate = useNavigate();
  const [showScreenNo, setShowScreenNo] = useState(false); // 스크린 넘버
  const [screenFilter, setScreenFilter] = useState("1");  //스크린 필터
  const [scheduleList, setScheduleList] = useState([]); // 스케줄 목록
  const [startDate, setStartDate] = useState(new Date().toISOString().split("T")[0]); // 날짜 받아오기
  

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACK_SERVER}/admin/schedule`)
      .then((res) => {
        let list = res.data;
          list = list.filter((schedule) => String(schedule.screenNo) === screenFilter);
        setScheduleList(list);
      })
      .catch((err) => console.error("스케줄 불러오기 실패:", err));
  }, [screenFilter]);

  const days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(startDate);
    d.setDate(d.getDate() + i);
    return d.toISOString().split("T")[0];
  });

  const hours = Array.from({ length: 20 }, (_, i) => 7 + i);

  const findSchedule = (date, hour) => {
    return scheduleList.find((s) => {
      const startHour = parseInt(s.scheduleTimeStart.split(":")[0]);
      return s.scheduleOpen === date && startHour === hour;
    });
  };


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

      await axios.delete(`${import.meta.env.VITE_BACK_SERVER}/admin/schedule/${scheduleNo}`);

      setScheduleList((prev) => prev.filter((s) => s.scheduleNo !== scheduleNo));

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

  const handleCellClick = (schedule) => {
    if (!schedule) return;
    Swal.fire({
      title: `${schedule.movieTitle}`,
      html: `<b>${schedule.scheduleOpen}</b><br/>
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
      <h2>스케줄 타임테이블</h2>
      <div className="admin-schedule-list-header">
        <div className="admin-schedule-filter-screen">
          관 선택 
          <button
            className="filter-toggle-btn"
            onClick={() => setShowScreenNo(!showScreenNo)} // 스크린 번호 화면에 띄우는 용
          >
            ▼
          </button>
          {showScreenNo && (
            <div className="filter-menu">
              {[
                { label: "1관", value: "1" },
                { label: "2관", value: "2" },
                { label: "3관", value: "3" },
              ].map((btn) => (
                <button
                  key={btn.value}
                  className={`filter-option ${
                    screenFilter === btn.value ? "active" : ""
                  }`}
                  onClick={() => {
                    setShowScreenNo(false);
                    setScreenFilter(btn.value);
                  }}
                >
                  {btn.label}
                </button>
              ))}
            </div>
          )}
        </div>
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
                  const scheduleList = findSchedule(d, hour);
                  return (
                    <td
                      key={d}
                      className={scheduleList ? "occupied" : "available"}
                      onClick={() => handleCellClick(schedule)}
                    >
                      {scheduleList ? `${scheduleList.movieTitle}` : ""}
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
