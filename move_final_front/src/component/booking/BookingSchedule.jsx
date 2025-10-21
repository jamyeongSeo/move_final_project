import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import "./booking.css";
import { useEffect, useState } from "react";

const BookingSchedule = (props) => {
  const setSelectedDate = props.setSelectedDate;
  const [bookingSchedule, setBookingSchedule] = useState([]);

  const [scheduleList, setScheduleList] = useState([]);
  const date = new Date();

  const [bookingDate, setBookingDate] = useState(new Date(date));
  useEffect(() => {
    scheduleList.length = 0;
    for (let i = 0; i < 7; i++) {
      const nextDay = new Date(bookingDate);
      nextDay.setDate(bookingDate.getDate() + i);
      scheduleList.push(nextDay);
    }
    setScheduleList(scheduleList);
  }, [bookingDate]);

  return (
    <ul className="schedule-select-box">
      <li className="side-back-arrow-box">
        <div>
          <span
            onClick={() => {
              const prevWeek = new Date(bookingDate);
              prevWeek.setDate(bookingDate.getDate() - 7);
              setBookingDate(prevWeek);
            }}
          >
            <ArrowBackIosNewIcon />
          </span>
        </div>
      </li>
      {scheduleList.map((schedule, index) => {
        return (
          <li
            key={"one-schedule-" + index}
            className="one-schedule"
            onClick={() => {
              setSelectedDate(
                "" + (schedule.getMonth() + 1) + schedule.getDate()
              );
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
              const nextWeek = new Date(bookingDate);
              nextWeek.setDate(bookingDate.getDate() + 7);
              setBookingDate(nextWeek);
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
