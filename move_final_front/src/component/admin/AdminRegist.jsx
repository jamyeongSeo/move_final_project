import { useState } from "react";
import AdminRegistFrm from "./AdminRegistFrm";
import Swal from "sweetalert2";
import { iconButtonClasses } from "@mui/material";

const AdminRegist = () =>{
    const [movieTitle, setMovieTitle] = useState(""); //영화이름
    const [movieStatus, setMovieStatus] = useState(""); //영화 상태 --1:개봉예정 2:상영중 3:상영종료 4:재개봉
    const [movieContent, setMovieContent] = useState(""); //영화 소개
    const [movieThumb, setMovieThumb] = useState(null); //영화 포스터
    const [movieGenre, setMovieGenre] = useState(0); //영화 장르
    const [movieGrade, setMovieGrade] = useState(0); //영화 등급
    const [movieRuntime, setMovieRuntime] = useState(0); //상영시간
    const [movieDirector, setMovieDirector] = useState(""); //감독
    const [movieActor, setMovieActor] = useState(""); //주연
    const [movieRelease, setMovieRelease] = useState(0); //개봉일자
    const [movieType, setMovieType] = useState(0); //영화 등급

    const adminRegist = () =>{
        if (AdminRegist !== "") {
            const registForm = new FormData();
            registForm.append("movieTitle", movieTitle);
            registForm.append("movieStatus", movieStatus);
            registForm.append("movieContent", movieContent);
            registForm.append("movieThumb", movieThumb);
            registForm.append("movieGenre", movieGenre);
            registForm.append("movieGrade", movieGrade);
            registForm.append("movieRuntime", movieRuntime);
            registForm.append("movieDirector", movieDirector);
            registForm.append("movieActor", movieActor);
            registForm.append("movieRelease", movieRelease);
            registForm.append("movieType", movieType);
        }
        axios
        .post(`${import.meta.env.VITE_BACK_SERVER}/movie`, registForm)
        .then((res)=>{
            console.log(res);
            Swal.fire({
                title:"등록 성공",
                text:"등록이 완료되었습니다.",
                icon:"success"
            })
            .catch((err)=>{
                console.log(err);
                Swal.fire({
                    title:"등록 실패",
                    text:"등록이 실패했습니다.",
                    icon:"warning"
                })
            })
        })
    }
    return(
        <section className="admin-regist-wrap">
            <div className="regist-movie">영화 등록</div>
            <div className="regist-movie-frm">
                <AdminRegistFrm
                    movieTitle = {movieTitle}
                    setMovieTitle = {setMovieTitle}
                    movieStatus = {movieStatus}
                    setMovieStatus = {setMovieStatus}
                    movieContent = {movieContent}
                    setMovieContent = {setMovieContent}
                    movieThumb = {movieThumb}
                    setMovieThumb = {setMovieThumb}
                    movieGenre = {movieGenre}
                    setMovieGenre = {setMovieGenre}
                    movieGrade = {movieGrade}
                    setMovieGrade = {setMovieGrade}
                    movieRuntime = {movieRuntime}
                    setMovieRuntime = {setMovieRuntime}
                    movieDirector = {movieDirector}
                    setMovieDirector = {setMovieDirector}
                    movieActor = {movieActor}
                    setMovieActor = {setMovieActor}
                    movieRelease = {movieRelease}
                    setMovieRelease = {setMovieRelease}
                    movieType = {setMovieType}
                    setMovieType = {setMovieType}
                />
            </div>
            <div className="admin-regist-btn-zone">
                <button type="button" className="admin-regist-btn" onClick={adminRegist}>
                    등록하기
                </button>
            </div>
        </section>
    )
}

export default AdminRegist;