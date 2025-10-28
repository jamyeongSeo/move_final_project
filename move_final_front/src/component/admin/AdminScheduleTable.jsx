import { useEffect, useState } from "react";
import axios from "axios";
import "./admin.css";

const AdminScheduleTable = ({ startDate }) => {
  const [schedules, setSchedules] = useState([]);

useEffect(() => {
  console.log("startDate:", startDate);
  axios
    .get("http://localhost:9999/admin/schedule/week", { params: { startDate } })
    .then((res) => setSchedules(res.data))
    .catch((err) => console.error("주간 스케줄 조회 실패:", err));
}, [startDate]);

  const days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(startDate);
    d.setDate(d.getDate() + i);
    return d.toISOString().split("T")[0];
  });

  const hours = Array.from({ length: 14 }, (_, i) => 9 + i); // 7시~24시

  const findMovie = (date, hour) => {
    return schedules.find((s) => {
      const startHour = parseInt(s.scheduleTimeStart.split(":")[0]);
      return s.scheduleOpen === date && startHour === hour;
    });
  };

  return (
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
              const movie = findMovie(d, hour);
              return (
                <td
                  key={d}
                  className={movie ? "occupied" : "available"}
                  onClick={() => {
                    if (!movie) alert(`${d} ${hour}:00 스케줄 등록`);
                  }}
                >
                  {movie ? `${movie.movieTitle}` : ""}
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default AdminScheduleTable;
