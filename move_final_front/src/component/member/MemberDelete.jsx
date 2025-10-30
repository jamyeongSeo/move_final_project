import { useState } from "react";
import LeftSideMenu from "../utils/LeftSideMenu";
import { Link, useNavigate } from "react-router-dom";
import NoMemberInfo from "./NoMemberInfo";
import axios from "axios";
import Swal from "sweetalert2";
import { useRecoilState } from "recoil";
import { loginIdState } from "../utils/RecoilData";

const MemberDelete = () => {
  const [memberId, setmemberId] = useRecoilState(loginIdState);
  const [memberPw, setMemberPw] = useState("");

  const [menus, setMenus] = useState([
    { url: "/member/memberMain", text: "내 정보" },
    { url: "/member/watchedMovieList", text: "내가 본 영화" },
    { url: "/member/bookingMovieList", text: "예약 / 결제" },
  ]);
  const navigate = useNavigate();
  const BackServer = import.meta.env.VITE_BACK_SERVER;
  const memberDelete = () => {
    if (memberId != "" && memberPw != "") {
      axios
        .post(
          `${BackServer}/member/searchMember?memberId=${memberId}&&memberPw=${memberPw}`
        )
        .then((res) => {
          if (res.data == 1) {
            axios
              .delete(`${BackServer}/member/${memberId}`)
              .then((res) => {
                console.log(res.data);
                if (res.data == 1) {
                  Swal.fire({
                    title: "탈퇴 완료",
                    icon: "success",
                  });
                  setmemberId("");
                  navigate("/");
                } else {
                  Swal.fire({
                    title: "탈퇴 실패",
                    text: "회원탈퇴 실패했습니다.",
                    icon: "error",
                  });
                  navigate("/member/memberMain");
                }
              })
              .catch((err) => {
                console.log(err);
              });
          } else {
            Swal.fire({
              title: "조회 실패",
              text: "비밀번호를 재확인 해주세요",
              icon: "info",
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      Swal.fire({
        title: "입력갑 확인",
        text: "비밀번호를 입력해주세요",
        icon: "info",
      });
    }
  };
  return (
    <>
      {memberId === "" ? (
        <NoMemberInfo></NoMemberInfo>
      ) : (
        <div className="content-wrap  member-wrap">
          <section className="left-side-menu-side">
            <Link to="/member/memberMain">
              <div className="left-side-menu-title">마이페이지</div>
            </Link>
            <LeftSideMenu menus={menus}></LeftSideMenu>
          </section>

          <div className="left-side-menu-other member-mypage-wrap">
            <div className="memberMain-title">
              <p style={{ fontWeight: "600", fontSize: "32px" }}>회원 탈퇴</p>
              <span className="memberUpdate-title-contnet">
                회원님의 정보보호를 위한 확인 절차입니다
              </span>
            </div>
            <section>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  memberDelete();
                }}
              >
                <div className="member-mypage-content-wrap">
                  <div className="member-mypage-content-line input-line">
                    <input
                      type="password"
                      className="member-mypage-content-left"
                      placeholder="비밀번호를 입력하세요"
                      value={memberPw}
                      onChange={(e) => {
                        setMemberPw(e.target.value);
                      }}
                    ></input>
                  </div>
                  <div className="memberUpdate-searchPw">
                    <span>정말 탈퇴 하시겠습니까?</span>
                  </div>
                </div>

                <div className="member-mypage-btn-wrap">
                  <button
                    style={{
                      marginRight: "10px",
                      padding: "3px 8px",
                      height: "36.67px",
                      width: "145px",
                    }}
                    type="submit"
                    className="btn-red member-mypage-btn"
                  >
                    탈퇴
                  </button>
                  <Link
                    style={{ padding: "5px 56px" }}
                    to="/member/memberMain"
                    className="btn-red member-mypage-btn"
                  >
                    취소
                  </Link>
                </div>
              </form>
            </section>
          </div>
        </div>
      )}
    </>
  );
};

export default MemberDelete;
