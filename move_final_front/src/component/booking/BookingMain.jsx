import { useEffect, useState } from "react";
import "./booking.css";
import axios from "axios";
const BookingMain = () => {
  const [bookingMovieList, setBookingMovieList] = useState([]);
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACK_SERVER}/booking/list`)
      .then((res) => {
        setMovie(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  console.log(bookingMovieList);
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
              <div className="booking-date-select"></div>
              <div className="booking-movie-select">
                <div className="booking-category-title">
                  <h3>영화</h3>
                </div>
                <div className="booking-movie-list">{}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingMain;
