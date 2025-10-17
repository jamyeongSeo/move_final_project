import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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

const AdminList = () => {
const MovieItem = (props) =>{
    const movie = props.movie;
    const navigate = useNavigate();
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
                <button type="button" className="admin-search-btn">검색</button>
            </div>
            </div>
        </section>

        <div className="admin-content-box">
            <table className="tbl">
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
                const statusChange = (e) => {
                    const newStatus = e.target.value;
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
                    console.log(movieStatus);
                };
                return (
                <tr key={`movie-${index}`}>
                    <td>{movie.movieNo}</td>
                    <td>{movie.movieTitle}</td>
                    <td>{movie.movieGrade}</td>
                    <td>{movie.movieRelease}</td>
                    <td>
                    <Select value={movie.movieStatus}
                        onValueChange={statusChange}>
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