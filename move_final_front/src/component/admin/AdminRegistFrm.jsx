import { useRef, useState, useEffect } from "react";
import { MenuItem, Select } from "@mui/material";
import "./adminRegist.css";

const AdminRegistFrm = (props) => {
  const {
    movieTitle,
    setMovieTitle,
    movieStatus,
    setMovieStatus,
    movieContent,
    setMovieContent,
    movieThumb,
    setMovieThumb,
    movieGenre,
    setMovieGenre,
    movieGrade,
    setMovieGrade,
    movieRuntime,
    setMovieRuntime,
    movieDirector,
    setMovieDirector,
    movieActor,
    setMovieActor,
    movieRelease,
    setMovieRelease,
    movieType,
    setMovieType,
  } = props;

  const [showThumb, setShowThumb] = useState(null);
  const thumbRef = useRef(null);
  const [maxDate, setMaxDate] = useState("");

  useEffect(() => {
    const today = new Date();
    const max = new Date();
    max.setMonth(today.getMonth() + 2);
    setMaxDate(max.toISOString().split("T")[0]);
  }, []);

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

  const handleRuntimeChange = (e) => {
    setMovieRuntime(e.target.value);
  };

  return (
    <div className="admin-regist-info-wrap">
      <div className="admin-regist-thumb-wrap">
        <img
          src={
            showThumb
              ? showThumb
              : movieThumb && typeof movieThumb === "string"
              ? `${import.meta.env.VITE_BACK_SERVER}${movieThumb}`
              : "/image/default_img.png"
          }
          onClick={() => thumbRef.current.click()}
          alt="영화 포스터"
          className="admin-regist-thumb-img-preview"
        />
        <input
          ref={thumbRef}
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={changeThumb}
        />
        <div className="admin-regist-thumb-label">포스터 등록</div>
      </div>

      <table className="admin-regist-info-tbl">
        <tbody>
          <tr>
            <th>영화 제목</th>
            <td>
              <div className="admin-regist-input">
                <input
                  type="text"
                  value={movieTitle}
                  onChange={(e) => setMovieTitle(e.target.value)}
                  placeholder="영화 제목을 입력하세요"
                />
              </div>
            </td>
          </tr>

          <tr>
            <th>상영 상태</th>
            <td>
              <Select
                value={movieStatus}
                onChange={(e) => setMovieStatus(e.target.value)}
                sx={{ width: "140px", height: "45px" }}
              >
                <MenuItem value="1">개봉 예정</MenuItem>
                <MenuItem value="4">재개봉</MenuItem>
              </Select>
            </td>
          </tr>

          <tr>
            <th>관</th>
            <td>
              <Select
                value={movieType}
                onChange={(e) => setMovieType(e.target.value)}
                sx={{ width: "140px", height: "45px" }}
              >
                <MenuItem value="1">2D</MenuItem>
                <MenuItem value="2">3D</MenuItem>
                <MenuItem value="3">4DX</MenuItem>
              </Select>
            </td>
          </tr>

          <tr>
            <th>영화 장르</th>
            <td>
              <Select
                value={movieGenre}
                onChange={(e) => setMovieGenre(e.target.value)}
                sx={{ width: "180px", height: "45px" }}
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
            <th>관람 등급</th>
            <td>
              <Select
                value={movieGrade}
                onChange={(e) => setMovieGrade(e.target.value)}
                sx={{ width: "200px", height: "45px" }}
              >
                <MenuItem value="1">전체 관람가</MenuItem>
                <MenuItem value="2">12세 이상 관람가</MenuItem>
                <MenuItem value="3">15세 이상 관람가</MenuItem>
                <MenuItem value="4">19세 이상 관람가</MenuItem>
              </Select>
            </td>
          </tr>

          <tr>
            <th>러닝타임</th>
            <td>
              <div className="admin-regist-input">
                <input
                  type="number"
                  value={movieRuntime}
                  onChange={handleRuntimeChange}
                  placeholder="분 단위로 입력 (예: 120)"
                  min="0"
                />
              </div>
            </td>
          </tr>

          <tr>
            <th>감독명</th>
            <td>
              <div className="admin-regist-input">
                <input
                  type="text"
                  value={movieDirector}
                  onChange={(e) => setMovieDirector(e.target.value)}
                  placeholder="감독명을 입력하세요"
                />
              </div>
            </td>
          </tr>

          <tr>
            <th>출연진</th>
            <td>
              <div className="admin-regist-input">
                <input
                  type="text"
                  value={movieActor}
                  onChange={(e) => setMovieActor(e.target.value)}
                  placeholder="출연진을 입력하세요"
                />
              </div>
            </td>
          </tr>

          <tr>
            <th>개봉일</th>
            <td>
              <div className="admin-regist-input">
                <input
                  type="date"
                  value={movieRelease}
                  onChange={(e) => setMovieRelease(e.target.value)}
                  max={maxDate}
                />
              </div>
            </td>
          </tr>

          <tr>
            <th>영화 소개글</th>
            <td>
              <textarea
                className="admin-textarea"
                value={movieContent}
                onChange={(e) => setMovieContent(e.target.value)}
                placeholder="영화 소개를 입력하세요 (최대 300자)"
                maxLength={300}
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default AdminRegistFrm;
