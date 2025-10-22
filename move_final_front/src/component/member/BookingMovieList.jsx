import { useState } from "react";
import { Link } from "react-router-dom";
import LeftSideMenu from "../utils/LeftSideMenu";

const BookingMovieList = () => {
  const [menus, setMenus] = useState([
    {
      url: [
        "/member/memberMain",
        "/member/memberUpdate",
        "/member/memberDelete",
      ],
      text: "내 정보",
    },
    { url: "/member/watchedMovieList", text: "내가 본 영화" },
    { url: "/member/bookingMovieList", text: "예약 / 결제" },
  ]);
  return (
    <div className="content-wrap">
      <section className="left-side-menu-side">
        <Link to="/member/memberMain">
          <div className="left-side-menu-title">마이페이지</div>
        </Link>
        <LeftSideMenu menus={menus}></LeftSideMenu>
      </section>

      <section className="left-side-menu-other ">
        <div className="memberMain-title">
          <h1>예약 / 결제</h1>
        </div>
        <div
          style={{ borderBottom: "none" }}
          className="member-mypage-content-wrap"
        >
          {/*map 구간 */}
          <div className="memberMovie-list-wrap">
            <div className="memberMovie-box">
              <div className="memberMovie-post">
                <img src="/image/어쩔수가없다.jpg"></img>
              </div>
              <div className="memberMovie-info">
                <div className="memberMovie-content">
                  <ul>
                    <li>
                      <h3>어쩔수가없다+img등급(if걸어서)</h3>
                    </li>
                    <li>2025.10.01(수) 13:00~14:30</li>
                    <li style={{ marginTop: "10px" }}>1관(2D)</li>
                    <li style={{ marginTop: "10px" }}>성인:1 / 어린이:1</li>
                  </ul>
                </div>
                <div className="memberMovie-booking-btn">
                  <button
                    style={{ marginRight: "5px", width: "110px" }}
                    className="btn-red"
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

        <div>페이지 네비</div>
      </section>
    </div>
  );
};

export default BookingMovieList;
