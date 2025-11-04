import { useEffect, useState } from "react";
import axios from "axios";
import PageNavigation from "../utils/PageNavigation";
import AdminMovieModal from "./AdminMovieModal";
import "./admin.css";

const AdminList = () => {
  const [movieList, setMovieList] = useState([]);
  const [search, setSearch] = useState("");
  const [reqPage, setReqPage] = useState(1);
  const [pi, setPi] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState("ALL");
  const [showGradeFilter, setShowGradeFilter] = useState(false);
  const [gradeFilter, setGradeFilter] = useState("ALL");
  const [sortOrder, setSortOrder] = useState("desc");
  const [selectedMovie, setSelectedMovie] = useState(null);

  const statusClick = (status) => {
    setSelectedStatus(status);
    setReqPage(1);
  };

  const fetchMovies = () => {
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
        let list = res.data.movieList;
        if (gradeFilter !== "ALL") {
          list = list.filter((movie) => String(movie.movieGrade) === gradeFilter);
        }
        list.sort((a, b) => {
          if (sortOrder === "asc") {
            return new Date(a.movieRelease) - new Date(b.movieRelease);
          } else {
            return new Date(b.movieRelease) - new Date(a.movieRelease);
          }
        });
        setMovieList(list);
        setPi(res.data.pi);
      })
      // .catch(err);
  };

  useEffect(() => {
    fetchMovies();
  }, [reqPage, search, selectedStatus, gradeFilter, sortOrder]);

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

  const handleStatusChange = (movieNo, newStatus) => {
    const formData = new FormData();
    formData.append(
      "movie",
      new Blob([JSON.stringify({ movieStatus: newStatus })], {
        type: "application/json",
      })
    );

    axios
      .patch(`${import.meta.env.VITE_BACK_SERVER}/admin/movie/${movieNo}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then(() => {
        setMovieList((prevList) =>
          prevList.filter((movie) => movie.movieNo !== movieNo)
        );
        setSelectedMovie(null);
        setTimeout(() => {
          fetchMovies();
        }, 200);
      })
      // .catch(err);
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
                  selectedStatus === tab.value ? `active-${tab.value}` : ""
                } ${
                  selectedStatus === tab.value && tab.value === "ALL" ? "active" : ""
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
          </div>
        </div>
      </section>

      <div className="admin-content-box scrollable">
        <table className="admin-content-tbl">
          <thead>
            <tr>
              <th>
                <div className="filter-header">
                  <span>관람등급</span>
                  <div className="filter-dropdown">
                    <button
                      className="filter-toggle-btn"
                      onClick={() => setShowGradeFilter(!showGradeFilter)}
                    >
                      ⚙️
                    </button>
                    {showGradeFilter && (
                      <div className="filter-menu">
                        {[
                          { label: "전체", value: "ALL" },
                          { label: "전체관람가", value: "1" },
                          { label: "12세", value: "2" },
                          { label: "15세", value: "3" },
                          { label: "19세", value: "4" },
                        ].map((btn) => (
                          <button
                            key={btn.value}
                            className={`filter-option ${
                              gradeFilter === btn.value ? "active" : ""
                            }`}
                            onClick={() => {
                              setGradeFilter(btn.value);
                              setShowGradeFilter(false);
                            }}
                          >
                            {btn.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </th>

              <th>
                <div className="filter-header">
                  <span>개봉일</span>
                  <button
                    className="sort-btn"
                    onClick={() =>
                      setSortOrder(sortOrder === "desc" ? "asc" : "desc")
                    }
                  >
                    {sortOrder === "desc" ? "▼" : "▲"}
                  </button>
                </div>
              </th>

              <th>영화 제목</th>
              {selectedStatus === "ALL" && <th>상태</th>}
            </tr>
          </thead>

          <tbody>
            {movieList.length === 0 ? (
              <tr>
                <td
                  colSpan={selectedStatus === "ALL" ? 4 : 3}
                  style={{ textAlign: "center", padding: "20px" }}
                >
                  해당 조건의 영화가 없습니다.
                </td>
              </tr>
            ) : (
              movieList.map((movie) => (
                <tr key={movie.movieNo} onClick={() => setSelectedMovie(movie)}>
                  <td>{getGradeLabel(movie.movieGrade)}</td>
                  <td>{movie.movieRelease}</td>
                  <td>{movie.movieTitle}</td>
                  {selectedStatus === "ALL" && (
                    <td>
                      <span
                        className={`status-badge status-${movie.movieStatus}`}
                      >
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

      {pi && (
        <PageNavigation pi={pi} reqPage={reqPage} setReqPage={setReqPage} />
      )}

      {selectedMovie && (
        <AdminMovieModal
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
          onStatusChange={handleStatusChange}
        />
      )}
    </div>
  );
};

export default AdminList;
