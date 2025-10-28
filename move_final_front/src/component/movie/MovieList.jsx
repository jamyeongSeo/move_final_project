import axios from "axios";
import { useEffect, useState } from "react";
import "./movie.css";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useRecoilState, useRecoilValue } from "recoil";
import { isLoginState, loginIdState } from "../utils/RecoilData";
import { red } from "@mui/material/colors";
import { Link, useNavigate } from "react-router-dom";

const MovieList = () => {
  const isLogin = useRecoilValue(isLoginState);
  const [memberId, setMemberId] = useRecoilState(loginIdState);
  const [movieAllList, setMovieAllList] = useState([]);
  const [likeCount, setLikeCount] = useState(0);

  useEffect(() => {
    axios
      .get(
        `${import.meta.env.VITE_BACK_SERVER}/movie/list?memberId=${memberId}`
      )
      .then((res) => {
        if (movieAllList.length === 0) {
          setMovieAllList(res.data.movieList);
        }
      })
      .catch((err) => {});
  }, [movieAllList, likeCount]);

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
                <MovieItem
                  key={"movie-" + index}
                  movie={movie}
                  index={index}
                  isLogin={isLogin}
                  memberId={memberId}
                  movieAllList={movieAllList}
                  setMovieAllList={setMovieAllList}
                  likeCount={likeCount}
                  setLikeCount={setLikeCount}
                />
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

const MovieItem = (props) => {
  const navigate = useNavigate();
  const viewContent = () => {
    setHoverText(2);
  };
  const hideContent = () => {
    setHoverText(1);
  };
  const [hoverText, setHoverText] = useState(1);
  const movie = props.movie;
  const index = props.index;
  const isLogin = props.isLogin;
  const memberId = props.memberId;
  const movieAllList = props.movieAllList;
  const setMovieAllList = props.setMovieAllList;
  const likeCount = props.likeCount;
  const setLikeCount = props.setLikeCount;

  return (
    <li className="movie-item">
      <div
        className="movie-poster"
        onMouseOver={viewContent}
        onMouseOut={hideContent}
        onClick={() => {
          navigate(`/movie/detail/${movie.movieNo}`);
        }}
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
        <div className="movie-btn-zone">
          <div className="like-btn">
            {movie.like ? (
              <span
                className="like-img-pushed"
                onClick={() => {
                  if (isLogin) {
                    axios
                      .delete(
                        `${
                          import.meta.env.VITE_BACK_SERVER
                        }/movie/likeUnPush?movieNo=${
                          movie.movieNo
                        }&memberId=${memberId}`
                      )
                      .then((res) => {
                        if (res.data === 1) {
                          const likePushList = movieAllList.map((item, i) => {
                            return index === i
                              ? {
                                  ...item,
                                  like: false,
                                  likeCount: Number(likeCount),
                                }
                              : item;
                          });
                          setLikeCount(Number(likeCount));
                          setMovieAllList(likePushList);
                        }
                      })
                      .catch((err) => {});
                  }
                }}
              >
                <FavoriteIcon sx={{ fill: "#ff2b2b" }} />
              </span>
            ) : (
              <span
                className="like-img"
                onClick={() => {
                  if (isLogin) {
                    axios
                      .post(
                        `${
                          import.meta.env.VITE_BACK_SERVER
                        }/movie/likePush?movieNo=${
                          movie.movieNo
                        }&memberId=${memberId}`
                      )
                      .then((res) => {
                        if (res.data === 1) {
                          const likeUnPushList = movieAllList.map((item, i) => {
                            return index === i
                              ? {
                                  ...item,
                                  like: true,
                                  likeCount: Number(likeCount),
                                }
                              : item;
                          });
                          setLikeCount(Number(likeCount));
                          setMovieAllList(likeUnPushList);
                        }
                      })
                      .catch((err) => {});
                  }
                }}
              >
                <FavoriteBorderIcon />
              </span>
            )}
          </div>
          <div className="like-count">{movie.likeCount}</div>
        </div>
        <div className="booking-zone">
          <button className="booking-btn">예매하기</button>
        </div>
      </div>
    </li>
  );
};

export default MovieList;
