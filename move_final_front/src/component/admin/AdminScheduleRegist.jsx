    import axios from "axios";
    import { useEffect, useState } from "react";
    import Swal from "sweetalert2";
    import AdminScheduleRegistFrm from "./AdminSheduleRegistFrm";
    import { useParams } from "react-router-dom";

    const AdminScheduleRegist = () => {
    
    //스케줄 등록할 때 받는 데이터
    const [scheduleOpen, setScheduleOpen] = useState(""); // 상영 시작일
    const [scheduleClose, setScheduleClose] = useState(""); // 상영 종료일
    const [scheduleTimeStart, setScheduleTimeStart] = useState(""); //상영 시작 시간
    const [scheduleTimeEnd, setScheduleTimeEnd] = useState(""); //상영 종료 시간
    const [screenNo, setScreenNo] = useState("");
    //useParams로 스케줄 등록 시 화면에 띄울 영화 정보 가져오기
    const params = useParams();
    const movieNo = params.movieNo;
    useEffect(()=>{
        axios
        .get(`${import.meta.env.VITE_BACK_SERVER}/admin/movie/${movieNo}`)
        .then((res)=>{
            console.log(res);
            setMovieTitle(res.data.movieTitle);
            setMovieThumb(res.data.movieThumb);
            setMovieStatus(res.data.movieStatus === 2);
            setMovieType(res.data.movieType);
        })
        .catch((err)=>{
            console.log(err);
        });
    },[]);

    //영화 정보에서 가져온 내용 중 수정할 내용 state 만들기
    const [movieStatus, setMovieStatus] = useState("");
    const [movieTitle, setMovieTitle] = useState("");



    const adminSchedule = () =>{
        const form = new FormData();
        form.append("scheduleOpen", scheduleOpen);
        form.append("scheduleClose", scheduleClose);
        form.append("scheduleTimeStart", scheduleTimeStart);
        form.append("scheduleTimeEnd", scheduleTimeEnd);
        form.append("screenNo", screenNo);
    axios
    .post(`${import.meta.env.VITE_BACK_SERVER}/admin/schedule`, form)
    .then((res)=>{
        console.log(res);
        if(res.data > 0) {
            navigate("/admin/movie")
        }
    })
    .catch((err)=>{
        console.log(err);
    })
    };

    /*
    //상영중인 영화만 빼오기
    useEffect(() => {
        axios
        .get(`${import.meta.env.VITE_BACK_SERVER}/admin/movie` ,{
            params: {reqPage : 1},
        })
        .then((res) => {
            console.log(res.data);
            const runningMovies = res.data.movieList.filter(
            (movie) => movie.movieStatus === 2
            );
            setMovieList(runningMovies);
        })
        .catch((err) => {
            console.log(err);
        });
    }, []);
    */

    // 스케줄 등록 버튼
    const adminScheduleRegist = () => {
        if (
            !movieTitle || 
            !scheduleTimeStart || 
            !scheduleTimeEnd || 
            !scheduleOpen || 
            !scheduleOpen|| 
            !screenNo
        ) {
        Swal.fire({
            title: "스케줄 정보를 전부 입력해주세요.",
            icon: "warning",
        });    
        return;
        }

        const scheduleData = {
        movieTitle: movieTitle,
        movieThumb : movieThumb,
        scheduleTimeStart: Number(scheduleTimeStart),
        scheduleTimeEnd: Number(scheduleTimeEnd),
        scheduleOpen: Number(scheduleOpen),
        scheduleClose: Number(scheduleClose),
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
            onClick={adminScheduleRegist}>
            등록하기
            </button>
        </div>
        </section>
    );
    };



    export default AdminScheduleRegist;
