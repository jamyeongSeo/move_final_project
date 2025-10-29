import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import LeftSideMenu from "../utils/LeftSideMenu";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import { Margin } from "@mui/icons-material";
import { data } from "autoprefixer";
import { useRecoilState } from "recoil";
import { loginIdState, memberLevelState } from "../utils/RecoilData";
import NoMemberInfo from "./NoMemberInfo";
import axios from "axios";

const WatchedMovieList = () => {
  const [memberId, setMemberId] = useRecoilState(loginIdState);
  const [memberLevel, setMemberLevel] = useRecoilState(memberLevelState);
  const [menus, setMenus] = useState([
    { url: "/member/memberMain", text: "내 정보" },
    { url: "/member/watchedMovieList", text: "내가 본 영화" },
    { url: "/member/bookingMovieList", text: "예약 / 결제" },
  ]);
  const [intervalIconClick, setIntervalIconClick] = useState(false);
  const [intervalSelect, setIntervalSelect] = useState(false);
  const [intervalChoice, setIntervalChoice] = useState(0);
  const intervalClick = () => {
    if (!intervalIconClick) {
      setIntervalIconClick(true);
      setIntervalSelect(true);
    } else if (intervalIconClick) {
      setIntervalIconClick(false);
      setIntervalSelect(false);
    }
  };

  const intervalSetting = () => {
    //intervalChoice, memberId 가지고 back 갔다와서 intervalchoice별 데이터 넣기
  };

  const today = new Date();
  //년/월/일
  const year = today.getFullYear();
  //월
  const month = ("0" + (today.getMonth() + 1)).slice(-2);
  //일
  const date = ("0" + today.getDate()).slice(-2);

  const day = year + "." + month + "." + date;

  const backServer = import.meta.env.VITE_BACK_SERVER;
  /* useEffect(() => {
    axios.get(`${back}`);
  }, [intervalChoice]);*/

  return (
    <>
      {memberLevel == "" ? (
        <NoMemberInfo />
      ) : (
        <div className="content-wrap">
          <section className="left-side-menu-side">
            <Link to="/member/memberMain">
              <div className="left-side-menu-title">마이페이지</div>
            </Link>
            <LeftSideMenu menus={menus}></LeftSideMenu>
          </section>

          <section className="left-side-menu-other ">
            <div className="memberMain-title">
              <h1>내가 본 영화</h1>
            </div>
            <div
              style={{ borderBottom: "none" }}
              className="member-mypage-content-wrap"
            >
              <div className="memberMovie-set-wrap">
                <div className="memberMovie-set">
                  <div className="memberMovie-count">
                    관람 건 수 : watchedMovie.count
                  </div>
                  <div className="memberMovie-interval-wrap">
                    <span className="memberMovie-interval">
                      sysdate-? ~ {day}
                    </span>
                    {intervalIconClick ? (
                      <button
                        onClick={intervalClick}
                        className="memberMovie-interval memberMovie-interval-icon-btn-click"
                      >
                        <EventAvailableIcon />
                      </button>
                    ) : (
                      <button
                        onClick={intervalClick}
                        className="memberMovie-interval memberMovie-interval-icon-btn"
                      >
                        <EventAvailableIcon />
                      </button>
                    )}
                  </div>
                </div>
                <div
                  className={
                    intervalSelect ? "" : "memberMovie-interval-select-wrap"
                  }
                >
                  <button
                    className={
                      intervalChoice === 3
                        ? "memberMovie-interval-btn memberMovie-interval-3 memberMovie-interval-select"
                        : "memberMovie-interval-btn memberMovie-interval-3"
                    }
                    onClick={() => {
                      setIntervalChoice(3);
                      intervalSetting;
                    }}
                  >
                    3개월
                  </button>
                  <button
                    className={
                      intervalChoice === 6
                        ? "memberMovie-interval-btn memberMovie-interval-6 memberMovie-interval-select"
                        : "memberMovie-interval-btn memberMovie-interval-6"
                    }
                    onClick={() => {
                      setIntervalChoice(6);
                      intervalSetting;
                    }}
                  >
                    6개월
                  </button>
                  <button
                    className={
                      intervalChoice === 9
                        ? "memberMovie-interval-btn memberMovie-interval-9 memberMovie-interval-select"
                        : "memberMovie-interval-btn memberMovie-interval-9"
                    }
                    onClick={() => {
                      setIntervalChoice(9);
                      intervalSetting;
                    }}
                  >
                    9개월
                  </button>
                  <button
                    style={{ padding: "4px 22px" }}
                    className={
                      intervalChoice === 12
                        ? "memberMovie-interval-btn memberMovie-interval-12 memberMovie-interval-select"
                        : "memberMovie-interval-btn memberMovie-interval-12"
                    }
                    onClick={() => {
                      setIntervalChoice(12);
                      intervalSetting;
                    }}
                  >
                    12개월
                  </button>
                  <button
                    style={{ padding: "4px 32px" }}
                    className={
                      intervalChoice === 0
                        ? "memberMovie-interval-btn memberMovie-interval-0 memberMovie-interval-select"
                        : "memberMovie-interval-btn memberMovie-interval-0"
                    }
                    onClick={() => {
                      setIntervalChoice(0);
                      intervalSetting;
                    }}
                  >
                    전체
                  </button>
                </div>
              </div>

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
                    <div className="memberMovie-review">
                      <div className="memberMovie-review-text">
                        <Link>
                          <ul>
                            <li>관람하신 영화, 어떠셨나요?</li>
                            <li>실관람평을 남겨주세요.</li>
                          </ul>
                        </Link>
                      </div>
                      <div className="memberMovie-review-box"></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="memberMovie-list-wrap">
                <div className="memberMovie-box">
                  <div className="memberMovie-post">
                    <img src="/image/어쩔수가없다.jpg"></img>
                  </div>
                  <div className="memberMovie-info">
                    <div className="memberMovie-content">
                      <ul>
                        <li>
                          <h4>어쩔수가없다+img등급(if걸어서)</h4>
                        </li>
                        <li>2025.10.01(수) 13:00~14:30</li>
                        <li style={{ marginTop: "10px" }}>1관(2D)</li>
                        <li style={{ marginTop: "10px" }}>성인:1 / 어린이:1</li>
                      </ul>
                    </div>
                    <div className="memberMovie-review">
                      <div className="memberMovie-review-text">
                        <Link>
                          <ul>
                            <li>관람하신 영화, 어떠셨나요?</li>
                            <li>실관람평을 남겨주세요.</li>
                          </ul>
                        </Link>
                      </div>
                      <div className="memberMovie-review-box"></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="memberMovie-list-wrap">
                <div className="memberMovie-box">
                  <div className="memberMovie-post">
                    <img src="/image/어쩔수가없다.jpg"></img>
                  </div>
                  <div className="memberMovie-info">
                    <div className="memberMovie-content">
                      <ul>
                        <li>
                          <h4>어쩔수가없다+img등급(if걸어서)</h4>
                        </li>
                        <li>2025.10.01(수) 13:00~14:30</li>
                        <li style={{ marginTop: "10px" }}>1관(2D)</li>
                        <li style={{ marginTop: "10px" }}>성인:1 / 어린이:1</li>
                      </ul>
                    </div>
                    <div className="memberMovie-review">
                      <div className="memberMovie-review-text">
                        <Link to="#">
                          <ul>
                            <li>관람하신 영화, 어떠셨나요?</li>
                            <li>실관람평을 남겨주세요.</li>
                          </ul>
                        </Link>
                      </div>
                      <div className="memberMovie-review-box"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>페이지 네비</div>
          </section>
        </div>
      )}
    </>
  );
};

export default WatchedMovieList;
