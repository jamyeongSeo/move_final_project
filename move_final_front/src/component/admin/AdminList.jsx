import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import PageNavigation from "../utils/PageNavigation";
import "./admin.css";
import Swal from "sweetalert2";

const AdminList = () => {
  const [movieList, setMovieList] = useState([]);
  const [search, setSearch] = useState("");
  const [reqPage, setReqPage] = useState(1);
  const [pi, setPi] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState("ALL");

  // 탭 클릭 시 상태 변경
  const statusClick = (status) => {
    setSelectedStatus(status);
    setReqPage(1);
  };

  // 영화 목록 가져오기
  useEffect(() => {
    let url = `${import.meta.env.VITE_BACK_SERVER}/admin/movie?reqPage=${reqPage}`;

    if (search.trim() !== "") {
      url += `&movieTitle=${search}`;
    }

    if (selectedStatus !== "ALL") {
      url += `&movieStatus=${selectedStatus}`;
    }

    axios
      .get(url)
      .then((res) => {
        setMovieList(res.data.movieList);
        setPi(res.data.pi);
      })
      .catch((err) => console.log(err));
  }, [reqPage, search, selectedStatus]);

  // 등급 매핑 (1~4 → 텍스트로 변환)
  const getGradeLabel = (grade) => {
    switch (grade) {
      case 1:
        return "전체 관람가";
      case 2:
        return "12세 이용가";
      case 3:
        return "15세 이용가";
      case 4:
        return "19세 이용가";
      default:
        return "-";
    }
  };

  return (
    <div className="admin-main-wrap">
      <section className="admin-header">
        <div className="admin-content-title">영화 리스트</div>

        <div className="admin-search-filter-wrap">
          <div className="admin-status-tabs">
            {[
              { label: "전체", value: "ALL" },
              { label: "개봉 예정", value: "1" },
              { label: "상영 중", value: "2" },
              { label: "상영 종료", value: "3" },
              { label: "재개봉", value: "4" },
            ].map((tab) => (
              <button
                key={tab.value}
                className={`status-tab ${
                  selectedStatus === tab.value ? "active" : ""
                }`}
                onClick={() => statusClick(tab.value)}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <div className="admin-search-item">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="영화 제목 검색"
            />
            <button className="admin-search-btn" onClick={() => setReqPage(1)}>
              검색
            </button>
          </div>
        </div>
      </section>

      <div className="admin-content-box">
        <table className="admin-content-tbl">
          <thead>
            <tr>
              <th>번호</th>
              <th>영화 제목</th>
              <th>관람등급</th>
              <th>개봉일</th>
              {selectedStatus === "ALL" && <th>상태</th>}
            </tr>
          </thead>

          <tbody>
            {movieList.length === 0 ? (
              <tr>
                <td
                  colSpan={selectedStatus === "ALL" ? 5 : 4}
                  style={{ textAlign: "center", padding: "20px" }}
                >
                  해당 조건의 영화가 없습니다.
                </td>
              </tr>
            ) : (
              movieList.map((movie) => (
                <tr key={movie.movieNo}>
                  <td>{movie.movieNo}</td>
                  <td>
                    <Link
                      to={`/movie/view/${movie.movieNo}`}
                      className="admin-movie-info-update"
                    >
                      {movie.movieTitle}
                    </Link>
                  </td>
                  {/* ✅ 등급 숫자 → 텍스트 변환 */}
                  <td>{getGradeLabel(movie.movieGrade)}</td>
                  <td>{movie.movieRelease}</td>

                  {selectedStatus === "ALL" && (
                    <td>
                      <span className={`status-badge status-${movie.movieStatus}`}>
                        {{
                          1: "개봉 예정",
                          2: "상영 중",
                          3: "상영 종료",
                          4: "재개봉",
                        }[movie.movieStatus] || "-"}
                      </span>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {pi && <PageNavigation pi={pi} reqPage={reqPage} setReqPage={setReqPage} />}
    </div>
  );
};

export default AdminList;
