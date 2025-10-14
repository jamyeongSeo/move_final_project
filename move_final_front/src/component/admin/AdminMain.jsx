import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil"
import Swal from "sweetalert2";
import axios from "axios";

const AdminMain = () =>{
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


    const [menus, setMenus] = useState([
        {url : "admin/main", 
        text : "영화 관리",
        subMenu :[
                {url:"admin/main", text:"영화리스트"},
                {url:"admin/movie/regist", text:"영화등록"},
                {url:"admin/schedule/regist", text:"스케줄등록"},
                {url:"admin/movieGoer", text:"관객수 조회"}
            ],
        },
        {url : "admin/sales", 
        text:"매출 관리",
        subMenu :[
            {url:"admin/salesAll", text:"전체 매출 조회"},
            {url:"admin/saleseOne", text:"각 영화 매출 조회"}
        ]

        },
        {url : "admin/member", text:"회원 관리"},
    ]);
    
    //클릭된 항목 여부 index로 처리
    const [openIndex, setOpenIndex] = useState(null);
    const toggleMenu = (index) =>{
        setOpenIndex(openIndex === index ? null : index);
    };

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
        서브라우팅 걸어서 사이드메뉴 

        */}

    return (
    <section className="admin-list-wrap">
        <div className="side-title">관리자 페이지</div>
            <div className="content-title">영화 리스트</div>
            <div className="search-item"></div>
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
        <div className="admin-content">
            <div className="side-menu">
                {menus.map((menu, index) => (
                    <div key={index} className="menu-section">

                    <div
                        className={`menu-title ${openIndex === index ? "active" : ""}`}
                        onClick={() => toggleMenu(index)}>
                        {menu.text}
                    </div>

                    {openIndex === index && menu.subMenu && (
                        <div className="submenu">
                        {menu.subMenu.map((sub, i) => (
                            <div
                            key={i}
                            className="submenu-item"
                            onClick={() => navigate(`/${sub.url}`)}>
                            {sub.text}
                            </div>
                        ))}
                        </div>
                    )}
                    </div>
                ))}
            </div>
        <div className="admin-main-content">
            <div className="admin-main-content">
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
        </div>
            </div>
        </section>
        )
    }
 
    export default AdminMain;