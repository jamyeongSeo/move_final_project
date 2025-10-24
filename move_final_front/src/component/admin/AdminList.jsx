import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

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
import AdminRegistFrm from "./AdminRegistFrm";
import Swal from "sweetalert2";

const AdminList = () => {
    const navigate = useNavigate();
    const [search, setSearch] = useState(""); //영화 제목 검색
    const [movieList, setMovieList] = useState([]); //영화 정보 목록
    const [reqPage, setReqPage] = useState(1); //페이지
    const [pi, setPi] = useState(null);
    
    
    //영화 목록 페이징
    const adminFunc =() =>{
        useEffect(() => {
            axios
            .get(
                `${import.meta.env.VITE_BACK_SERVER}/admin/movie?reqPage=${reqPage}&movieTitle=${search}`)
                .then((res) => {
                    setMovieList(res.data.movieList);
                    setPi(res.data.pi);
                })
                .catch((err) => {
                    console.log(err);
                });
            },);
        }
        
    const adminSearchInput = () => {
            setReqPage(1);
            adminFunc(1, search);
        }

    //수정화면 넘어가려고 영화버노 받아오기..맞나?
    const params = useParams();
    const movieNo = params.movieNo;

const MovieItem = (props) =>{
    const movie = props.movie;
    return (
        <li className="admin-movieList-item"
        onClick={()=>{
            navigate(`/admin/update/${movie.movieNo}`);
        }}>
        <div className="movie-info">
            <div className="admin-movie-title" onClick={()=>{
                    navigate(`/admin/update/${movie.movieNo}`);
            }}>{movie.movieTitle}
            </div>
            <div>
                <div className="admin-movie-grade">{movie.movieGrade}</div>
                    <div className="admin-movie-release">{movie.movieRelease}</div>
                    <div className="admin-movie-status">{movie.movieStatus}</div>
                </div>
            </div>
        </li>
        )
    }
    

    
return (
    <div className="admin-main-wrap">
        <section className="admin-header">
            <div className="admin-content-title">영화 리스트</div>
            <div className="admin-input-search-wrap">
            <div className="admin-search-item">
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
                <button type="submit" className="admin-search-btn"
                onClick={adminSearchInput}>
                    검색
                </button>
            </div>
            </div>
        </section>

        <div className="admin-content-box">
            <table className="admin-content-tbl">
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
                const statusChange = (newStatus) => {
                    const obj = {
                    movieNo: movie.movieNo,
                    movieStatus: newStatus,
                }};
                const prevStatus = movie.movieStatus;
                movieList[index].movieStatus = newStatus;
                setMovieList([...movieList]);
                axios
                    .patch(`${import.meta.env.VITE_BACK_SERVER}/admin/movie/${movie.movieNo}`,obj)
                    .then((res) => {
                    if(res.data === "updateMovieStatus"){
                        console.log(res.data);
                        Swal.fire({
                            title:"영화 상태가 변경되었습니다.",
                            icon:"success",
                        })
                    .catch((err) => {
                        console.log(err);
                        });
                }else{
                    Swal.fire({
                        title:"상영 상태 변경 실패",
                        icon:"error"
                    })
                }
            });
                return (
                <tr key={`movie-${index}`}>
                    <td>{movie.movieNo}</td>
                    <td>
                        <Link to={`/movie/view/${movieNo}`} 
                        className="movie-info-update">{movie.movieTitle}</Link>
                    </td>
                    <td>{movie.movieGrade}</td>
                    <td>{movie.movieRelease}</td>
                    <td>
                    <Select value={prevStatus}
                        onValueChange={(e)=>{
                            setMovieStatus(e.target.value)
                        }}>
                        <SelectTrigger className="updateStatus">
                        </SelectTrigger>
                        <SelectContent>
                        <SelectGroup>
                            <SelectItem value="1">개봉예정</SelectItem>
                            <SelectItem value="2">상영중</SelectItem>
                            <SelectItem value="3">상영종료</SelectItem>
                            <SelectItem value="4">재개봉</SelectItem>
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
    );
};

export default AdminList;