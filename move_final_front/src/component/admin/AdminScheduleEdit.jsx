import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useParams, useNavigate } from "react-router-dom";
import AdminScheduleRegistFrm from "./AdminScheduleRegistFrm";
import "./adminSchedule.css";
import "./admin.css";

const AdminScheduleEdit = () => {
  const { scheduleNo } = useParams();
  const navigate = useNavigate();

  // 영화 목록 & 스케줄 데이터
  const [movieList, setMovieList] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [scheduleData, setScheduleData] = useState(null);

  // 상영관, 시간, 날짜
  const [screenNo, setScreenNo] = useState("");
  const [scheduleOpen, setScheduleOpen] = useState("");
  const [scheduleClose, setScheduleClose] = useState("");
  const [startHour, setStartHour] = useState("");
  const [startMinute, setStartMinute] = useState("");
  const [startAmPm, setStartAmPm] = useState("");
  const [endHour, setEndHour] = useState("");
  const [endMinute, setEndMinute] = useState("");
  const [endAmPm, setEndAmPm] = useState("");

  // 상영중 영화 목록 불러오기
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACK_SERVER}/admin/movie/running`)
      .then((res) => setMovieList(res.data))
      .catch((err) => console.error("영화 목록 불러오기 실패:", err));
  }, []);

  // 수정할 스케줄 데이터 불러오기
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACK_SERVER}/admin/schedule/${scheduleNo}`)
      .then((res) => {
        const data = res.data;
        setScheduleData(data);
        setSelectedMovie({ movieNo: data.movieNo, movieTitle: data.movieTitle });

        setScreenNo(data.screenNo);
        setScheduleOpen(data.scheduleOpen);
        setScheduleClose(data.scheduleClose);

        const [startH, startM] = data.scheduleTimeStart.split(":");
        const [endH, endM] = data.scheduleTimeEnd.split(":");

        setStartHour(String(startH % 12 || 12));
        setStartMinute(startM);
        setStartAmPm(startH >= 12 ? "PM" : "AM");

        setEndHour(String(endH % 12 || 12));
        setEndMinute(endM);
        setEndAmPm(endH >= 12 ? "PM" : "AM");
      })
      .catch((err) => console.error("스케줄 정보 불러오기 실패:", err));
  }, [scheduleNo]);

  // 수정 버튼 클릭
  const handleUpdate = async () => {
    if (!selectedMovie || !screenNo || !scheduleOpen) {
      Swal.fire({
        icon: "warning",
        title: "필수 항목 누락!",
        text: "영화, 상영관, 상영일을 모두 선택해주세요.",
        confirmButtonColor: "#c0392b",
      });
      return;
    }

    const updatedSchedule = {
      scheduleNo,
      movieNo: selectedMovie.movieNo,
      screenNo,
      scheduleOpen,
      scheduleClose,
      scheduleTimeStart: `${startHour.padStart(2, "0")}:${startMinute.padStart(2, "0")}`,
      scheduleTimeEnd: `${endHour.padStart(2, "0")}:${endMinute.padStart(2, "0")}`,
    };

    try {
      await axios.put(`${import.meta.env.VITE_BACK_SERVER}/admin/schedule`, updatedSchedule);

      Swal.fire({
        icon: "success",
        title: "수정 완료!",
        text: "스케줄이 성공적으로 수정되었습니다.",
        confirmButtonColor: "#c0392b",
      }).then(() => navigate("/admin/main/schedule/list"));
    } catch (err) {
      console.error("수정 실패:", err);
      Swal.fire({
        icon: "error",
        title: "수정 실패!",
        text: "이미 등록된 시간 또는 서버 오류입니다.",
        confirmButtonColor: "#c0392b",
      });
    }
  };

  if (!scheduleData) return <div>로딩 중...</div>;

  return (
    <div className="admin-schedule-edit-wrap">
      <h2>🎬 스케줄 수정</h2>

      <AdminScheduleRegistFrm
        movieList={movieList}
        selectedMovie={selectedMovie}
        handleMovieSelect={(movieNo) =>
          setSelectedMovie(movieList.find((m) => m.movieNo === movieNo))
        }
        scheduleOpen={scheduleOpen}
        handleOpenChange={(e) => setScheduleOpen(e.target.value)}
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
      />

      {/* 수정 버튼 */}
      <div className="admin-schedule-btn-wrap">
        <button className="admin-btn-red" onClick={handleUpdate}>
          스케줄 수정
        </button>
      </div>
    </div>
  );
};

export default AdminScheduleEdit;
