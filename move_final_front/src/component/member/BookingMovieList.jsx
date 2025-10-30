import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LeftSideMenu from "../utils/LeftSideMenu";
import axios from "axios";
import { useRecoilState } from "recoil";
import { loginIdState } from "../utils/RecoilData";

const BookingMovieList = () => {
  const [memberId, setMemberId] = useRecoilState(loginIdState);
  const [menus, setMenus] = useState([
    { url: "/member/memberMain", text: "내 정보" },
    { url: "/member/watchedMovieList", text: "내가 본 영화" },
    { url: "/member/bookingMovieList", text: "예약 / 결제" },
  ]);

  const [bookingList, setBookingList] = useState([]);
  const [totalCount, setTotalCount] = useState();
  const BackServer = import.meta.env.VITE_BACK_SERVER;
  useEffect(() => {
    axios
      .get(`${BackServer}/member/bookingList?memberId=${memberId}`)
      .then((res) => {
        console.log(res.data);
        setBookingList(res.data.bookingList);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="content-wrap member-wrap">
      <section className="left-side-menu-side">
        <Link to="/member/memberMain">
          <div className="left-side-menu-title">마이페이지</div>
        </Link>
        <LeftSideMenu menus={menus}></LeftSideMenu>
      </section>

      <section className="left-side-menu-other">
        <div className="memberMain-title">
          <p style={{ fontWeight: "600", fontSize: "32px" }}>예약 / 결제</p>
        </div>
        <div
          style={{ borderBottom: "none" }}
          className="member-mypage-content-wrap"
        >
          <>
            {bookingList &&
              bookingList.map((b, index) => {
                const sendBookingMail = () => {
                  const [bookingMail, setBookingMail] = useState({
                    payNo: b.payNo,
                    movieTitle: b.movieTitle,
                    movieGrade: b.movieGrade,
                    movieDate: b.movieDate,
                    movieTime: b.movieTime,
                    movieScreen: b.movieGrade,
                    count: b.count,
                    comment: "",
                    movieThumb: b.movieThumb,
                    seat: b.seat,
                    memberId: memberId,
                  });
                  axios
                    .post(`${BackServer}/member/sendBookingMail`, bookingMail)
                    .then((res) => {
                      console.log(res);
                    })
                    .catch((err) => {
                      console.log(err);
                    });
                };
                return (
                  <div key={"bookingMovie-" + index}>
                    <div className="memberMovie-list-wrap">
                      <div className="memberMovie-box">
                        <div className="memberMovie-post">
                          <img src={b.movieThumb}></img>
                        </div>
                        <div className="memberMovie-info">
                          <div className="memberMovie-content">
                            <ul>
                              <li>
                                <p className="member-movie-title">
                                  {b.movieTitle}
                                  <img
                                    className="member-movie-grade-img"
                                    src={
                                      w.movieGrade == 1
                                        ? "/image/ALL.png"
                                        : w.movieGrade == 2
                                        ? "/image/12.png"
                                        : w.movieGrade == 3
                                        ? "/image/15.png"
                                        : "/image/19.png"
                                    }
                                  />
                                </p>
                              </li>
                              <li>
                                {b.movieDate} {b.movieTime}
                              </li>
                              <li style={{ marginTop: "10px" }}>
                                {b.movieScreen}
                              </li>
                              <li style={{ marginTop: "10px" }}>
                                {b.count}
                                <span
                                  style={{
                                    marginTop: "0px",
                                    fontWeight: "500",
                                    fontSize: "16px",
                                    marginLeft: "23px",
                                  }}
                                >
                                  [ {b.seat} ]
                                </span>
                              </li>
                            </ul>
                          </div>
                          <div className="memberMovie-booking-btn">
                            <button
                              style={{ marginRight: "5px", width: "110px" }}
                              className="btn-red"
                              onClick={sendBookingMail}
                            >
                              예매내역 발송
                            </button>
                            <button
                              style={{ width: "80px" }}
                              className="btn-red"
                            >
                              예매 취소
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
          </>
          <div className="memberMovie-list-wrap">
            <div className="memberMovie-box">
              <div className="memberMovie-post">
                <img src="/image/어쩔수가없다.jpg"></img>
              </div>
              <div className="memberMovie-info">
                <div className="memberMovie-content">
                  <ul>
                    <li>
                      <p className="member-movie-title">
                        어쩔수가없다+img등급(if걸어서)
                        <img
                          className="member-movie-grade-img"
                          src="/image/ALL.png"
                        />
                      </p>
                    </li>
                    <li>2025.10.01(수) 13:00~14:30</li>
                    <li style={{ marginTop: "10px" }}>1관(2D)</li>
                    <li style={{ marginTop: "10px" }}>
                      성인:1 / 어린이:1
                      <span
                        style={{
                          marginTop: "0px",
                          fontWeight: "500",
                          fontSize: "16px",
                          marginLeft: "23px",
                        }}
                      >
                        [ F1, F2 ]
                      </span>
                    </li>
                  </ul>
                </div>
                <div className="memberMovie-booking-btn">
                  <button
                    style={{ marginRight: "5px", width: "110px" }}
                    className="btn-red"
                    onClick={sendBookingMail}
                  >
                    예매내역 발송
                  </button>
                  <button style={{ width: "80px" }} className="btn-red">
                    예매 취소
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/*<div>페이지 네비</div> */}
      </section>
    </div>
  );
};

export default BookingMovieList;
