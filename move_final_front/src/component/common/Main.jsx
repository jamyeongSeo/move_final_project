import axios from "axios";
import { useEffect, useState } from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useRecoilState, useRecoilValue } from "recoil";
import { isLoginState, loginIdState } from "../utils/RecoilData";
import { red } from "@mui/material/colors";
import "./main.css";
import { Link } from "react-router-dom";

const Main = () => {
  const isLogin = useRecoilValue(isLoginState);
  const [memberId, setMemberId] = useRecoilState(loginIdState);
  const [movieAllList, setMovieAllList] = useState([]);

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
  }, [movieAllList]);
  return (
    <body
      style={{
        backgroundColor: "var(--main1)",
        margin: "0px",
        width: "100%",
        height: "100%",
      }}
    >
      <div className="content" style={{ margin: "0px auto", width: "1300px" }}>
        <div className="content-wrap" style={{ margin: "0px" }}>
          <div className="main-box-office-wrap">
            <div className="main-box-office-title">박스오피스</div>
            <div className="main-box-office-post-wrap">
              <div className="main-box-office-post">
                {movieAllList.slice(0, 3).map((movie, index) => {
                  return (
                    <MovieItem
                      key={"movie-" + index}
                      movie={movie}
                      index={index}
                      isLogin={isLogin}
                      memberId={memberId}
                      movieAllList={movieAllList}
                      setMovieAllList={setMovieAllList}
                    />
                  );
                })}
              </div>
            </div>
          </div>

          <div className="main-movie-schedule-wrap"></div>
        </div>
      </div>
    </body>
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
  const isLogin = props.isLogin;
  const memberId = props.memberId;
  const movieAllList = props.movieAllList;
  const setMovieAllList = props.setMovieAllList;
  const [likeCount, setLikeCount] = useState(movie.likeCount);

  return (
    <li className="movie-item">
      <div
        className="movie-poster"
        onMouseOver={viewContent}
        onMouseOut={hideContent}
      >
        <Link to="/movie/list">
          <img
            style={{ width: "100%", height: "96%" }}
            src={movie.movieThumb}
            className={hoverText !== 2 ? "movie-thumb" : "movie-thumb-hide"}
          />
        </Link>
        {/*hover 설명
        <div
          className={hoverText === 2 ? "movie-content show" : "movie-content"}
        >
          {movie.movieContent}
        </div> */}
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
        <div className="movie-title" style={{ color: "var(--main3)" }}>
          {movie.movieTitle}
        </div>
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

                          setMovieAllList(likeUnPushList);
                        }
                      })
                      .catch((err) => {});
                  }
                }}
              >
                <FavoriteBorderIcon sx={{ fill: "#ffffff" }} />
              </span>
            )}
          </div>
          <div className="like-count" style={{ color: "var(--main3)" }}>
            {movie.likeCount}
          </div>
        </div>
        <div className="booking-zone">
          <button className="booking-btn">예매하기</button>
        </div>
      </div>
    </li>
  );
};

export default Main;
