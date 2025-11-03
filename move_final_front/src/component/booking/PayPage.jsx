import { useLocation, useNavigate } from "react-router-dom";
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

import Swal from "sweetalert2";

const PayPage = () => {
  const location = useLocation();
  const payInfo = location.state.payInfo;
  const movieNo = payInfo.movieNo;
  const [memberNo, setMemberNo] = useState(0);
  const scheduleDate = payInfo.scheduleTimeStart;
  const scheduleEnd = payInfo.scheduleTimeEnd;
  const totalPrice = payInfo.totalPrice;
  const movieDate = payInfo.movieDate;
  const bookDate = new Date(movieDate);

  const [payCount, setPayCount] = useState(0);
  const [payPrice, setPayPrice] = useState(totalPrice);
  const [discount, setDiscount] = useState(0);
  const [movie, setMovie] = useState(null);
  const [memberId, setMemberId] = useRecoilState(loginIdState);
  const [couponList, setCouponList] = useState([]);
  const [coupon, setCoupon] = useState(0);
  const [refresh, setRefresh] = useState(false);
  const [member, setMember] = useState(null);
  const [bookingInfo, setBookingInfo] = useState({
    scheduleNo: payInfo.scheduleNo,
    memberNo: 0,
    movieNo: movieNo,
    bookingDate: bookDate,
    payPrice: payPrice,
    screenNo: payInfo.screenNo,
    selectSeatList: payInfo.selectSeatList,
    movieTitle: "",
    kidCount: location.state.kidCount,
    adultCount: location.state.adultCount,
    couponBoxNo: -1,
  });
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(
        `${
          import.meta.env.VITE_BACK_SERVER
        }/booking/getMovie?movieNo=${movieNo}`
      )
      .then((res1) => {
        setMovie(res1.data);

        axios
          .get(
            `${
              import.meta.env.VITE_BACK_SERVER
            }/booking/getMember?memberId=${memberId}`
          )
          .then((res2) => {
            setMember(res2.data);
            const newPayInfo = {
              ...bookingInfo,
              movieTitle: res1.data.movieTitle,
              movieNo: res1.data.movieNo,
              memberNo: res2.data.memberNo,
            };
            setBookingInfo(newPayInfo);
          })
          .catch((err) => {
            console.log(err);
          });
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
        setCouponList(res.data.couponList);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [memberId]);

  useEffect(() => {
    if (!coupon) {
      return;
    }
    setPayPrice(totalPrice - coupon);
    const newBookingInfo = { ...bookingInfo, payPrice: totalPrice - coupon };
    if (totalPrice - coupon < 0) {
      setPayPrice(0);
    }
    setBookingInfo(newBookingInfo);
  }, [coupon]);
  console.log(bookingInfo);
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
                  {bookDate.getMonth() +
                    1 +
                    "-" +
                    String(bookDate.getDate()).padStart(2, "0")}
                  &nbsp;
                  {bookDate.getDay() === 1
                    ? "(월)"
                    : bookDate.getDay() === 2
                    ? "(화)"
                    : bookDate.getDay() === 3
                    ? "(수)"
                    : bookDate.getDay() === 4
                    ? "(목)"
                    : bookDate.getDay() === 5
                    ? "(금)"
                    : bookDate.getDay() === 6
                    ? "(토)"
                    : "(일)"}
                  &nbsp;
                  <br />
                  {scheduleDate}
                  {" ~ " + scheduleEnd}
                </div>
                <div className="screen-title">
                  {payInfo.screenNo === "1"
                    ? "1관"
                    : payInfo.screenNo === "2"
                    ? "2관"
                    : "3관"}
                </div>
                <div className="seat-title">
                  <span>좌석 : </span>
                  {payInfo.selectSeatList.map((seat, index) => {
                    return payInfo.selectSeatList.length !== index + 1 ? (
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
              {location.state.adultCount !== 0 && (
                <div>{"성인 : " + location.state.adultCount + "명"}</div>
              )}

              {location.state.kidCount !== 0 && (
                <div>{"어린이 : " + location.state.kidCount + "명"}</div>
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
                  setBookingInfo={setBookingInfo}
                  bookingInfo={bookingInfo}
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
                  const dateString = new Date();

                  IMP.init("imp01372877");
                  IMP.request_pay(
                    {
                      customer_uid:
                        "store-b7434f12-6184-47c2-ab78-5779cb27861e",
                      channelKey:
                        "channel-key-cd790bcc-53eb-4fa9-9f90-e92ea7984b23",
                      pay_method: "easy_pay",
                      merchant_uid: "orderNo0001" + dateString,
                      name: movie.movieTitle,
                      amount: payPrice,
                      buyer_email: member.memberEmail,
                      buyer_name: member.memberName,
                      buyer_tel: member.memberPhone,
                      custom_data: {},
                    },
                    (rsp) => {
                      if (rsp.success) {
                        axios
                          .post(
                            `${
                              import.meta.env.VITE_BACK_SERVER
                            }/booking/payment`,
                            bookingInfo
                          )
                          .then((res) => {
                            console.log(res);
                            Swal.fire({
                              title: "예매 완료",
                              html: "예매가 완료되었습니다. <br/> 예매 내역은 이메일로 발송됩니다.",
                              icon: "success",
                              confirmButtonText: "확인",
                            }).then((result) => {
                              if (result.isConfirmed) {
                                navigate(`/`);
                              }
                            });
                          })
                          .catch((err) => {
                            console.log(err);
                          });
                      }
                    }
                  );
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
  const bookingInfo = props.bookingInfo;
  const setBookingInfo = props.setBookingInfo;

  const couponSelect = (e) => {
    setCoupon(e.target.value);
    if (e.target.value !== 0) {
      const newInfo = { ...bookingInfo, couponNo: e.target.id };
      setBookingInfo(newInfo);
    }
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
              <MenuItem
                key={"coupon-" + index}
                value={coupon.couponDisscount}
                id={coupon.couponBoxNo}
              >
                {coupon.couponName}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </Box>
  );
};

const Payment = (props) => {};

export default PayPage;
