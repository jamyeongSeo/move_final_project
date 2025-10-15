import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil"
import Swal from "sweetalert2";
import axios from "axios";
import LeftSideMenu from "../utils/LeftSideMenu";

const [menus, setMenus] = useState([
    {url : "admin/main", text : "영화 관리",},
    {url : "admin/sales", text:"매출 관리",},
    {url : "admin/member", text:"회원 관리"},
    ]);

const subMenus = {
    "admin/movie" : [
        {text : "영화 리스트", url : "admin/movie/list"},
        {text : "영화 등록", url: "admin/movie/regist"},
        {text : "스케줄 등록", url : "admin/schedule/regist"},
        {text : "관객 수 조회", url : "admin/movieGoer"},
        ],
    "admin/sales" :[
        {text : "전체 매출 조회", url : "admin/salesAll"},
        {text: "각 영화 매출 조회", url: "admin/saelsOne"},
        ]
    };


const AdminMain = () => {
    const [openMenu, setOpenMenu] = useState(null);
    const menuClick = (menuUrl) => {
        setOpenMenu((prev) => (prev === menuUrl ? null : menuUrl));
    }

    //const [authReady, setAuthReady] = useRecoilState(authReadyState);
    //const [memberType, setMemberType] = useRecoilState(memberTypeState);

    const [movieList, setMovieList] = useState([]);
    const [reqPage, setReqPage] = useState(1);
    
    const navigate = useNavigate();

    {/*useEffect(()=>{
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
    */}

    {/*
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
        */}
    return (
    <section className="admin-list-wrap">
        {/*<div className="side-wrap">
            <section className="side-menu-box">
                <div>관리자 페이지</div>
            </section>
            <div className="side-menu-container">
                {menus.map((menu, index) => (
                    < key={index}>
                    <div onClick={() => menuClick(menu.url)}>
                        <LeftSideMenu menus = {[menus]} />
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
                )}
                </div>
                ))}
                </div>
                */}
        <div className="admin-main-content">
            <section className="admin-header">
                <div className="content-title">영화 리스트</div>
                <div className="search-item"></div>
            </ section>
            <div className="content-box-title">
                <table>
                        <tr>
                            <th>영화번호</th>
                            <th>영화이름</th>
                            <th>관람등급</th>
                            <th>개봉일</th>
                            <th>상영상태</th>
                        </tr>
                </table>
        </div>
                {/*
                <tbody>
                    {movieList.map((movie, index)=>{
                        const statusChange = (e) => {
                            const newStatus = Number(e.target.value);
                            const obj = {movieNo : movie.movieNo, movieStatus : movieStatus};
                            axios
                            .patch(`${import.meta.env.VITE_BACK_SERVER}/movie/movieNo`, obj)
                            .then((res)=>{
                                console.log(res);
                                movieList[index].movieStatus = movieStatus;
                                setMovieList([...movieList]);
                            })
                            .catch((err)=>{
                                console.log(err);
                            })
                        }
                        })
                    };
                    
                    return(
                        <tr key={"movie-"+index}>
                            <td>{movie.movieNo}</td>
                            <td>{movie.movieTitle}</td>
                            <td>{movie.movieGrade}</td>
                            <td>{movie.movieRelaes}</td>
                            <td>
                                <switch
                                checked = {movie.movieStatus}
                                onChange={statusChange}
                                />
                            </td>
                        </tr>
                    )
                    
                </tbody>
                */}
            </div>
        </section>
        )
    }
 
    export default AdminMain;