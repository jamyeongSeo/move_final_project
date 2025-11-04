import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import "./booking.css";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const BookingSchedule = (props) => {
  const setBookingSchedule = props.setBookingSchedule;
  const movieNo = props.movieNo;
  const movieDate = props.movieDate;
  const setMovieDate = props.setMovieDate;
  const [scheduleList, setScheduleList] = useState([]);
  const date = new Date();
  const [classList, setClassList] = useState("one-schedule");
  const [refresh, setRefresh] = useState(false);
  const [bookingDate, setBookingDate] = useState(new Date(date));
  const [clickState, setClickState] = useState(-1);
  const setMovieSelect = props.setMovieSelect;
  const datebox = document.querySelectorAll("one-schedule");
  useEffect(() => {
    scheduleList.length = 0;

    for (let i = 0; i < 7; i++) {
      const nextDay = new Date(bookingDate);
      nextDay.setDate(bookingDate.getDate() + i);
      scheduleList.push(nextDay);
    }
    setScheduleList(scheduleList);
    setRefresh(false);
    if (movieDate != null) {
      axios
        .get(
          `${
            import.meta.env.VITE_BACK_SERVER
          }/booking/schedule?movieNo=${movieNo}&movieDate=${movieDate} `
        )
        .then((res) => {
          console.log(res);
          setBookingSchedule(res.data.oneSchedule);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [bookingDate, movieDate, refresh]);
  const prevWeek = () => {
    const currentDate = new Date();
    if (bookingDate.getDate() === currentDate.getDate()) {
      Swal.fire({
        title: "타임머신 미개발",
        text: "과거의 시간으로는 돌아갈 수 없습니다.",
        icon: "warning",
        confirmButtonText: "확인",
      });
      return;
    }
    const prevWeek = new Date(bookingDate);

    prevWeek.setDate(bookingDate.getDate() - 7);
    setBookingDate(prevWeek);
    setRefresh(true);
  };
  const nextWeek = (e) => {
    const nextWeek = new Date(bookingDate);
    nextWeek.setDate(bookingDate.getDate() + 7);
    setBookingDate(nextWeek);
    setRefresh(true);
  };
  return (
    <ul className="schedule-select-box">
      <li className="side-back-arrow-box">
        <div>
          <span onClick={prevWeek}>
            <ArrowBackIosNewIcon />
          </span>
        </div>
      </li>
      {scheduleList.map((schedule, index) => {
        return (
          <li
            key={"one-schedule-" + index}
            className={
              clickState === index ? "one-schedule select" : "one-schedule"
            }
            onClick={(e) => {
              setClassList("one-schedule");
              setClickState(index);

              const currentYear = schedule.getFullYear();
              const currentMonth = String(schedule.getMonth() + 1).padStart(
                2,
                "0"
              );
              const currentDay = String(schedule.getDate()).padStart(2, "0");
              const currentHour = String(schedule.getHours()).padStart(2, "0");
              const currentMinutes = String(schedule.getMinutes()).padStart(
                2,
                "0"
              );
              const currentDate =
                currentYear + "-" + currentMonth + "-" + currentDay;

              setMovieDate(currentDate);
              setMovieSelect(-1);
              axios
                .get(
                  `${
                    import.meta.env.VITE_BACK_SERVER
                  }/booking/schedule?movieNo=${movieNo}&movieDate=${currentDate} `
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
            <div className="schedule-date-box">
              <div
                className={
                  schedule.getDay() === 6
                    ? "schedule-month-sat"
                    : schedule.getDay() === 0
                    ? "schedule-month-sun"
                    : "schedule-month"
                }
              >
                {String(schedule.getMonth() + 1).padStart(2, "0")}
              </div>
              <span
                className={
                  schedule.getDay() === 6
                    ? "schedule-sat"
                    : schedule.getDay() === 0
                    ? "schedule-sun"
                    : "schedule-day"
                }
              >
                ·
              </span>
              <div
                className={
                  schedule.getDay() === 6
                    ? "schedule-date-sat"
                    : schedule.getDay() === 0
                    ? "schedule-date-sun"
                    : "schedule-date"
                }
              >
                {String(schedule.getDate()).padStart(2, "0")}
              </div>
            </div>

            <div
              className={
                schedule.getDay() === 6
                  ? "schedule-sat"
                  : schedule.getDay() === 0
                  ? "schedule-sun"
                  : "schedule-day"
              }
            >
              {schedule.getDay() === 1
                ? "월"
                : schedule.getDay() === 2
                ? "화"
                : schedule.getDay() === 3
                ? "수"
                : schedule.getDay() === 4
                ? "목"
                : schedule.getDay() === 5
                ? "금"
                : schedule.getDay() === 6
                ? "토"
                : "일"}
            </div>
          </li>
        );
      })}
      <li className="side-foward-arrow-box">
        <div>
          <span onClick={nextWeek}>
            <ArrowForwardIosIcon />
          </span>
        </div>
      </li>
    </ul>
  );

  /*
  useEffect(() => {
    axios
      .get(
        `${
          import.meta.env.VITE_BACK_SERVER
        }/booking/date?bookingDate=${bookingDate}`
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  */
};

export default BookingSchedule;
