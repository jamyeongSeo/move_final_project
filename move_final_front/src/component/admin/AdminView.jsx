import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const AdminView = () =>{
    const params = useParams();
    const movieNo = params.movieNo;
    const [movie, setMovie] = useState(null);
    const navigate = useNavigate();
    
    useEffect(()=>{
        axios
        .get(`${import.meta.env.VITE_BACK_SERVER}/movie/${movieNo}`)
        .then((res)=>{
            console.log(res);
            setMovie(res.data);
        })
        .catch((err)=>{
            console.log(err)
        });
    },[]);
    const deleteMovie =() =>{
        Swal.fire({
            title:"영화 삭제",
            text:"영화를 삭제하시겠습니까?",
            icon:"warning",
            showCancelButton:true,
            confirmButtonText:"삭제하기",
            cancelButtonText:"취소",
        }).then((select)=>{
            if(select.isConfirmed){
                axios
                .delete(`${import.meta.env.VITE_BACK_SERVER}/movie/${movieNo}`)
                .then((res) => {
                    console.log(res);
                    if (res.data === 1) {
                        navigate("/movie/list");
                    }
                })
                .catch((err)=>{
                    console.log(err);
                });
            }
        });
    };
    
    return(
    <section className="admin-view-wrap">
        <div className="admin-view-title">영화 정보</div>
        {movie && (
            <div className="admin-view-content">
                <div className="admin-view-info">

                    <div className="admin-view-movieThumb">포스터
                        <img
                        src={
                        `${import.meta.env.VITE_BACK_SERVER}/movie/movieThumb/${movie.movieThumb}
                        `}
                        />
                    </div>
        <table>
            <tr>
            <th>
                <div className="admin-schedule-info">영화</div>
            </th>
            <td>
                {movie.movieTitle}
            </td>
        </tr>
        <tr>
            <th>
                <div className="admin-schedule-info">등급</div>
            </th>
        <td>
            {movie.movieGrade}
        </td>
    </tr>

    <tr>
        <th>
            <div className="admin-schedule-info">영화 소개</div>
        </th>
        <td>
            {movie.movieContent}
        </td>
    </tr>

    <tr>
        <th>
            <div className="admin-schedule-info">영화 장르</div>
        </th>
        <td>
        {movie.movieGenre}
        </td>
    </tr>

    <tr>
        <th>
            <div className="admin-schedule-info">상영 등급</div>
        </th>
        <td>
        {movie.movieGrade}
        </td>
    </tr>

    <tr>
        <th>
            <div className="admin-schedule-info">상영시간</div>
        </th>
        <td>
            {movie.movieRuntime}
        </td>
    </tr>
    
    </table>
        <div className="view-btn-zone">
            <Link to={`/movie/update/${movieNo}`} className="admin-update-btn">수정</Link>
            <button
            type="button"
            className="admin-delete-btn"
            onClick={deleteMovie}>삭제
            </button>
            </div>
        </div>
    </div>
        )}
    </section>
    )
}
export default AdminView;