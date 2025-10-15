import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate, useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import Swal from "sweetalert2";
import axios from "axios";
import LeftSideMenu from "../utils/LeftSideMenu";
import PageNavigation from "../utils/PageNavigation";
import "./admin.css";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const subMenus = {
  "/admin/main": [
    { text: "영화 등록", url: "admin/movie/regist" },
    { text: "스케줄 등록", url: "admin/schedule/regist" },
    { text: "관객 수 조회", url: "admin/movieGoer" },
  ],
  "admin/sales": [
    { text: "전체 매출 조회", url: "admin/salesAll" },
    { text: "각 영화 매출 조회", url: "admin/salesOne" },
  ],
};

const AdminMain = () => {
  const [menus, setMenus] = useState([
    { url: "/admin/main", text: "영화 관리" },
    { url: "/admin/sales", text: "매출 관리" },
    { url: "/admin/member", text: "회원 관리" },
  ]);
  const [openMenu, setOpenMenu] = useState(null);
  const menuClick = (menuUrl) => {
    setOpenMenu((prev) => (prev === menuUrl ? null : menuUrl));
  };

  //const [authReady, setAuthReady] = useRecoilState(authReadyState);
  //const [memberType, setMemberType] = useRecoilState(memberTypeState);

  //const navigate = useNavigate();

  {
    /*useEffect(()=>{
        if(authReady && memberType !== 1){
            Swal.fire({
                title: "관리자페이지입니다.",
                text: "관리자만 접근이 가능합니다.",
                icon:"warning",
            }).then((res)=>{
                navigate("/");
            });
        }
    },[authReady]);
    */
  }

  {
    /*
    const MovieItem = (props) =>{
        const movie = props.movie;
        const navigate = useNavigate();
        return (
            <li className="movieList-item"
            onClick={()=>{
                navigate(`/admin/update/${movie.movieNo}`);
            }}>
                <div className="movie-info">
                    <div className="movie-title" onClick={()=>{
                        navigate(`/admin/update/${movie.movieNo}`);
                    }}>{movie.movieTitle}</div>
                    <div className="movie-grade">{movie.movieGrade}</div>
                    <div className="movie-release">{movie.movieRelease}</div>
                    <div className="movie-status">{movie.movieStatus}</div>
                </div>
            </li>
        )
    }
        */
  }

  const [search, setSearch] = useState("");
  const [movieList, setMovieList] = useState([]);
  const [reqPage, setReqPage] = useState(1);
  const [pi, setPi] = useState(null);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACK_SERVER}/admin/movie?reqPage=${reqPage}`)
      .then((res) => {
        setMovieList(res.data.movieList);
        setPi(res.data.pi);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [reqPage]);

  return (
    <section className="admin-list-wrap">
      <div className="side-wrap">
        <section className="side-menu-box">
          <div>관리자 페이지</div>
        </section>
        {/*
            <div className="side-menu-container">
                {menus.map((menu, index) => (
                    <div key={index}>
                    <div onClick={() => menuClick(menu.url)}>
                        <LeftSideMenu menus = {[menus]} />
            </div>
            </div>
            {openMenu === menu.url && (
                <ul className="sub-menu-list">
                {subMenus[menu.url]?.map((sub, i) => (
                    <li key={`sub-${i}`}>
                        <NavLink
                        to={sub.url}
                        className={({ isActive }) => isActive ? "active-link" : ""
                        }>
                            {sub.text}
                        </NavLink>
                    </li>
                    ))}
                </ul>
                )
            </div>
                ))
            */}

        <div className="side-menu-container">
          {menus.map((menu, index) => (
            <div key={index}>
              <div onClick={() => menuClick(menu.url)}>
                <LeftSideMenu menus={[menus]} />
              </div>
              {openMenu === menu.url && (
                <ul className="sub-menu-list">
                  {subMenus[menu.url]?.map((sub, i) => (
                    <li key={`sub-${i}`}>
                      <NavLink
                        to={sub.url}
                        className={({ isActive }) =>
                          isActive ? "active-link" : ""
                        }
                      >
                        {sub.text}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="admin-main-content">
        <section className="admin-header">
          <div className="content-title">영화 리스트</div>
          <div className="input-search-wrap">
            <div className="search-item">
              <input
                type="text"
                id="movieTitle"
                name="movieTitle"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
                placeholder="영화 제목 검색"
              />
            </div>
          </div>
        </section>

        <div className="content-box">
          <table className="content-tbl">
            <thead>
              <tr>
                <th style={{ width: "10%" }}>영화번호</th>
                <th style={{ width: "30%" }}>영화이름</th>
                <th style={{ width: "15%" }}>관람등급</th>
                <th style={{ width: "25%" }}>개봉일</th>
                <th style={{ width: "20%" }}>상영상태</th>
              </tr>
            </thead>
            <tbody>
              {movieList.map((movie, index) => {
                const statusChange = (value) => {
                  const newStatus = value;
                  const obj = {
                    movieNo: movie.movieNo,
                    movieStatus: newStatus,
                  };
                  axios
                    .patch(
                      `${import.meta.env.VITE_BACK_SERVER}/movie/${
                        movie.movieNo
                      }`,
                      obj
                    )
                    .then((res) => {
                      movieList[index].movieStatus = newStatus;
                      setMovieList([...movieList]);
                    })
                    .catch((err) => {
                      console.log(err);
                    });
                };
                return (
                  <tr key={`movie-${index}`}>
                    <td>{movie.movieNo}</td>
                    <td>{movie.movieTitle}</td>
                    <td>{movie.movieGrade}</td>
                    <td>{movie.movieRelease}</td>
                    <td>
                      <Select
                        value={movie.movieStatus}
                        onValueChange={statusChange}
                      >
                        <SelectTrigger className="updateStatus">
                          <SelectValue placeholder="상태 선택" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value="release">개봉예정</SelectItem>
                            <SelectItem value="show">상영중</SelectItem>
                            <SelectItem value="end">상영종료</SelectItem>
                            <SelectItem value="reopen">재개봉</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="page-navi">
          {pi && (
            <PageNavigation pi={pi} reqPage={reqPage} setReqPage={setReqPage} />
          )}
        </div>
      </div>
    </section>
  );
};

export default AdminMain;
