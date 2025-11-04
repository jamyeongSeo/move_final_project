import { useNavigate, useParams } from "react-router-dom";
import AdminRegistFrm from "./AdminRegistFrm";
import { useEffect, useState } from "react";
import axios from "axios";
import { c } from "vite/dist/node/types.d-aGj9QkWt";

const AdminUpdate = () =>{
    const params = useParams();
    const movieNo = params.movieNo;
    useEffect(()=>{
        axios
        .get(`${import.meta.env.VITE_BACK_SERVER}/admin/${movieNo}`)
        .then((res)=>{
            setMovieContent(res.data.movieContent);
            setMovieThumb(res.data.setMovieThumb);
            setMovieGenre(res.data.movieGenre);
            setMovieGrade(res.data.movieGrade);
            setMovieDirector(res.data.movieDirector);
            setMovieActor(res.data.movieActor);
            setMovieRelease(res.data.movieRelease);
            setMovieType(res.data.movieType);
        })
        .catch((err)=>{
        });
    }, []);
    const[movieTitle, setMovieTitle] = useState("");
    const[movieStatus, setMovieStatus] = useState("");
    const[movieContent, setMovieContent] = useState("");
    const[movieThumb, setMovieThumb] = useState(null);
    const[movieGenre, setMovieGenre] = useState("");
    const[movieGrade, setMovieGrade] = useState("");
    const[movieRuntime, setMovieRuntime] = useState("");
    const[movieDirector, setMovieDirector] = useState("");
    const[movieActor, setMovieActor] = useState("");
    const[movieRelease, setMovieRelease] = useState("");
    const[movieType, setMovieType] = useState("");
    const navigate = useNavigate();
    const adminUpdate = () =>{
        if(movieTitle !== null && movieContent !== ""){
        const form = new FormData();
            form.append("movieNo", movieNo);
            form.append("movieTitle", movieTitle);
            form.append("moviecontent", movieContent);
        if(movieThumb){
            form.append("movieThumb", movieThumb);
        }
        axios
        .patch(`${import.meta.env.VITE_BACK_SERVER}/movie`, form, {
            headers: {
                "Content-Type":"multipart/form-data",
            },
        })
        .then((res)=>{
            navigate(`/admin/main/movie/list/${movieNo}`);
        })
        .catch((err)=>{
            confirm.length(err);
        });
        }
    };

    //css는 adminregist 화면이랑 맞추면 될 듯?  - 클래스네임 맞춰서.... 아닌가?
    return(
        <section className="admin-update-content-wrap">
            <div className="update-title">영화 정보 수정</div>
            <div className="update-frm">
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
            <div className="update-btn-zone">
                <button type="button" className="update-btn" onClick={update}>수정하기</button> 
            </div>
        </section>
    )
}

export default AdminUpdate;