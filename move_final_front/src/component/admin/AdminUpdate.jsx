import { useParams } from "react-router-dom";
import AdminRegistFrm from "./AdminRegistFrm";
import { useEffect, useState } from "react";
import axios from "axios";

const AdminUpdate = () =>{
    const params = useParams();
    const movieNo = params.movieNo;
    useEffect(()=>{
        axios
        .get(`${import.meta.env.VITE_BACK_SERVER}/movie/${movieNo}`)
        .then((res)=>{
            console.log(res);
            setMovieContent(res.data.movieContent);
            setMovieThumb(res.data.movieThumb);
            setMovieGenre(res.data.movieGenre);
            setMovieGrade(res.data.movieGrade);
            setMovieRuntime(res.data.movieRuntime);
            setMovieDirector(res.data.movieDirector);
            setMovieActor(res.data.movieActor);
            setMovieRelease(res.data.movieRelease);
            setMovieType(res.data.movieType);
        })
        .catch((err)=>{
            console.log(err);
        });
    });

    const[movieContent, setMovieContent] = useState("");
    const[movieThumb, setMovieThumb] = useState(null);
    const[movieGenre, setMovieGenre] = useState("");
    const[movieGrade, setMovieGrade] = useState("");
    const[movieRuntime, setMovieRuntime] = useState("");
    const[movieDirector, setMovieDirector] = useState("");
    const[movieActor, setMovieActor] = useState("");
    const[movieRelease, setMovieRelease] = useState("");
    const[movieType, setMovieType] = useState("");


    return(
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
    )
}

export default AdminUpdate;