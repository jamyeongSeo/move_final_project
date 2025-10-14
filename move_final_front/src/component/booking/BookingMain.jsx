import { useEffect, useState } from "react";
import "./booking.css";
import axios from "axios";
const BookingMain = () => {
  const [movie, setMovie] = useState([]);
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACK_SERVER}/booking/list`)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className="content-wrap">
      <div>
        <div className="booking-all-wrap">
          <div className="page-title">
            <h2>예매하기</h2>
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
            <div className="booking-content-box"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingMain;
