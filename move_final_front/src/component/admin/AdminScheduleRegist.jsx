    import axios from "axios";
    import { useEffect, useState } from "react";
    import Swal from "sweetalert2";
    import AdminScheduleRegistFrm from "./AdminSheduleRegistFrm";

    const AdminScheduleRegist = () => {
    const [movieList, setMovieList] = useState([]);
    const [movieTitle, setMovieTitle] = useState("");
    const [scheduleTimeStart, setScheduleTimeStart] = useState(""); 
    const [scheduleTimeEnd, setScheduleTimeEnd] = useState("");
    const [scheduleOpen, setScheduleOpen] = useState("");
    const [scheduleClose, setScheduleClose] = useState("");
    const [screenNo, setScreenNo] = useState(""); // 관선택

    useEffect(() => {
        axios
        .get(`${import.meta.env.VITE_BACK_SERVER}/admin/movie` ,{
            params: {reqPage : 1},
        })
        .then((res) => {
            console.log(res.data);
            const runningMovies = res.data.movieList.filter(
            (movie) => movie.movieStatus === 2 && movie.movieGrade
            );
            setMovieList(runningMovies);
        })
        .catch((err) => {
            console.log(err);
        });
    }, []);

    // 스케줄 등록 버튼
    const adminScheduleRegist = () => {
        if (!movieTitle) {
        Swal.fire({
            title: "영화를 선택해주세요.",
            icon: "warning",
        });
        return;
        }

        if (!scheduleTimeStart || !scheduleTimeEnd) {
        Swal.fire({
            title: "상영시간을 입력해주세요.",
            icon: "warning",
        });
        return;
        }
        const scheduleData = {
        movieTitle: movieTitle,
        scheduleTimeStart: Date(scheduleTimeStart),
        scheduleTimeEnd: Date(scheduleTimeEnd),
        scheduleOpen: Date(scheduleOpen),
        scheduleClose: Date(scheduleClose),
        screenNo: Number(screenNo),
        };

        axios
        .post(`${import.meta.env.VITE_BACK_SERVER}/admin/schedule`, scheduleData)
        .then((res) => {
            Swal.fire({
            title: "스케줄 등록 성공",
            text: "스케줄 등록이 완료되었습니다.",
            icon: "success",
            });
        })
        .catch((err) => {
            console.log(err);
            Swal.fire({
            title: "스케줄 등록 실패",
            text: "스케줄 등록에 실패했습니다.",
            icon: "warning",
            });
        });
    };

    return (
        <section className="admin-schedule-regist-wrap">
        <div className="admin-schedule-regist-title">스케줄 등록</div>
        <div className="admin-schedule-regist-frm">
            <AdminScheduleRegistFrm
            movieList={movieList}
            movieTitle={movieTitle}
            setMovieTitle={setMovieTitle}
            scheduleTimeStart={scheduleTimeStart}
            setScheduleTimeStart={setScheduleTimeStart}
            scheduleTimeEnd={scheduleTimeEnd}
            setScheduleTimeEnd={setScheduleTimeEnd}
            scheduleOpen={scheduleOpen}
            setScheduleOpen={setScheduleOpen}
            scheduleEnd={scheduleClose}
            setScheduleEnd={setScheduleClose}
            screenNo={screenNo}
            setScreenNo={setScreenNo}
            />
        </div>
        <div className="admin-schedule-regist-btn-zone">
            <button
            type="button"
            className="btn-red"
            onClick={adminScheduleRegist}
            >
            등록하기
            </button>
        </div>
        </section>
    );
    };

    export default AdminScheduleRegist;
