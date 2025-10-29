import { useEffect, useRef, useState } from "react";
import "./booking.css";
import axios from "axios";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import EventSeatIcon from "@mui/icons-material/EventSeat";
import { EventSeat } from "@mui/icons-material";
import Swal from "sweetalert2";
const BookingSeat = () => {
  const location = useLocation();
  const params = useParams();
  const movieNo = params.movieNo;
  const screenNo = params.screenNo;
  const [seatList, setSeatList] = useState([]);
  const [rowList, setRowList] = useState([]);
  const [adultCount, setAdultCount] = useState(0);
  const [kidCount, setKidCount] = useState(0);
  const totalCount = adultCount + kidCount;
  const selectCount = totalCount;
  const [selectSeat, setSelectSeat] = useState(Array(6).fill(null));
  const [count, setCount] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [selectSeatList, setSelectSeatList] = useState([]);
  const showPrice = totalPrice.toLocaleString();
  const navigate = useNavigate();
  const bookingInfo = {
    movieNo: movieNo,
    screenNo: screenNo,
    totalPrice: totalPrice,
    adultCount: adultCount,
    kidCount: kidCount,
    selectSeatList: selectSeatList,
    scheduleTimeStart: location.state.scheduleTimeStart,
    scheduleTimeEnd: location.state.scheduleTimeEnd,
    movieDate: location.state.movieDate,
  };

  useEffect(() => {
    axios
      .get(
        `${
          import.meta.env.VITE_BACK_SERVER
        }/booking/calcPrice/${movieNo}?adultCount=${adultCount}&kidCount=${kidCount}`
      )
      .then((res) => {
        console.log(res);
        setTotalPrice(res.data.totalPrice);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [kidCount, adultCount]);

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
                          const seatName = oneSeat.seatRow + oneSeat.seatColumn;
                          return (
                            <div
                              key={"one-seat-box" + i}
                              className={
                                selectSeat.includes(seatName)
                                  ? "one-seat-box filled"
                                  : selectCount === 0 &&
                                    oneSeat.seatColumn >= 15
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
                              onClick={() => {
                                if (
                                  count <= 6 &&
                                  selectCount > count &&
                                  !selectSeat.includes(seatName)
                                ) {
                                  const newSelectSeat = [...selectSeat];
                                  newSelectSeat[count] = seatName;
                                  setSelectSeat(newSelectSeat);
                                  setSelectSeatList(
                                    newSelectSeat.filter((s, i) => s !== null)
                                  );

                                  setCount(count + 1);
                                  console.log(selectSeatList);
                                } else if (selectSeat.includes(seatName)) {
                                  const removeSelectSeat = selectSeat.map(
                                    (removeSeat, index) =>
                                      removeSeat !== seatName
                                        ? removeSeat
                                        : null
                                  );
                                  setSelectSeat(removeSelectSeat);
                                  setCount(count - 1);
                                }
                              }}
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
                <div className="price-count">
                  {totalPrice !== undefined ? showPrice + "원" : "0원"}
                </div>
                <div className="adult-amount">
                  <span className="amount-title">성인</span>
                  <div className="btn-box">
                    <button
                      className="minus-button"
                      onClick={() => {
                        if (adultCount !== 0) {
                          setAdultCount(adultCount - 1);
                          const refreshSeat = [...selectSeat.fill(null)];
                          setSelectSeat(refreshSeat);
                          selectSeatList.length === 0;
                          setCount(0);
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
                          const refreshSeat = [...selectSeat.fill(null)];
                          setSelectSeat(refreshSeat);
                          selectSeatList.length === 0;
                          setCount(0);
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
                    {selectSeat.map((item, index) => {
                      return (
                        <div
                          key={"selectSeat-" + index}
                          className={
                            item === null
                              ? "show-selected-seat"
                              : "show-selected-seat filled"
                          }
                        >
                          {item}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
              <div className="btn-wrap">
                <button
                  className="pay-btn"
                  onClick={() => {
                    if (
                      selectSeatList.length === 0 ||
                      selectSeatList.length !== totalCount
                    ) {
                      Swal.fire({
                        title: "좌석 미선택",
                        html: "예매하실 좌석이 선택되지 않았습니다. <br/>좌석 선택 후 결제를 진행해주세요.",
                        icon: "warning",
                        confirmButtonText: "확인",
                      });
                    } else if (selectSeatList.length === totalCount) {
                      navigate(`/booking/pay`, {
                        state: { bookingInfo: bookingInfo },
                      });
                    }
                  }}
                >
                  결제하기
                </button>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingSeat;
