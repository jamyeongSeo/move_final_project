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

const PayPage = () => {
  const location = useLocation();
  const bookingInfo = location.state.bookingInfo;
  const movieNo = bookingInfo.movieNo;
  const scheduleDate = new Date(bookingInfo.scheduleTimeStart);
  const scheduleEnd = new Date(bookingInfo.scheduleTimeEnd);

  const [movie, setMovie] = useState(null);
  const [memberId, setMemberId] = useRecoilState(loginIdState);
  const [couponList, setCouponList] = useState([]);
  const [coupon, setCoupon] = useState(0);
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
  }, []);
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
                  {String(scheduleDate.getMonth()).padStart(2, "0") +
                    "-" +
                    String(scheduleDate.getDate()).padStart(2, "0")}
                  &nbsp;
                  {scheduleDate.getDay() === 1
                    ? "(월)"
                    : scheduleDate.getDay() === 2
                    ? "(화)"
                    : scheduleDate.getDay() === 3
                    ? "(수)"
                    : scheduleDate.getDay() === 4
                    ? "(목)"
                    : scheduleDate.getDay() === 5
                    ? "(금)"
                    : scheduleDate.getDay() === 6
                    ? "(토)"
                    : "(일)"}
                  &nbsp;
                  {scheduleDate.getHours() + " : " + scheduleDate.getMinutes()}
                  {" ~ " +
                    scheduleEnd.getHours() +
                    " : " +
                    scheduleEnd.getMinutes()}
                </div>
                <div className="screen-title">
                  {bookingInfo.screenNo === 1
                    ? "1관"
                    : bookingInfo.screenNo === 2
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
              <div>
                {"결제 금액 : " +
                  bookingInfo.totalPrice.toLocaleString() +
                  "원"}
              </div>
            </div>

            <div className="coupon-select-box">
              <CouponSelect
                couponList={couponList}
                setCoupon={setCoupon}
                coupon={coupon}
              />
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
  const coupon = props.coupon;
  const couponSelect = (e) => {
    setCoupon(e.target.value);
  };
  return (
    <Box sx={{ minWidth: 120 }} className="booking-coupon-box">
      <FormControl fullWidth>
        <InputLabel id="coupon-label">쿠폰 선택</InputLabel>
        <Select
          labelId="coupon-label"
          id="demo-simple-select"
          value={coupon}
          onChange={couponSelect}
        >
          <MenuItem value={-1}>선택하지 않음</MenuItem>
          {couponList.map((coupon, index) => {
            return (
              <MenuItem key={"coupon-" + index} value={coupon.couponName}>
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
