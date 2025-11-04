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
  const scheduleNo = location.state.scheduleNo;
  const params = useParams();
  const movieNo = params.movieNo;
  const movieDate = location.state.movieDate;
  const screenNo = params.screenNo;
  const [seatList, setSeatList] = useState([]);
  const [rowList, setRowList] = useState([]);
  const [adultCount, setAdultCount] = useState(0);
  const [kidCount, setKidCount] = useState(0);
  const totalCount = adultCount + kidCount;
  let selectCount = totalCount;
  let totalPrice = 0;
  const [selectSeat, setSelectSeat] = useState(Array(6).fill(null));
  const [count, setCount] = useState(0);
  const [selectSeatList, setSelectSeatList] = useState([]);
  const newMovieDate = new Date(location.state.movieDate);
  console.log(movieNo);
  const navigate = useNavigate();
  const [refresh, setRefresh] = useState(false);
  const [bookSeatRow, setBookSeatRow] = useState([]);
  const [bookSeatColumn, setBookSeatColumn] = useState([]);
  const [bookedSeatList, setBookedSeatList] = useState([]);
  const [payInfo, setPayInfo] = useState({
    movieNo: movieNo,
    screenNo: screenNo,
    totalPrice: 0,
    selectSeatList: [],
    scheduleTimeStart: location.state.scheduleTimeStart,
    scheduleTimeEnd: location.state.scheduleTimeEnd,
    movieDate: newMovieDate,
    bookSeatRow: [],
    bookSeatColumn: [],
    scheduleNo: location.state.scheduleNo,
  });

  useEffect(() => {
    console.log(adultCount);
    if (adultCount === 0 && kidCount === 0) {
      return;
    }
    console.log(movieDate);
    axios
      .get(
        `${
          import.meta.env.VITE_BACK_SERVER
        }/booking/calcPrice/${movieNo}?adultCount=${adultCount}&kidCount=${kidCount}`
      )
      .then((res) => {
        setPayInfo((prev) => ({
          ...prev,
          totalPrice: res.data.totalPrice,
        }));
      })
      .catch((err) => {
        console.log(err);
      });
  }, [kidCount, adultCount, movieNo]);
  console.log(payInfo.totalPrice);
  useEffect(() => {
    axios
      .get(
        `${
          import.meta.env.VITE_BACK_SERVER
        }/booking/getSeat/${screenNo}/${scheduleNo}?movieDate=${movieDate}`
      )
      .then((res) => {
        setRowList(res.data.rowList);
        setSeatList(res.data.seatList);
        setBookedSeatList(res.data.bookedSeatList);
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
                                  : selectSeat.includes(seatName) &&
                                    oneSeat.seatColumn > 14
                                  ? "one-seat-box-double filled"
                                  : selectCount === 0 && oneSeat.seatColumn > 14
                                  ? "one-seat-box-double " +
                                    " unselected " +
                                    (i + 1)
                                  : selectCount === 0 ||
                                    bookedSeatList.includes(seatName)
                                  ? "one-seat-box" + " unselected " + (i + 1)
                                  : selectCount !== 0 && oneSeat.seatColumn > 14
                                  ? "one-seat-box-double" +
                                    oneSeat.seatRow +
                                    (i + 1)
                                  : "one-seat-box" + oneSeat.seatRow + (i + 1)
                              }
                              id={selectCount !== 0 && i === 14 && "couple"}
                              onClick={() => {
                                if (
                                  !selectSeatList.includes(seatName) &&
                                  selectSeatList.length === selectCount
                                ) {
                                  Swal.fire({
                                    title: "예매 개수 초과",
                                    html: "선택한 예매 수를 초과합니다. <br/> 예매 수를 확인해주세요.",
                                    icon: "warning",
                                    confirmButtonText: "확인",
                                  });
                                }
                                if (bookedSeatList.includes(seatName)) {
                                  return;
                                }
                                if (
                                  count <= 6 &&
                                  selectCount > count &&
                                  !selectSeat.includes(seatName)
                                ) {
                                  const newSelectSeat = [...selectSeat];
                                  const nullIndex = newSelectSeat.findIndex(
                                    (seat) => seat === null
                                  );
                                  const targetIndex =
                                    nullIndex !== -1 ? nullIndex : count;
                                  newSelectSeat[targetIndex] = seatName;
                                  setSelectSeat(newSelectSeat);

                                  const bookingSelectSeat =
                                    newSelectSeat.filter((s, i) => s !== null);
                                  setSelectSeatList(bookingSelectSeat);
                                  const newRow = [
                                    ...bookSeatRow,
                                    oneSeat.seatRow,
                                  ];
                                  const newColumn = [
                                    ...bookSeatColumn,
                                    oneSeat.seatColumn,
                                  ];
                                  setBookSeatRow(newRow);
                                  setBookSeatColumn(newColumn);
                                  const newPayInfo = {
                                    ...payInfo,
                                    bookSeatColumn: bookSeatColumn,
                                    bookSeatRow: bookSeatRow,
                                    selectSeatList: bookingSelectSeat,
                                  };
                                  setPayInfo(newPayInfo);
                                  setCount(count + 1);
                                } else if (selectSeat.includes(seatName)) {
                                  const removeSelectSeat = selectSeat.map(
                                    (removeSeat, index) =>
                                      removeSeat !== seatName
                                        ? removeSeat
                                        : null
                                  );
                                  const bookingSelectSeat =
                                    removeSelectSeat.filter((s) => s !== null);
                                  const newBookSeatRow = [];
                                  const newBookSeatColumn = [];

                                  // bookingSelectSeat에 있는 각 좌석 이름에 대해 seatList를 조회하여 Row/Column 정보를 찾음
                                  for (const name of bookingSelectSeat) {
                                    const seat = seatList.find(
                                      (s) => s.seatName === name
                                    );
                                    if (seat) {
                                      newBookSeatRow.push(seat.seatRow);
                                      newBookSeatColumn.push(seat.seatColumn);
                                    }
                                  }
                                  setSelectSeat(removeSelectSeat);

                                  setSelectSeatList(bookingSelectSeat); // 최종 선택 리스트 업데이트
                                  setBookSeatRow(newBookSeatRow);
                                  setBookSeatColumn(newBookSeatColumn);
                                  setCount(count - 1);
                                  const newPayInfo = {
                                    ...payInfo,
                                    bookSeatRow: newBookSeatRow, // 새로 구성된 행 정보 사용
                                    bookSeatColumn: newBookSeatColumn, // 새로 구성된 열 정보 사용
                                    selectSeatList: bookingSelectSeat, // 새로 필터링된 목록 사용
                                  };
                                  setPayInfo(newPayInfo);
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
                  {payInfo.totalPrice !== 0
                    ? payInfo.totalPrice.toLocaleString() + "원"
                    : "0원"}
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
                        state: {
                          payInfo: payInfo,
                          adultCount: adultCount,
                          kidCount: kidCount,
                        },
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
