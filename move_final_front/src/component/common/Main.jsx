import axios from "axios";
import { useEffect, useRef, useState } from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useRecoilState, useRecoilValue } from "recoil";
import { isLoginState, loginIdState } from "../utils/RecoilData";
import { red } from "@mui/material/colors";
import "./main.css";
import { Link, useNavigate } from "react-router-dom";
import { Schedule } from "@mui/icons-material";

const Main = () => {
  return (
    <body
      style={{
        backgroundColor: "var(--main3)",
        margin: "0px",
        width: "100%",
        height: "100%",
      }}
    >
      <div
        className="content"
        style={{ margin: "0px auto", width: "1300px", justifyItems: "center" }}
      >
        <div
          className="content-wrap"
          style={{ margin: "0px", width: "1300px" }}
        >
          <div className="main-box-office-wrap">
            <div className="main-box-office-title">박스오피스 TOP3</div>
            <MainBoxOffice></MainBoxOffice>
          </div>

          <div className="main-schedule-wrap">
            <div
              className="main-schedule-title"
              style={{ fontSize: "20px", fontFamily: "ns-b" }}
            >
              상영스케줄
            </div>
            <MainMovieSchedul></MainMovieSchedul>
          </div>
        </div>
      </div>
    </body>
  );
};

const MainBoxOffice = () => {
  const isLogin = useRecoilValue(isLoginState);
  const [memberId, setMemberId] = useRecoilState(loginIdState);
  const [movieBoxOffice, setMovieBoxOffice] = useState([]);

  useEffect(() => {
    axios
      .get(
        `${
          import.meta.env.VITE_BACK_SERVER
        }/movie/boxOffice?memberId=${memberId}`
      )
      .then((res) => {
        setMovieBoxOffice(res.data.boxOfficeList.slice(0, 3));
      })
      .catch((err) => {});
  }, [movieBoxOffice]);

  return (
    <div>
      <div className="main-box-office-post-wrap">
        <div className="main-box-office-post">
          {movieBoxOffice &&
            movieBoxOffice.map((movie, index) => {
              return (
                <MovieItem
                  key={"movie-" + index}
                  movie={movie}
                  index={index}
                  isLogin={isLogin}
                  memberId={memberId}
                  movieBoxOffice={movieBoxOffice}
                  setMovieBoxOffice={setMovieBoxOffice}
                />
              );
            })}
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
  const movieBoxOffice = props.movieBoxOffice;
  const setMovieBoxOffice = props.setMovieBoxOffice;
  // const likeCount = movie.likeCount.length;

  return (
    <li className="movie-item" style={{ width: "290px" }}>
      <div
        className="movie-poster"
        onMouseOver={viewContent}
        onMouseOut={hideContent}
      >
        <Link to={`/movie/detail/${movie.movieNo}`}>
          <img
            style={{
              width: "100%",
              height: "100%",
              boxShadow: "6px 6px 5px var(--main1)",
            }}
            src={`${import.meta.env.VITE_BACK_SERVER}${movie.movieThumb}`}
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
      <div style={{ marginTop: "28px" }} className="movie-info">
        <div className="movie-grade">
          <img
            src={
              movie.movieGrade == 1
                ? "/image/ALL.png"
                : movie.movieGrade == 2
                ? "/image/12.png"
                : movie.movieGrade == 3
                ? "/image/15.png"
                : "/image/18.png"
            }
            className="grade-img"
          />
        </div>
        <div className="movie-title" style={{ color: "var(--main1)" }}>
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
                          const likeUnPushList = movieBoxOffice.map(
                            (item, i) => {
                              return index === i
                                ? {
                                    ...item,
                                    like: false,
                                  }
                                : item;
                            }
                          );

                          setMovieBoxOffice(likeUnPushList);
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
                          const likePushList = movieBoxOffice.map((item, i) => {
                            return index === i
                              ? {
                                  ...item,
                                  like: true,
                                }
                              : item;
                          });

                          setMovieBoxOffice(likePushList);
                        }
                      })
                      .catch((err) => {});
                  }
                }}
              >
                <FavoriteBorderIcon sx={{ fill: "var(--main1)" }} />
              </span>
            )}
          </div>
          <div className="like-count" style={{ color: "var(--main1)" }}>
            {/* {likeCount} */}
          </div>
        </div>
        <div className="booking-zone">
          <button
            style={{ width: "165px", marginLeft: "5px" }}
            className="booking-btn"
          >
            예매하기
          </button>
        </div>
      </div>
    </li>
  );
};

const MainMovieSchedul = () => {
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
      dateAdd: 0,
    },
    {
      className: "main-schedule-day-map",
      dateAdd: 1,
    },
    {
      className: "main-schedule-day-map",
      dateAdd: 2,
    },
    {
      className: "main-schedule-day-map",
      dateAdd: 3,
    },
    {
      className: "main-schedule-day-map",
      dateAdd: 4,
    },
    {
      className: "main-schedule-day-map",
      dateAdd: 5,
    },
    {
      className: "main-schedule-day-map",
      dateAdd: 6,
    },
    {
      className: "main-schedule-day-map",
      dateAdd: 7,
    },
  ]);

  const movieTimeBtn = useRef();
  const [movieTimeShow, setMovieTimeShow] = useState(true);
  //기본 세팅값
  //movieTimeBtn.current.innerText.add = "-";
  const [dateSchedule, setDateSchedule] = useState(0);
  //스케줄 가져오기
  const [schedul, setSchedule] = useState([]);
  const backServer = import.meta.env.VITE_BACK_SERVER;
  useEffect(() => {
    axios
      .get(`${backServer}/movie/schedule?dateSchedule=${dateSchedule}`)
      .then((res) => {
        setSchedule(res.data.movieSchedule);
      })
      .catch((err) => {
        console.log(err.data);
      });
  }, [dateSchedule]);

  return (
    <div>
      <div className="main-schedule-day-wrap">
        {scheduleDate &&
          scheduleDate.map((date, index) => {
            return (
              <div
                onClick={() => {
                  const newDateCss = [...dateCss];
                  {
                    newDateCss.map((css, i) => {
                      if (css.dateAdd != dateCss[index].dateAdd) {
                        newDateCss[i].className = "main-schedule-day-map";
                      } else if (css.dateAdd == dateCss[index].dateAdd) {
                        newDateCss[i].className =
                          "main-schedule-day-map main-schedule-day-map-click";
                      }
                    });
                  }
                  setDateCss(newDateCss);
                  setDateSchedule(dateCss[index].dateAdd);
                }}
                className={dateCss[index].className}
                key={"main-schedul-date" + index}
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
                      <p style={{ fontSize: "19px", fontWeight: "600" }}>
                        {date.oneScheduleDate.date}
                      </p>
                    ) : (
                      <p style={{ fontSize: "19px", fontWeight: "600" }}>
                        {date.oneScheduleDate.month}.{date.oneScheduleDate.date}
                      </p>
                    )}
                  </li>
                </ul>
              </div>
            );
          })}
      </div>
      <div className="main-schedul-movie-list">
        {schedul &&
          schedul.map((schedul, index) => {
            /*단위기간 날짜 확인 위해 타입 변경 ---백 쿼리에서 확인 해줌 
            const scheduleOpenString = schedul.schedules.scheduleOpen;
            const scheduleOpenDate = new Date(scheduleOpenString);
            const scheduleCloseString = schedul.schedules.scheduleClose;
            const scheduleCloseDate = new Date(scheduleCloseString);
            */
            console.log(schedul);
            return (
              <div key={"main-schedul-movie" + index}>
                <div className="main-schedul-movie-box">
                  <div className="main-schedul-movie-title-wrap">
                    <div>
                      <div className="main-schedul-movie-age">
                        <img
                          src={
                            schedul.movieGrade == 1
                              ? "/image/ALL.png"
                              : schedul.movieGrade == 2
                              ? "/image/12.png"
                              : schedul.movieGrade == 3
                              ? "/image/15.png"
                              : "/image/19.png"
                          }
                          className="grade-img"
                        />
                      </div>

                      <div className="main-schedul-movie-title">
                        <Link to={`/movie/detail/${schedul.movieNo}`}>
                          <p style={{ fontSize: "18.72px", fontWeight: "600" }}>
                            {schedul.movieTitle}
                          </p>
                        </Link>
                      </div>
                    </div>
                    <div
                      ref={movieTimeBtn}
                      className="main-schedul-movie-show"
                      style={{ float: "right" }}
                      onClick={() => {
                        if (movieTimeShow) {
                          movieTimeBtn.current.innerText = "+";
                          setMovieTimeShow(false);
                        } else {
                          movieTimeBtn.current.innerText = "ㅡ";
                          setMovieTimeShow(true);
                        }
                      }}
                    >
                      ㅡ
                    </div>
                  </div>
                  {!movieTimeShow ? (
                    <></>
                  ) : (
                    <>
                      {Object.entries(schedul.schedules).map(
                        //Object.entries : (리스트)객체를 object타입으로 바꿔서 map 돌림
                        ([g, timeList]) => {
                          return (
                            <div key={index + g + timeList}>
                              <div className="main-schedul-movie-time-wrap">
                                <div className="main-schedul-movie-time-type-wrap">
                                  <div className="main-schedul-movie-time-type">
                                    {g}(
                                    {g == "1관"
                                      ? "2D"
                                      : g == "2관"
                                      ? "3D"
                                      : g == "3관" && "4DX"}
                                    )
                                  </div>
                                  <div className="main-schedul-movie-time-box-wrap">
                                    {timeList.map((s, i) => {
                                      //상영시작시간 시,분 만 나오도록
                                      console.log(s);
                                      const scheduleTimeStartDate = new Date(
                                        s.scheduleTimeStart
                                      );
                                      const scheduleTimeStartHours =
                                        scheduleTimeStartDate.getHours();
                                      const scheduleTimeStarMinutes =
                                        scheduleTimeStartDate.getMinutes();
                                      const scheduleTimeStart =
                                        ("0" + scheduleTimeStartHours).slice(
                                          -2
                                        ) +
                                        ":" +
                                        ("0" + scheduleTimeStarMinutes).slice(
                                          -2
                                        );
                                      //지난 시간 스케줄 화면 삭제 확인용(일,시,분 => 분으로 환산 예정(하루=1440분))-------백 쿼리에서 확인 함
                                      //const todayScheduleTime =
                                      //scheduleTimeStartHours * 60 + scheduleTimeStarMinutes;
                                      //const nowTime = today.getHours() * 60 + today.getMinutes();
                                      //console.log(schedul.movieGrade);

                                      return (
                                        <div key={index - i}>
                                          <div className="main-schedul-movie-time-box">
                                            <div className="main-schedul-movie-time-content">
                                              {scheduleTimeStart}
                                            </div>
                                            <div className="main-schedul-movie-time-seat">
                                              <span
                                                style={{
                                                  color: "var(--main10)",
                                                }}
                                              >
                                                {s.seatTotal - s.gallerySeat}
                                              </span>
                                              <span>/</span>
                                              <span>{s.seatTotal}</span>
                                            </div>
                                          </div>
                                        </div>
                                      );
                                    })}
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        }
                      )}
                    </>
                  )}
                </div>
              </div>
            );
          })}
        <hr></hr>
      </div>
    </div>
  );
};

export default Main;
