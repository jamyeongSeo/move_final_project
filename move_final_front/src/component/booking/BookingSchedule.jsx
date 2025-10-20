import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import "./booking.css";
import { useEffect, useState } from "react";

const BookingSchedule = () => {
  const [bookingDate, setBookingDate] = useState(0);
  const [bookingSchedule, setBookingSchedule] = useState([]);

  const date = new Date();
  const today = new Date(date.setDate(date.getDate() + bookingDate));
  const currentDay = new Date();
  const scheduleList = [];
  scheduleList.push(currentDay);

  for (let i = 0; scheduleList.length < 7; i++) {
    const nextDay = new Date(today.setDate(today.getDate() + 1));
    scheduleList.push(nextDay);
  }
  //다음날로 바꾸고
  console.log(scheduleList);
  return (
    <ul className="schedule-select-box">
      <li className="side-back-arrow-box">
        <div>
          <span
            onClick={() => {
              setBookingDate(bookingDate - 7);
            }}
          >
            <ArrowBackIosNewIcon />
          </span>
        </div>
      </li>
      {scheduleList.map((schedule, index) => {
        return (
          <li key={"one-schedule-" + index} className="one-schedule">
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
                {schedule.getMonth() + 1}
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
                {schedule.getDate()}
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
          <span
            onClick={() => {
              setBookingDate(bookingDate + 7);
            }}
          >
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
