import { useEffect, useRef } from "react";
import "./booking.css";
import axios from "axios";
import { useParams } from "react-router-dom";

const BookingSeat = () => {
  const params = useParams();
  const screenNo = params.screenNo;
  console.log(screenNo);
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACK_SERVER}/booking/getSeat/${screenNo}`)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div>
      <div className="content">
        <div className="page-title">
          <h3>좌석 선택</h3>
        </div>
        <div className="content-wrap">
          <div className="screen-title"></div>
          <div className="screen-select-box">
            <section className="seat-select-box"></section>
            <section className="seat-amount-box"></section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingSeat;
