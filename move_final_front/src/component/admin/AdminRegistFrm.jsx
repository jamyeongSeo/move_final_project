import { useRef, useState } from "react";
import { MenuItem, Select } from "@mui/material";
import TextEditor from "../utils/TextEditor";

const AdminRegistFrm = (props) => {
    const {
        movieTitle, setMovieTitle,
        movieStatus, setMovieStatus,
        movieContent, setMovieContent,
        movieThumb, setMovieThumb,
        movieGenre, setMovieGenre,
        movieGrade, setMovieGrade,
        movieRuntime, setMovieRuntime,
        movieDirector, setMovieDirector,
        movieActor, setMovieActor,
        movieRelease, setMovieRelease,
        movieType, setMovieType
    } = props;

    const [showThumb, setShowThumb] = useState(null);
    const thumbRef = useRef(null);

    const changeThumb = (e) => {
        const files = e.target.files;
        if (files.length !== 0) {
            const file = files[0];
            setMovieThumb(file);
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                setShowThumb(reader.result);
            };
        } else {
            setMovieThumb(null);
            setShowThumb(null);
        }
    };

    return (
        <div className="regist-info-wrap">
            
            <div className="regist-thumb-wrap">
                <img
                    src={
                        showThumb
                            ? showThumb
                            : movieThumb
                            ? `${import.meta.env.VITE_BACK_SERVER}/admin/movie/${movieThumb}`
                            : "/image/default_img.png"
                    }
                    onClick={() => thumbRef.current.click()}
                    alt="영화 포스터"
                    className="regist-thumb-img-preview"
                />

                <input
                    ref={thumbRef}
                    type="file"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={changeThumb}
                />

                <div className="regist-thumb-label">포스터 등록</div>
            </div>

            <table className="regist-info-tbl">
                <tr>
                    <th><label htmlFor="regist-title">영화 제목</label></th>
                    <td>
                        <div className="admin-regist-input">
                            <input
                                type="text"
                                id="regist-title"
                                value={movieTitle}
                                onChange={(e) => setMovieTitle(e.target.value)}
                            />
                        </div>
                    </td>
                </tr>

                <tr>
                    <th><label htmlFor="regist-status">상영 상태</label></th>
                    <td>
                        <Select
                            value={movieStatus}
                            onChange={(e) => setMovieStatus(e.target.value)}
                            sx={{ width: "120px", height: "50px" }}
                        >
                            <MenuItem value="1">개봉예정</MenuItem>
                            <MenuItem value="2">상영중</MenuItem>
                            <MenuItem value="3">상영종료</MenuItem>
                            <MenuItem value="4">재개봉</MenuItem>
                        </Select>
                    </td>
                </tr>

                <tr>
                    <th><label htmlFor="regist-type">관</label></th>
                    <td>
                        <Select
                            value={movieType}
                            onChange={(e) => setMovieType(e.target.value)}
                            sx={{ width: "120px", height: "50px" }}
                        >
                            <MenuItem value="1">2D</MenuItem>
                            <MenuItem value="2">3D</MenuItem>
                            <MenuItem value="3">4DX</MenuItem>
                        </Select>
                    </td>
                </tr>

                <tr>
                    <th><label htmlFor="regist-genre">영화 장르</label></th>
                    <td>
                        <Select
                            value={movieGenre}
                            onChange={(e) => setMovieGenre(e.target.value)}
                            sx={{ width: "160px", height: "50px" }}
                        >
                            <MenuItem value="1">액션</MenuItem>
                            <MenuItem value="2">애니메이션</MenuItem>
                            <MenuItem value="3">코미디</MenuItem>
                            <MenuItem value="4">공포</MenuItem>
                            <MenuItem value="5">스릴러</MenuItem>
                            <MenuItem value="6">SF</MenuItem>
                            <MenuItem value="7">범죄</MenuItem>
                            <MenuItem value="8">판타지</MenuItem>
                        </Select>
                    </td>
                </tr>

                <tr>
                    <th><label htmlFor="regist-grade">관람 등급</label></th>
                    <td>
                        <Select
                            value={movieGrade}
                            onChange={(e) => setMovieGrade(e.target.value)}
                            sx={{ width: "190px", height: "50px" }}
                        >
                            <MenuItem value="1">전체 관람가</MenuItem>
                            <MenuItem value="2">12세 이상 관람가</MenuItem>
                            <MenuItem value="3">15세 이상 관람가</MenuItem>
                            <MenuItem value="4">19세 이상 관람가</MenuItem>
                        </Select>
                    </td>
                </tr>

                <tr>
                    <th><label htmlFor="regist-movie-runtime">상영시간</label></th>
                    <td>
                        <div className="admin-regist-input">
                            <input
                                type="time"
                                id="regist-movie-runtime"
                                value={movieRuntime}
                                onChange={(e) => setMovieRuntime(e.target.value)}
                            />
                        </div>
                    </td>
                </tr>

                <tr>
                    <th><label htmlFor="regist-director">감독명</label></th>
                    <td>
                        <div className="admin-regist-input">
                            <input
                                type="text"
                                id="regist-director"
                                value={movieDirector}
                                onChange={(e) => setMovieDirector(e.target.value)}
                            />
                        </div>
                    </td>
                </tr>

                <tr>
                    <th><label htmlFor="regist-actor">출연진</label></th>
                    <td>
                        <div className="admin-regist-input">
                            <input
                                type="text"
                                id="regist-actor"
                                value={movieActor}
                                onChange={(e) => setMovieActor(e.target.value)}
                            />
                        </div>
                    </td>
                </tr>

                <tr>
                    <th><label htmlFor="regist-movie-release">개봉일</label></th>
                    <td>
                        <div className="admin-regist-input">
                            <input
                                type="date"
                                id="regist-movie-release"
                                value={movieRelease}
                                onChange={(e) => setMovieRelease(e.target.value)}
                            />
                        </div>
                    </td>
                </tr>

                <tr>
                    <th><label htmlFor="regist-content">영화 소개글</label></th>
                    <td>
                        <div className="admin-input-movieContent-box">
                            <input
                                type="text"
                                id="regist-content"
                                value={movieContent}
                                onChange={(e) => setMovieContent(e.target.value)}
                            />
                        </div>
                    </td>
                </tr>
            </table>
        </div>
    );
};

export default AdminRegistFrm;
