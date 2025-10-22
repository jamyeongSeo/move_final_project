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

  //상영스케줄 일자 (오늘 포함 8일)
  const [scheduleDate, setScheduleDate] = useState(null);
  const today = new Date(); //오늘날짜
  useEffect(() => {
    if (scheduleDate && scheduleDate.length > 8) {
      setScheduleDate([
        {
          month: "",
          day: "",
          week: "",
        },
      ]);
    }
    const newScheduleDate = [];
    for (let i = 0; i < 8; i++) {
      today.setDate(today.getDate() + i);
      //월
      const month = ("0" + (today.getMonth() + 1)).slice(-2);
      //일
      const date = ("0" + today.getDate()).slice(-2);
      //요일
      const daysOfWeek = ["일", "월", "화", "수", "목", "금", "토"];
      const dayOfWeekIndex = today.getDay(); //일=0
      const dayOfWeek = daysOfWeek[dayOfWeekIndex];

      const oneScheduleDate = {
        month: month,
        date: date,
        dayOfWeek: dayOfWeek,
      };
      newScheduleDate.push({ oneScheduleDate });
      today.setDate(today.getDate() - i);
    }
    //set은 for문 안에서 해주면 안됨!!!
    setScheduleDate(newScheduleDate);
  }, []);
  const [firstCss, setFirstCss] = useState(true);
  const [changeCss, setChangeCss] = useState(false);

  //상영 스케줄 날짜 확인 및 back 갈 date 값 넣어줄 배열 생성
  const [dateCss, setDateCss] = useState([
    {
      className: "main-schedule-day-map main-schedule-day-map-click",
      date: today.getDate(),
    },
    {
      className: "main-schedule-day-map",
      date: today.getDate() + 1,
    },
    {
      className: "main-schedule-day-map",
      date: today.getDate() + 2,
    },
    {
      className: "main-schedule-day-map",
      date: today.getDate() + 3,
    },
    {
      className: "main-schedule-day-map",
      date: today.getDate() + 4,
    },
    {
      className: "main-schedule-day-map",
      date: today.getDate() + 5,
    },
    {
      className: "main-schedule-day-map",
      date: today.getDate() + 6,
    },
    {
      className: "main-schedule-day-map",
      date: today.getDate() + 7,
    },
  ]);
  const [dateSchedule, setDateSchedule] = useState(today);
  useEffect(() => {
    //axios
  }, [dateSchedule]);
  console.log(dateCss);
  console.log(dateSchedule);
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

          <div className="main-schedule-wrap">
            <div className="main-schedule-title">상영스케줄</div>
            <div className="main-schedule-day-wrap">
              {scheduleDate &&
                scheduleDate.map((date, index) => {
                  return (
                    <div
                      onClick={() => {
                        const newDateCss = [...dateCss];
                        {
                          newDateCss.map((css, i) => {
                            if (css.date != dateCss[index].date) {
                              newDateCss[i].className = "main-schedule-day-map";
                            } else if (css.date == dateCss[index].date) {
                              newDateCss[i].className =
                                "main-schedule-day-map main-schedule-day-map-click";
                            }
                          });
                        }
                        setDateCss(newDateCss);
                        setDateSchedule(dateCss[index].date);
                      }}
                      className={dateCss[index].className}
                      key={"main-schedul-" + index}
                    >
                      <ul>
                        <li
                          className={
                            date.oneScheduleDate.dayOfWeek == "토"
                              ? "main-shedule-week-b"
                              : date.oneScheduleDate.dayOfWeek == "일"
                              ? "main-shedule-week-r"
                              : "main-shedule-week-w"
                          }
                        >
                          {date.oneScheduleDate.dayOfWeek}
                        </li>
                        <li className="main-shedule-month-date">
                          {date.oneScheduleDate.date !== 1 ? (
                            <h3>{date.oneScheduleDate.date}</h3>
                          ) : (
                            <h3>
                              {date.oneScheduleDate.month}.
                              {date.oneScheduleDate.date}
                            </h3>
                          )}
                        </li>
                      </ul>
                    </div>
                  );
                })}
            </div>
          </div>
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
