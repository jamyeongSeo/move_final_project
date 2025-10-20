import { useState } from "react";
import LeftSideMenu from "../utils/LeftSideMenu";
import { Link } from "react-router-dom";

const MemberDelete = () => {
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

      <div className="left-side-menu-other member-mypage-wrap">
        <div className="memberMain-title">
          <h1>회원 탈퇴</h1>
          <span className="memberUpdate-title-contnet">
            회원님의 정보보호를 위한 확인 절차입니다
          </span>
        </div>
        <section>
          <div className="member-mypage-content-wrap">
            <div className="member-mypage-content-line input-line">
              <input
                className="member-mypage-content-left"
                placeholder="비밀번호를 입력하세요"
              ></input>
            </div>
            <div className="memberUpdate-searchPw">
              <span>정말 탈퇴 하시겠습니까?</span>
              {/*이건 모달에서 띄우는게 더 좋을 듯 */}
            </div>
          </div>

          <div className="member-mypage-btn-wrap">
            <button type="button" className="btn-red member-mypage-btn">
              탈퇴
            </button>
            <Link to="/member/memberMain" className="btn-red member-mypage-btn">
              취소
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};

export default MemberDelete;
