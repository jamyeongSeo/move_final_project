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

    if (Number(movieRuntime) < 60) {
      Swal.fire({
        title: "러닝타임을 확인하세요",
        text: "영화는 최소 60분 이상이어야 합니다.",
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
      <div className="regist-movie-title">영화 등록</div>
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
