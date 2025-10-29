import { useLocation } from "react-router-dom";
import "./booking.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRecoilState } from "recoil";
import { loginIdState } from "../utils/RecoilData";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { PortOneClient } from "@portone/server-sdk";

const PayPage = () => {
  const location = useLocation();
  const bookingInfo = location.state.bookingInfo;
  const movieNo = bookingInfo.movieNo;
  const scheduleDate = bookingInfo.scheduleTimeStart;
  const scheduleEnd = bookingInfo.scheduleTimeEnd;
  const totalPrice = bookingInfo.totalPrice;
  const movieDate = bookingInfo.movieDate;
  const [payPrice, setPayPrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [movie, setMovie] = useState(null);
  const [memberId, setMemberId] = useRecoilState(loginIdState);
  const [couponList, setCouponList] = useState([]);
  const [coupon, setCoupon] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const [member, setMember] = useState(null);

  useEffect(() => {
    axios
      .get(
        `${
          import.meta.env.VITE_BACK_SERVER
        }/booking/getMovie?movieNo=${movieNo}`
      )
      .then((res) => {
        console.log(res);
        setMovie(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [refresh]);
  useEffect(() => {
    axios
      .get(
        `${
          import.meta.env.VITE_BACK_SERVER
        }/booking/getCoupon?memberId=${memberId}`
      )
      .then((res) => {
        console.log(res);
        setCouponList(res.data.couponList);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  useEffect(() => {
    setPayPrice(totalPrice - coupon);
    if (totalPrice - coupon < 0) {
      setPayPrice(0);
    }
  }, [coupon]);
  useEffect(() => {
    axios
      .get(
        `${
          import.meta.env.VITE_BACK_SERVER
        }/member/selectMember?memberId=${memberId}`
      )
      .then((res) => {
        console.log(res);
        setMember(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  console.log(movie);
  console.log(member);
  return movie !== null ? (
    <div className="content-wrap">
      <div className="pay-content">
        <div className="pay-total-info">
          <section className="pay-book-info">
            <div className="book-page-title">예매 정보</div>
            <div className="book-info-wrap">
              <div className="thumb-box">
                <img src={movie.movieThumb} className="book-movie-thumb" />
              </div>
              <div className="book-info-detail">
                <div className="pay-movie-title">{movie.movieTitle}</div>
                <div className="pay-movie-schedule">
                  {movieDate.getMonth() + 1 + "-" + movieDate.getDate()}
                  &nbsp;
                  {movieDate.getDay() === 1
                    ? "(월)"
                    : movieDate.getDay() === 2
                    ? "(화)"
                    : movieDate.getDay() === 3
                    ? "(수)"
                    : movieDate.getDay() === 4
                    ? "(목)"
                    : movieDate.getDay() === 5
                    ? "(금)"
                    : movieDate.getDay() === 6
                    ? "(토)"
                    : "(일)"}
                  &nbsp;
                  <br />
                  {scheduleDate}
                  {" ~ " + scheduleEnd}
                </div>
                <div className="screen-title">
                  {bookingInfo.screenNo === "1"
                    ? "1관"
                    : bookingInfo.screenNo === "2"
                    ? "2관"
                    : "3관"}
                </div>
                <div className="seat-title">
                  <span>좌석 : </span>
                  {bookingInfo.selectSeatList.map((seat, index) => {
                    return bookingInfo.selectSeatList.length !== index + 1 ? (
                      <span key={"booking-seat"}>{seat},</span>
                    ) : (
                      <span key={"bookling-seat-end"}>{seat}</span>
                    );
                  })}
                </div>
              </div>
            </div>
          </section>
          <section className="pay-price-info">
            <div className="book-page-title">결제 정보</div>
            <div className="book-amount-info">
              {bookingInfo.adultCount !== 0 && (
                <div>{"성인 : " + bookingInfo.adultCount + "명"}</div>
              )}

              {bookingInfo.kidCount !== 0 && (
                <div>{"어린이 : " + bookingInfo.kidCount + "명"}</div>
              )}
            </div>
            <div className="book-price-info">
              <div>{"결제 금액 : " + totalPrice.toLocaleString() + "원"}</div>
            </div>

            <div className="coupon-select-box">
              {
                <CouponSelect
                  couponList={couponList}
                  setCoupon={setCoupon}
                  coupon={coupon}
                  totalPrice={totalPrice}
                  setPayPrice={setPayPrice}
                  setDiscount={setDiscount}
                />
              }
            </div>
            <div className="pay-price-box">
              {"최종 결제 금액 : " + payPrice.toLocaleString() + "원"}
            </div>
            <div className="btn-wrap">
              <button
                className="pay-btn"
                onClick={() => {
                  const portOne = new PortOne();
                }}
              >
                결제하기
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  ) : (
    <div></div>
  );
};

const CouponSelect = (props) => {
  const couponList = props.couponList;
  const setCoupon = props.setCoupon;
  const totalPrice = props.totalPrice;
  const coupon = props.coupon;
  const setPayPrice = props.setPayPrice;

  const couponSelect = (e) => {
    setCoupon(e.target.value);
  };
  return (
    <Box sx={{ minWidth: 120 }} className="booking-coupon-box">
      <FormControl fullWidth>
        <InputLabel id="coupon-label">쿠폰 선택</InputLabel>
        <Select
          labelId="coupon-label"
          id="coupon-select"
          value={coupon}
          onChange={couponSelect}
        >
          <MenuItem value={0}>선택하지 않음</MenuItem>
          {couponList.map((coupon, index) => {
            return (
              <MenuItem key={"coupon-" + index} value={coupon.couponDisscount}>
                {coupon.couponName}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </Box>
  );
};
export default PayPage;
