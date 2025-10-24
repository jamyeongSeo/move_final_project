import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import AdminScheduleRegistFrm from "./AdminSheduleRegistFrm";
import { useNavigate } from "react-router-dom";

const AdminScheduleRegist = () => {
  const navigate = useNavigate();

  // 영화 관련 state
  const [movieList, setMovieList] = useState([]); // 상영 중 영화 리스트
  const [selectedMovie, setSelectedMovie] = useState(null); // 선택된 영화 정보

  // 스케줄 입력 state
  const [scheduleOpen, setScheduleOpen] = useState(""); // 상영 시작일
  const [scheduleClose, setScheduleClose] = useState(""); // 상영 종료일
  const [scheduleTimeStart, setScheduleTimeStart] = useState(""); // 상영 시작 시간
  const [scheduleTimeEnd, setScheduleTimeEnd] = useState(""); // 상영 종료 시간
  const [screenNo, setScreenNo] = useState("");

  // 상영 중 영화 목록 불러오기
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACK_SERVER}/admin/movie/running`)
      .then((res) => {
        console.log("상영 중 영화 목록:", res.data);
        setMovieList(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  // 스케줄 등록 요청
  const adminScheduleRegist = () => {
    if (
      !selectedMovie ||
      !scheduleOpen ||
      !scheduleClose ||
      !scheduleTimeStart ||
      !scheduleTimeEnd ||
      !screenNo
    ) {
      Swal.fire({
        title: "모든 정보를 입력해주세요.",
        icon: "warning",
      });
      return;
    }

    const scheduleData = {
      movieNo: selectedMovie.movieNo,
      scheduleOpen,
      scheduleClose,
      scheduleTimeStart,
      scheduleTimeEnd,
      screenNo,
    };

    axios
      .post(`${import.meta.env.VITE_BACK_SERVER}/admin/schedule`, scheduleData)
      .then((res) => {
        Swal.fire({
          title: "스케줄 등록 완료",
          text: "상영 스케줄이 성공적으로 등록되었습니다.",
          icon: "success",
        });
        navigate("/admin/movie");
      })
      .catch((err) => {
        console.log(err);
        Swal.fire({
          title: "등록 실패",
          text: "서버 통신 중 문제가 발생했습니다.",
          icon: "error",
        });
      });
  };

  return (
    <section className="admin-schedule-regist-wrap">
      <div className="admin-schedule-regist-title">스케줄 등록</div>
      <div className="admin-schedule-regist-frm">
        <AdminScheduleRegistFrm
          movieList={movieList}
          selectedMovie={selectedMovie}
          setSelectedMovie={setSelectedMovie}
          scheduleOpen={scheduleOpen}
          setScheduleOpen={setScheduleOpen}
          scheduleClose={scheduleClose}
          setScheduleClose={setScheduleClose}
          scheduleTimeStart={scheduleTimeStart}
          setScheduleTimeStart={setScheduleTimeStart}
          scheduleTimeEnd={scheduleTimeEnd}
          setScheduleTimeEnd={setScheduleTimeEnd}
          screenNo={screenNo}
          setScreenNo={setScreenNo}
        />
      </div>
      <div className="admin-schedule-regist-btn-zone">
        <button type="button" className="btn-red" onClick={adminScheduleRegist}>
          등록하기
        </button>
      </div>
    </section>
  );
};

export default AdminScheduleRegist;
