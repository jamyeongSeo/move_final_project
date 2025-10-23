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
    /*
    async=동기작업 : axios요청을 순자적으로 실행. 
    이전 작업이 완료될 때까지 다음 작업이 실행되지 않음
    => setState를 호출하면 해당 상태 업데이트는 동기적으로 처리됨
    밑에 사용한 await으로 요청이 다 끝난 뒤 아래 줄이 실행되도록(동기)로 바꿈
    */
    const adminRegist = async () => {
        if (
            !movieTitle ||
            !movieStatus ||
            !movieContent ||
            !movieThumb ||
            !movieGenre ||
            !movieGrade ||
            !movieRuntime ||
            !movieDirector ||
            !movieActor ||
            !movieRelease ||
            !movieType
        ) {
            Swal.fire({
                title: "정보를 전부 입력해주세요.",
                icon: "warning",
            });
            return;
        }

        
        const movieData = {
            movieTitle,
            movieStatus: Number(movieStatus),
            movieContent,
            movieGenre: Number(movieGenre),
            movieGrade: Number(movieGrade),
            movieRuntime: Number(movieRuntime),
            movieDirector,
            movieActor,
            movieRelease,
            movieType: Number(movieType),
        };

        // movieDTO 부분을 JSON으로 감싸서 Blob으로 변환
        /*JSON.stringify() : 객체 문자열로 변환, 컴포넌트 value사용, 데이터 전송, 데이터 받아올 때
                자바스크립트 객체, 값을 json 형식의 문자열로 변환 
                주로 데이터 전송(ex. api요청), 컴포넌트 value속성 등에 객체 직접 넣을 때 문자열로 변환해야할 경우
                브라우저에 객체를 문자열로 저장하고 나중에 json.parse()로 다시 객체 변환 가능
        */
        const formData = new FormData();
        formData.append(
            "movie",
            new Blob([JSON.stringify(movieData)], { type: "application/json" })
        );
        formData.append("movieThumb", movieThumb);

        try {
            const res = await axios.post(
                `${import.meta.env.VITE_BACK_SERVER}/admin/movie`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            if (res.data > 0) {
                Swal.fire({
                    title: "등록 성공",
                    text: "등록이 완료되었습니다.",
                    icon: "success",
                });
                navigate("/movie/list");
            } else {
                Swal.fire({
                    title: "등록 실패",
                    text: "서버 처리 중 문제가 발생했습니다.",
                    icon: "error",
                });
            }
        } catch (err) {
            console.error(err);
            Swal.fire({
                title: "등록 실패",
                text: "서버 요청 중 오류가 발생했습니다.",
                icon: "error",
            });
        }
    };

    return (
        <section className="admin-regist-wrap">
            <div className="regist-movie">영화 등록</div>
            <div className="regist-movie-frm">
                <AdminRegistFrm
                    movieTitle={movieTitle}
                    setMovieTitle={setMovieTitle}
                    movieStatus={movieStatus}
                    setMovieStatus={setMovieStatus}
                    movieContent={movieContent}
                    setMovieContent={setMovieContent}
                    movieThumb={movieThumb}
                    setMovieThumb={setMovieThumb}
                    movieGenre={movieGenre}
                    setMovieGenre={setMovieGenre}
                    movieGrade={movieGrade}
                    setMovieGrade={setMovieGrade}
                    movieRuntime={movieRuntime}
                    setMovieRuntime={setMovieRuntime}
                    movieDirector={movieDirector}
                    setMovieDirector={setMovieDirector}
                    movieActor={movieActor}
                    setMovieActor={setMovieActor}
                    movieRelease={movieRelease}
                    setMovieRelease={setMovieRelease}
                    movieType={movieType}
                    setMovieType={setMovieType}
                />
            </div>
            <div className="admin-regist-btn-zone">
                <button type="button" className="btn-red" onClick={adminRegist}>
                    등록하기
                </button>
            </div>
        </section>
    );
};

export default AdminRegist;
