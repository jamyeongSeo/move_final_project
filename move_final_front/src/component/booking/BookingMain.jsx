import { useEffect, useRef, useState } from "react";
import "./booking.css";
import axios from "axios";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import BookingSchedule from "./BookingSchedule";

const BookingMain = () => {
  const [bookingMovieList, setBookingMovieList] = useState([]);
  const [bookingSchedule, setBookingSchedule] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [movieDate, setMovieDate] = useState("");
  console.log(bookingMovieList);
  console.log(selectedDate);
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
                <BookingSchedule setSelectedDate={setSelectedDate} />
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
                                  bookingSchedule.map((schedule, index) => {
                                    const scheduleStart = new Date(
                                      schedule.scheduleTimeStart
                                    );
                                    setMovieDate(
                                      "" +
                                        (scheduleStart.getMonth() + 1) +
                                        scheduleStart.getDate()
                                    );
                                    console.log(movieDate);
                                  });
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
                              className="booking-schedule-zone"
                            >
                              <div className="booking-schedule-box">
                                <div>{one.screenNo}</div>
                                <div>{one.scheduleTimeStart}</div>
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
