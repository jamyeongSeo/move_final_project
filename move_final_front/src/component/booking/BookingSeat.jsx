import { useEffect, useRef, useState } from "react";
import "./booking.css";
import axios from "axios";
import { useParams } from "react-router-dom";

const BookingSeat = () => {
  const params = useParams();
  const screenNo = params.screenNo;
  const [seatList, setSeatList] = useState([]);
  const [rowList, setRowList] = useState([]);
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACK_SERVER}/booking/getSeat/${screenNo}`)
      .then((res) => {
        console.log(res);
        setSeatList(res.data.rowList);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div>
      <div className="content">
        <div className="content-wrap">
          <div className="screen-title"></div>
          <div className="screen-select-box">
            <section className="seat-select-box">
              <div className="row-box">
                {seatList.map((seat, index) => {
                  return (
                    <div key={"row-" + seat.seatRow} className="seat-row">
                      {seat.seatRow}
                    </div>
                  );
                })}
              </div>
              <div className="seat-box">
                <div className="screen-box">Screen</div>
              </div>
            </section>
            <section className="seat-amount-box"></section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingSeat;
