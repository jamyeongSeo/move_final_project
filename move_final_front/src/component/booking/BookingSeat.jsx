import { useEffect, useRef, useState } from "react";
import "./booking.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import EventSeatIcon from "@mui/icons-material/EventSeat";
import { EventSeat } from "@mui/icons-material";
import Swal from "sweetalert2";
const BookingSeat = () => {
  const params = useParams();
  const screenNo = params.screenNo;
  const [seatList, setSeatList] = useState([]);
  const [rowList, setRowList] = useState([]);
  const [columList, setColumnList] = useState([]);
  const oneRowList = [];
  const [adultCount, setAdultCount] = useState(0);
  const [kidCount, setKidCount] = useState(0);
  const totalCount = adultCount + kidCount;
  const selectCount = totalCount;
  const [selectSeat, setSelectSeat] = useState([]);
  selectSeat.length = selectCount;

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACK_SERVER}/booking/getSeat/${screenNo}`)
      .then((res) => {
        console.log(res.data.seatList);
        setRowList(res.data.rowList);
        setSeatList(res.data.seatList);
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
                {rowList.map((row, index) => {
                  return (
                    <div
                      key={"row-" + index}
                      className={"seat-row" + (index + 1)}
                    >
                      {row}
                    </div>
                  );
                })}
              </div>
              <div className="exit-box">
                <ExitToAppIcon />
              </div>
              <div className="seat-wrap">
                <div className="screen-box">Screen</div>
                <div className="seat-box">
                  {seatList.map((seat, index) => {
                    return (
                      <div key={"one-row-box" + index} className="one-row-box">
                        {seat.map((oneSeat, i) => {
                          return (
                            <div
                              key={"one-seat-box" + i}
                              className={
                                selectCount === 0 && oneSeat.seatColumn >= 15
                                  ? "one-seat-box-double " +
                                    " unselected " +
                                    (i + 1)
                                  : selectCount === 0
                                  ? "one-seat-box" + " unselected " + (i + 1)
                                  : selectCount !== 0 &&
                                    oneSeat.seatColumn >= 15
                                  ? "one-seat-box-double" +
                                    oneSeat.seatRow +
                                    (i + 1)
                                  : "one-seat-box" + oneSeat.seatRow + (i + 1)
                              }
                            ></div>
                          );
                        })}
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>
            <section className="seat-amount-box">
              <div className="seat-info-box">
                <div className="price-title">총 결제 금액</div>
                <div className="price-count">원</div>
                <div className="adult-amount">
                  <span className="amount-title">성인</span>
                  <div className="btn-box">
                    <button
                      className="minus-button"
                      onClick={() => {
                        if (adultCount !== 0) {
                          setAdultCount(adultCount - 1);
                        }
                      }}
                    >
                      <span>-</span>
                    </button>
                    <span className="adult-count">{adultCount}</span>
                    <button
                      className="plus-button"
                      onClick={() => {
                        if (adultCount !== 6 && totalCount !== 6) {
                          setAdultCount(adultCount + 1);
                        } else if (totalCount === 6) {
                          Swal.fire({
                            title: "예매 가능 매수 초과",
                            html: "1인당 예매 가능 매수는 6장입니다.<br/>자세한 사항은 고객센터에 문의하세요.",
                            icon: "info",
                            confirmButtonText: "확인",
                          });
                        }
                      }}
                    >
                      <span>+</span>
                    </button>
                  </div>
                </div>
                <div className="kid-amount">
                  <span className="amount-title">어린이</span>
                  <div className="btn-box">
                    <button
                      className="minus-button"
                      onClick={() => {
                        if (kidCount !== 0) {
                          setKidCount(kidCount - 1);
                        }
                      }}
                    >
                      <span>-</span>
                    </button>
                    <span className="kid-count">{kidCount}</span>
                    <button
                      className="plus-button"
                      onClick={() => {
                        if (adultCount !== 6 && totalCount !== 6) {
                          setKidCount(kidCount + 1);
                        } else if (totalCount === 6) {
                          Swal.fire({
                            title: "예매 가능 매수 초과",
                            html: "1인당 예매 가능 매수는 6장입니다. <br/> 자세한 사항은 고객센터에 문의하세요.",
                            icon: "info",
                            confirmButtonText: "확인",
                          });
                        }
                      }}
                    >
                      <span>+</span>
                    </button>
                  </div>
                </div>
                <div className="show-seat-box">
                  <div className="show-selected-group">
                    <div className="show-selected-seat"></div>
                    <div className="show-selected-seat"></div>
                  </div>
                  <div className="show-selected-group">
                    <div className="show-selected-seat"></div>
                    <div className="show-selected-seat"></div>
                  </div>
                  <div className="show-selected-group">
                    <div className="show-selected-seat"></div>
                    <div className="show-selected-seat"></div>
                  </div>
                </div>
              </div>

              <div className="btn-wrap">
                <button className="pay-btn">결제하기</button>
              </div>
            </section>
          </div>
          <div className="exit-box">
            <ExitToAppIcon />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingSeat;
