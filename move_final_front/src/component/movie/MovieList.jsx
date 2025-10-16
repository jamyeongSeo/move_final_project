import axios from "axios";
import { useEffect, useState } from "react";
import "./movie.css";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
const MovieList = () => {
  const [movieAllList, setMovieAllList] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACK_SERVER}/movie/list`)
      .then((res) => {
        console.log(res);
        setMovieAllList(res.data.movieList);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="content">
      <div className="movie-wrap">
        <div className="movie-header">
          <div className="movie-page-title">
            <h3>영화 리스트</h3>
          </div>
        </div>
        <div className="movie-list-box">
          <ul className="list-wrap">
            {movieAllList.map((movie, index) => {
              return (
                <MovieItem key={"movie-" + index} movie={movie} index={index} />
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

const MovieItem = (props) => {
  const viewContent = () => {
    setHoverText(2);
  };
  const hideContent = () => {
    setHoverText(1);
  };
  const [hoverText, setHoverText] = useState(1);
  const movie = props.movie;
  const index = props.index;
  return (
    <li className="movie-item">
      <div
        className="movie-poster"
        onMouseOver={viewContent}
        onMouseOut={hideContent}
      >
        <img
          src={movie.movieThumb}
          className={hoverText !== 2 ? "movie-thumb" : "movie-thumb-hide"}
        />
        <div
          className={hoverText === 2 ? "movie-content show" : "movie-content"}
        >
          {movie.movieContent}
        </div>
      </div>
      <div className="movie-info">
        <div className="movie-grade">
          <img
            src={
              movie.movieGrade == 1
                ? "/image/ALL.png"
                : movie.movieGrade == 2
                ? "/image/12.png"
                : movie.movieGrade == 3
                ? "/image/15.png"
                : "/image/19.png"
            }
            className="grade-img"
          />
        </div>
        <div className="movie-title">{movie.movieTitle}</div>
        <div className="btn-zone">
          <div className="like-btn">
            <FavoriteBorderIcon className="like-img" />
          </div>
        </div>
        <div className="booking-zone">
          <button className="booking-btn">예매하기</button>
        </div>
      </div>
    </li>
  );
};

export default MovieList;
