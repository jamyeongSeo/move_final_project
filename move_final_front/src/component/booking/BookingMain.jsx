import { useEffect, useRef, useState } from "react";
import "./booking.css";
import axios from "axios";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import BookingSchedule from "./BookingSchedule";
import { useRecoilValue } from "recoil";
import { isLoginState } from "../utils/RecoilData";

const BookingMain = () => {
  const [bookingMovieList, setBookingMovieList] = useState([]);
  const [bookingSchedule, setBookingSchedule] = useState([]);
  const [movieDate, setMovieDate] = useState("");
  const [movieNo, setMovieNo] = useState(-1);
  const [movieSelect, setMovieSelect] = useState(0);
  const movieContent = useRef();
  const movieContentSelect = useRef();
  const isLogin = useRecoilValue(isLoginState);
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACK_SERVER}/booking/list`)
      .then((res) => {
        setBookingMovieList(res.data.bookingMovieList);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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
                            className="booking-movie-content"
                            onClick={() => {
                              console.log(movieNo);
                              console.log(movieDate);
                              setMovieNo(bookingMovie.movieNo);

                              axios
                                .get(
                                  `${
                                    import.meta.env.VITE_BACK_SERVER
                                  }/booking/schedule?movieNo=${
                                    bookingMovie.movieNo
                                  }&movieDate=${movieDate}`
                                )
                                .then((res) => {
                                  console.log(res);

                                  setBookingSchedule(res.data.oneSchedule);
                                })

                                .catch((err) => {
                                  console.log(err);
                                });
                            }}
                            ref={movieContent}
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
                          console.log(typeof one.scheduleTimeStart);
                          return (
                            <div
                              key={"booking-schedule-" + index}
                              className="booking-schedule-zone"
                            >
                              <div className="booking-schedule-box">
                                <div>{one.movieTitle}</div>
                                <div>
                                  {one.screenNo === 1
                                    ? "1관"
                                    : one.screenNo === 2
                                    ? "2관"
                                    : "3관"}
                                </div>
                                <div>{one.scheduleTimeStart.slice(0, 16)}</div>
                                <div>{one.scheduleTimeEnd.slice(0, 15)}</div>
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
