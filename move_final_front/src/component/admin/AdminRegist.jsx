import { useState } from "react";
import AdminRegistFrm from "./AdminRegistFrm";
import Swal from "sweetalert2";
import { iconButtonClasses } from "@mui/material";

const AdminRegist = () =>{
    const [movieTitle, setMovieTitle] = useState("");
    const [movieStatus, setMovieStatus] = useState(0);
    const [movieContent, setMovieContent] = useState("");
    const [movieThumb, setMovieThumb] = useState(null);
    const [movieGenre, setMovieGenre] = useState(0);
    const [movieGrade, setMovieGrade] = useState(0);
    const [movieRuntime, setMovieRuntime] = useState(0);
    const [movieDirector, setMovieDirector] = useState("");
    const [movieActor, setMovieActor] = useState(0);
    const [movieRelease, setMovieRelease] = useState(0);
    const [movieType, setMovieType] = useState(0);

    const adminRegist = () =>{
        if (AdminRegist !== "") {
            const registForm = new FormData();
            form.append("movieTitle", movieTitle);
            form.append("movieStatus", movieStatus);
            form.append("movieContent", movieContent);
            form.append("movieThumb", movieThumb);
            form.append("movieGenre", movieGenre);
            form.append("movieGrade", movieGrade);
            form.append("movieRuntime", movieRuntime);
            form.append("movieDirector", movieDirector);
            form.append("movieActor", movieActor);
            form.append("movieRelease", movieRelease);
            form.append("movieType", movieType);
        }
        axios
        .post(`${import.meta.env.VITE_BACK_SERVER}/movie`, form)
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
                    text:"등록이 실패했습니다",
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