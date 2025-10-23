import { useState } from "react";
import AdminRegistFrm from "./AdminRegistFrm";
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminRegist = () => {
    const [movieTitle, setMovieTitle] = useState(""); 
    const [movieStatus, setMovieStatus] = useState(""); 
    const [movieContent, setMovieContent] = useState(""); 
    const [movieThumb, setMovieThumb] = useState(null); 
    const [movieGenre, setMovieGenre] = useState(""); 
    const [movieGrade, setMovieGrade] = useState(""); 
    const [movieRuntime, setMovieRuntime] = useState(""); 
    const [movieDirector, setMovieDirector] = useState(""); 
    const [movieActor, setMovieActor] = useState(""); 
    const [movieRelease, setMovieRelease] = useState(""); 
    const [movieType, setMovieType] = useState(""); 

    const navigate = useNavigate();

    const adminRegist = async () => {
        if(!movieTitle || !movieStatus || !movieContent || !movieThumb || !movieGenre
            || !movieGrade || !movieRuntime || !movieDirector || !movieActor || !movieRelease || !movieType) {
            Swal.fire({
                title:"정보를 전부 입력해주세요.",
                icon:"warning",
            });
            return;
        }

        const formData = new FormData();
        formData.append("movieTitle", movieTitle);
        formData.append("movieStatus", movieStatus); // Spring에서 int로 변환 가능
        formData.append("movieContent", movieContent);
        formData.append("movieThumb", movieThumb); // MultipartFile로 받음
        formData.append("movieGenre", movieGenre);
        formData.append("movieGrade", movieGrade);
        formData.append("movieRuntime", movieRuntime);
        formData.append("movieDirector", movieDirector);
        formData.append("movieActor", movieActor);
        formData.append("movieRelease", movieRelease); // yyyy-MM-dd 형식
        formData.append("movieType", movieType);

        try {
            const res = await axios.post(`${import.meta.env.VITE_BACK_SERVER}/admin/movie`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });

            if(res.data > 0){
                Swal.fire({
                    title:"등록 성공",
                    text:"등록이 완료되었습니다.",
                    icon:"success"
                });
                navigate("/movie/list");
            } else {
                Swal.fire({
                    title:"등록 실패",
                    text:"서버 처리 중 문제가 발생했습니다.",
                    icon:"error"
                });
            }
        } catch(err) {
            console.error(err);
            Swal.fire({
                title:"등록 실패",
                text:"서버 요청 중 오류가 발생했습니다.",
                icon:"error"
            });
        }
    }

    return (
        <section className="admin-regist-wrap">
            <div className="regist-movie">영화 등록</div>
            <div className="regist-movie-frm">
                <AdminRegistFrm
                    movieTitle={movieTitle} setMovieTitle={setMovieTitle}
                    movieStatus={movieStatus} setMovieStatus={setMovieStatus}
                    movieContent={movieContent} setMovieContent={setMovieContent}
                    movieThumb={movieThumb} setMovieThumb={setMovieThumb}
                    movieGenre={movieGenre} setMovieGenre={setMovieGenre}
                    movieGrade={movieGrade} setMovieGrade={setMovieGrade}
                    movieRuntime={movieRuntime} setMovieRuntime={setMovieRuntime}
                    movieDirector={movieDirector} setMovieDirector={setMovieDirector}
                    movieActor={movieActor} setMovieActor={setMovieActor}
                    movieRelease={movieRelease} setMovieRelease={setMovieRelease}
                    movieType={movieType} setMovieType={setMovieType}
                />
            </div>
            <div className="admin-regist-btn-zone">
                <button type="button" className="btn-red" onClick={adminRegist}>
                    등록하기
                </button>
            </div>
        </section>
    )
}

export default AdminRegist;
