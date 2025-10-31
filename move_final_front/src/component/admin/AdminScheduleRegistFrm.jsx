import { useState } from "react";
import Swal from "sweetalert2";

const AdminScheduleRegistFrm = ({
  movieList = [],
  selectedMovie,
  handleMovieSelect,
  scheduleOpen,
  handleOpenChange,
  scheduleClose,
  screenNo,
  setScreenNo,
  startHour,
  setStartHour,
  startMinute,
  setStartMinute,
  startAmPm,
  setStartAmPm,
  endHour,
  endMinute,
  endAmPm,
  occupiedTimes = [],
}) => {
  const hourOptions = Array.from({ length: 12 }, (_, i) => i + 1);
  const minuteOptions = Array.from({ length: 12 }, (_, i) =>
    (i * 5).toString().padStart(2, "0")
  );

  const list = Array.isArray(movieList) ? movieList : [];

  /*문자열 > 분 단위 변환 */
  const toMinutes = (time) => {
    if (!time || typeof time !== "string" || !time.includes(":")) return null;
    const [h, m] = time.split(":").map(Number);
    return h * 60 + m;
  };

  /* 이미 등록된 시간대인지 체크 */
  const isTimeOccupied = (hour, minute, ampm) => {
    if (!occupiedTimes || occupiedTimes.length === 0) return false;
    const totalMins =
      (Number(hour) % 12) * 60 + Number(minute) + (ampm === "PM" ? 720 : 0);
    return occupiedTimes.some((t) => {
      const start = toMinutes(t.startTime);
      const end = toMinutes(t.endTime);
      if (start === null || end === null) return false;
      return totalMins >= start && totalMins < end;
    });
  };

  /*분 선택용 state */
  const [minuteOpen, setMinuteOpen] = useState(false);

  const handleMinuteSelect = (val) => {
    setStartMinute(val);
    setMinuteOpen(false);
  };


  // const selectScreen = () =>{
  //   if(movieType === "1"){
  //     allowType === "1"
  //   }else if (movieType === "2"){
  //     allowType === "2"
  //   }else if (movieType === "3"){
  //     allwType === "3"
  //   }else if (
  //     Swal.fire({
  //       title:"올바른 관 선택",
  //       text:"올바른 관을 선택해주세요.",
  //       icon:"info",
  //     })
  //   )
  // }
  return (
    <div className="admin-schedule-regist-frm">
      {/* 영화 선택 */}
      <div className="admin-schedule-input">
        <label> 영화 선택</label>
        <select
          value={selectedMovie ? selectedMovie.movieNo : ""}
          onChange={(e) => handleMovieSelect(Number(e.target.value))}
        >
          <option value="">상영 중인 영화를 선택하세요</option>
          {list.length > 0 ? (
            list.map((m) => (
              <option key={m.movieNo} value={m.movieNo}>
                {m.movieTitle} ({m.movieRuntime}분)
              </option>
            ))
          ) : (
            <option disabled>현재 상영 중인 영화가 없습니다</option>
          )}
        </select>
      </div>

      <div className="admin-schedule-input">
        <label>상영관</label>
        <select value={screenNo} onChange={(e) => setScreenNo(e.target.value)}>
          <option value="">선택</option>
          <option value="1">1관 (2D)</option>
          <option value="2">2관 (3D)</option>
          <option value="3">3관 (4DX)</option>
        </select>
      </div>

      <div className="admin-schedule-input">
        <label>상영 시작일</label>
        <input
          type="date"
          value={scheduleOpen}
          onChange={handleOpenChange}
          min={new Date().toISOString().split("T")[0]}
        />
      </div>

      <div className="admin-schedule-input">
        <label>상영 종료일 (자동 설정)</label>
        <input type="date" value={scheduleClose} readOnly />
      </div>

      <div className="admin-schedule-input">
        <label>시작 시간</label>
        <div className="flex gap-2 items-center">
          <select
            value={startHour}
            onChange={(e) => setStartHour(e.target.value)}
          >
            <option value="">시</option>
            {hourOptions.map((h) => (
              <option key={h} value={h}>
                {h}
              </option>
            ))}
          </select>

          <div className="relative">
            <button
              type="button"
              className="border rounded px-3 py-1 bg-white hover:bg-gray-100"
              onClick={() => setMinuteOpen((prev) => !prev)}
            >
              {startMinute || "분"}
            </button>
            {minuteOpen && (
              <div className="absolute z-10 mt-1 w-24 bg-white border rounded shadow-lg max-h-48 overflow-y-auto">
                {minuteOptions.map((m) => {
                  const occupied =
                    startHour && startAmPm
                      ? isTimeOccupied(startHour, m, startAmPm)
                      : false;
                  return (
                    <div
                      key={m}
                      onClick={() =>
                        !occupied ? handleMinuteSelect(m) : null
                      }
                      className={`px-3 py-1 text-sm cursor-pointer ${
                        occupied
                          ? "bg-gray-300 text-gray-500 cursor-not-allowed relative group"
                          : "hover:bg-gray-100"
                      }`}
                    >
                      {m}
                      {occupied && (
                        <span className="absolute left-0 top-[-25px] bg-gray-800 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition">
                          이미 등록된 시간입니다
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <select
            value={startAmPm}
            onChange={(e) => setStartAmPm(e.target.value)}
          >
            <option value="">오전/오후</option>
            <option value="AM">오전</option>
            <option value="PM">오후</option>
          </select>
        </div>
      </div>

      <div className="admin-schedule-input">
        <label>종료 시간 (자동 계산)</label>
        <input
          readOnly
          className="border rounded px-3 py-1 bg-gray-100"
          value={
            endHour && endMinute && endAmPm
              ? `${endAmPm} ${endHour}:${endMinute}`
              : ""
          }
        />
      </div>
    </div>
  );
};

export default AdminScheduleRegistFrm;
