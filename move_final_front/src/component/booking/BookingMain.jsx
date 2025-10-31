import { useEffect, useRef, useState } from "react";
import "./booking.css";
import axios from "axios";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import BookingSchedule from "./BookingSchedule";
import { useRecoilState, useRecoilValue } from "recoil";
import { isLoginState, loginIdState } from "../utils/RecoilData";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import NoMemberInfo from "../member/NoMemberInfo";

const BookingMain = () => {
  const [bookingMovieList, setBookingMovieList] = useState([]);
  const [bookingSchedule, setBookingSchedule] = useState([]);
  const [movieDate, setMovieDate] = useState(null);
  const [movieNo, setMovieNo] = useState(-1);
  const [movieScheduleSelect, setmovieScheduleSelect] = useState(-1);
  const [movieSelect, setMovieSelect] = useState(-1);
  const movieContent = useRef();
  const [memberId, setMemberId] = useRecoilState(loginIdState);
  const isLogin = useRecoilValue(isLoginState);
  const [refresh, setRefresh] = useState(false);
  const [scheduleNo, setScheduleNo] = useState(0);

  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACK_SERVER}/booking/list`)
      .then((res) => {
        setBookingMovieList(res.data.bookingMovieList);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [movieScheduleSelect, movieSelect]);
  useEffect(() => {}, [refresh]);

  return (
    <div className="content-wrap">
      <div className="content">
        <div className="booking-all-wrap">
          <div className="booking-page-title">
            <h3>예매하기</h3>
          </div>

          <div className="booking-content-wrap">
            <div className="booking-content-header">
              <div className="header-design-black"></div>
              <div className="header-design-white"></div>
              <div className="header-design-black"></div>
              <div className="header-design-white"></div>
              <div className="header-design-black"></div>
              <div className="header-design-white"></div>
              <div className="header-design-black"></div>
              <div className="header-design-white"></div>
              <div className="header-design-black"></div>
              <div className="header-design-white"></div>
            </div>
            <div className="booking-content-box">
              <div className="booking-date-select">
                <BookingSchedule
                  movieNo={movieNo}
                  movieDate={movieDate}
                  setMovieDate={setMovieDate}
                  setBookingSchedule={setBookingSchedule}
                  setmovieScheduleSelect={setmovieScheduleSelect}
                  setMovieSelect={setMovieSelect}
                />
              </div>
              <div className="booking-select-wrap">
                <div className="booking-movie-select">
                  <div className="booking-movie-list-box">
                    <div className="booking-category-title">
                      <h3>영화</h3>
                    </div>
                    <ul className="booking-movie-list">
                      {bookingMovieList.map((bookingMovie, index) => {
                        return (
                          <li
                            key={"booking-movie-" + index}
                            className={
                              movieSelect === index
                                ? "booking-movie select"
                                : "booking-movie"
                            }
                            onClick={() => {
                              setMovieNo(bookingMovie.movieNo);
                              setmovieScheduleSelect(-1);
                              setMovieSelect(index);
                              axios
                                .get(
                                  `${
                                    import.meta.env.VITE_BACK_SERVER
                                  }/booking/schedule?movieNo=${
                                    bookingMovie.movieNo
                                  }`
                                )
                                .then((res) => {
                                  console.log(res);

                                  setBookingSchedule(res.data.oneSchedule);
                                })

                                .catch((err) => {
                                  console.log(err);
                                });
                            }}
                          >
                            <div className="booking-movie-grade">
                              <img
                                src={
                                  bookingMovie.movieGrade == 1
                                    ? "/image/ALL.png"
                                    : bookingMovie.movieGrade == 2
                                    ? "/image/12.png"
                                    : bookingMovie.movieGrade == 3
                                    ? "/image/15.png"
                                    : "/image/19.png"
                                }
                                className="grade-img"
                              />
                            </div>
                            <div className="booking-movie-title-box">
                              {bookingMovie.movieTitle}
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
                <div className="booking-schedule-select">
                  <div className="booking-schedule-list-box">
                    <ul className="booking-schedule-list">
                      <li className="booking-schedule-title">
                        <h3>시간</h3>
                      </li>
                      <li className="booking-schedule-content">
                        {bookingSchedule.map((one, index) => {
                          return (
                            <div
                              key={"booking-schedule-" + index}
                              className={
                                movieScheduleSelect === index
                                  ? "booking-schedule-zone.select"
                                  : "booking-schedule-zone"
                              }
                            >
                              <div
                                className="booking-schedule-box"
                                onClick={() => {
                                  const newDateString =
                                    movieDate + " " + one.scheduleTimeStart;

                                  console.log(
                                    "newDateString :" + newDateString
                                  );
                                  setmovieScheduleSelect(index);
                                  setMovieNo(one.movieNo);

                                  setRefresh(!refresh);
                                  !isLogin && navigate("/member/noMemberInfo");
                                  movieDate === null
                                    ? Swal.fire({
                                        title: "날짜 미선택",
                                        text: "예매할 날짜를 선택해주세요.",
                                        icon: "warning",
                                      })
                                    : navigate(
                                        `/booking/bookingSeat/${one.screenNo}/${one.movieNo}`,
                                        {
                                          state: {
                                            scheduleTimeStart:
                                              one.scheduleTimeStart,
                                            scheduleTimeEnd:
                                              one.scheduleTimeEnd,
                                            movieDate: newDateString,
                                            scheduleNo: one.scheduleNo,
                                          },
                                        }
                                      );
                                }}
                              >
                                <div>{one.movieTitle}</div>
                                <div>
                                  {one.screenNo === "1"
                                    ? "1관"
                                    : one.screenNo === "2"
                                    ? "2관"
                                    : "3관"}
                                </div>
                                <div>{one.scheduleTimeStart}</div>
                                <span>~</span>
                                <div>{one.scheduleTimeEnd}</div>
                              </div>
                            </div>
                          );
                        })}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingMain;
