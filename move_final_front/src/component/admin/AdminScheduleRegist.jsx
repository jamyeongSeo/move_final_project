import { useEffect, useState } from "react";
import axios from "axios";
import AdminScheduleRegistFrm from "./AdminScheduleRegistFrm";
import AdminScheduleTable from "./AdminScheduleTable";
import Swal from "sweetalert2";
import "./adminSchedule.css";
import "./admin.css";
const AdminScheduleRegist = () => {
  // 영화 목록
  const [movieList, setMovieList] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  // 상영 정보
  const [screenNo, setScreenNo] = useState("");
  const [scheduleOpen, setScheduleOpen] = useState("");
  const [scheduleClose, setScheduleClose] = useState("");

  // 시간
  const [startHour, setStartHour] = useState("");
  const [startMinute, setStartMinute] = useState("");
  const [startAmPm, setStartAmPm] = useState("");
  const [endHour, setEndHour] = useState("");
  const [endMinute, setEndMinute] = useState("");
  const [endAmPm, setEndAmPm] = useState("");

  // 상영중 영화 목록 불러오기
  useEffect(() => {
    axios
      .get("http://localhost:9999/admin/movie/running")
      .then((res) => {
        console.log("상영중 영화 목록:", res.data);
        const list = Array.isArray(res.data)
          ? res.data
          : Array.isArray(res.data.data)
          ? res.data.data
          : [];
        setMovieList(list);
      })
      .catch((err) => console.error("영화 목록 불러오기 실패:", err));
  }, []);

const [occupiedTimes, setOccupiedTimes] = useState([]);

// 상영관 or 날짜 선택될 때 점유된 시간 불러오기
useEffect(() => {
  if (screenNo && scheduleOpen) {
    axios
      .get(`http://localhost:9999/admin/schedule/occupied`, {
        params: { screenNo, scheduleOpen },
      })
      .then((res) => {
        console.log("이미 등록된 시간대:", res.data);
        setOccupiedTimes(res.data || []);
      })
      .catch((err) => console.error("시간대 불러오기 실패:", err));
  }
}, [screenNo, scheduleOpen]);


  // 영화 선택 시
  const handleMovieSelect = (movieNo) => {
    const movie = movieList.find((m) => m.movieNo === movieNo);
    setSelectedMovie(movie);
    calculateEndTime(movie);
  };

  // 시작시간 변경되면 종료시간 자동 계산
  useEffect(() => {
    if (selectedMovie && startHour && startMinute && startAmPm) {
      calculateEndTime(selectedMovie);
    }
  }, [selectedMovie, startHour, startMinute, startAmPm]);

  // 종료시간 계산
  const calculateEndTime = (movie) => {
  if (!movie || !movie.movieRuntime) return;

  const runningTime = Number(movie.movieRuntime);
  const cleanTime = 20;
  const totalMinutes = runningTime + cleanTime;

  let hour = Number(startHour);
  let minute = Number(startMinute);
  let ampm = startAmPm;

  // 시작 시각 → 분 단위
  let startInMinutes = (hour % 12) * 60 + minute + (ampm === "PM" ? 720 : 0);
  let endInMinutes = startInMinutes + totalMinutes;

  // 24시간 단위로 변환 후 오전/오후 재계산
  const nextDay = endInMinutes >= 1440;
  endInMinutes = endInMinutes % 1440;
  const endAmPm =
    endInMinutes < 720 ? "AM" : "PM"; // 0~719: AM, 720~1439: PM

  const endHourRaw = Math.floor(endInMinutes / 60);
  const endMinuteRaw = endInMinutes % 60;
  const endHour12 =
    endHourRaw === 0 ? 12 : endHourRaw > 12 ? endHourRaw - 12 : endHourRaw;

  setEndHour(endHour12.toString());
  setEndMinute(endMinuteRaw.toString().padStart(2, "0"));
  setEndAmPm(nextDay ? `AM (다음날)` : endAmPm); // 다음날이면 표시 추가
};

  // 상영 시작일 변경 시
const handleOpenChange = (e) => {
  const openDate = e.target.value;
  const today = new Date().toISOString().split("T")[0];

  if (openDate < today) {
    Swal.fire({
      icon: "warning",
      title: "과거 날짜는 선택할 수 없습니다!",
      text: "오늘 이후의 날짜만 선택해주세요.",
    });
    return;
  }

  setScheduleOpen(openDate);

  const closeDate = new Date(openDate);
  closeDate.setDate(closeDate.getDate() + 7);
  const formatted = closeDate.toISOString().split("T")[0];
  setScheduleClose(formatted);
};


  // 등록 버튼 클릭 시 (스케줄 등록 요청)
const handleSubmit = async () => {
  if (!selectedMovie || !screenNo || !scheduleOpen) {
    Swal.fire({
      icon: "warning",
      title: "필수 항목 누락!",
      text: "영화, 상영관, 상영일을 모두 선택해주세요.",
      confirmButtonColor: "#c0392b",
    });
    return;
  }

  const startTime = `${startHour.toString().padStart(2, "0")}:${startMinute.padStart(2, "0")}`;
  const endTime = `${endHour.toString().padStart(2, "0")}:${endMinute.padStart(2, "0")}`;

  const scheduleData = {
    movieNo: selectedMovie.movieNo,
    screenNo,
    scheduleOpen,
    scheduleClose,
    scheduleTimeStart: startTime,
    scheduleTimeEnd: endTime,
  };

  console.log("전송 데이터:", scheduleData);

  try {
    const res = await axios.post("http://localhost:9999/admin/schedule", scheduleData);
    console.log(" 스케줄 등록 성공:", res.data);

    Swal.fire({
      icon: "success",
      title: "스케줄 등록 완료!",
      html: `
        <b>${selectedMovie.movieTitle}</b><br/>
        ${screenNo}관 · ${scheduleOpen}<br/>
        ${startTime} ~ ${endTime}
      `,
      confirmButtonColor: "#c0392b",
    });

  } catch (err) {
    console.error(" 스케줄 등록 실패:", err);

    Swal.fire({
      icon: "error",
      title: "등록 실패!",
      text: "이미 스케줄이 등록된 시간입니다.",
      confirmButtonColor: "#c0392b",
    });
  }
};

console.log(" AdminScheduleRegist 컴포넌트 렌더링됨");

return (
  <div className="admin-schedule-wrap">
    <h2>🎬 상영 스케줄 등록</h2>

    <AdminScheduleRegistFrm
      movieList={movieList}
      selectedMovie={selectedMovie}
      handleMovieSelect={handleMovieSelect}
      scheduleOpen={scheduleOpen}
      handleOpenChange={handleOpenChange}
      scheduleClose={scheduleClose}
      screenNo={screenNo}
      setScreenNo={setScreenNo}
      startHour={startHour}
      setStartHour={setStartHour}
      startMinute={startMinute}
      setStartMinute={setStartMinute}
      startAmPm={startAmPm}
      setStartAmPm={setStartAmPm}
      endHour={endHour}
      endMinute={endMinute}
      endAmPm={endAmPm}
      occupiedTimes={occupiedTimes}
    />
    <div className="admin-schedule-table-wrap">
      <AdminScheduleTable
        startDate={scheduleOpen || new Date().toISOString().split("T")[0]}
      />
    </div>

    <div className="admin-schedule-btn-zone">
      <button className="admin-schedule-btn" onClick={handleSubmit}>
        스케줄 등록
      </button>
    </div>
  </div>
);
};
export default AdminScheduleRegist;
