import { Select, MenuItem } from "@mui/material";

const AdminScheduleRegistFrm = (props) => {
  const {
    movieList,
    selectedMovie,
    setSelectedMovie,
    scheduleOpen,
    setScheduleOpen,
    scheduleClose,
    setScheduleClose,
    scheduleTimeStart,
    setScheduleTimeStart,
    scheduleTimeEnd,
    setScheduleTimeEnd,
    screenNo,
    setScreenNo,
  } = props;

  return (
    <section className="admin-schedule-registFrm-wrap">
      <table className="admin-schedule-table">
        <tbody>
      
          <tr>
            <th>
              <div className="admin-schedule-info">영화 선택</div>
            </th>
            <td>
              <Select
                value={selectedMovie ? selectedMovie.movieNo : ""}
                onChange={(e) => {
                  const movie = movieList.find(
                    (m) => m.movieNo === e.target.value
                  );
                  setSelectedMovie(movie);
                }}
                sx={{ width: "200px" }}
              >
                {movieList.map((movie) => (
                  <MenuItem key={movie.movieNo} value={movie.movieNo}>
                    {movie.movieTitle}
                  </MenuItem>
                ))}
              </Select>

              {selectedMovie && (
                <div className="movie-thumb-preview">
                  <img
                    src={`${import.meta.env.VITE_BACK_SERVER}/admin/movie/thumb/${selectedMovie.movieThumb}`}
                    alt={selectedMovie.movieTitle}
                    className="movie-thumb-img"
                  />
                </div>
              )}
            </td>
          </tr>

       
          <tr>
            <th>
              <div className="admin-schedule-info">상영 시작 시간</div>
            </th>
            <td>
              <select
                type="time"
                className="admin-schedule-input"
                value={scheduleTimeStart}
                onChange={(e) => setScheduleTimeStart(e.target.value)}
              >
              
                <option value=""></option>
                  {Array.from({ length: 12 * 6 }, (_, i) => {
                    const totalMinutes = (i + 1) * 10;
                    const hours = Math.floor(totalMinutes / 60);
                    const minutes = totalMinutes % 60;
                    const label = `${hours > 0 ? hours + "시 " : ""}`
                    const labelMinuts = `${minutes > 0 ? minutes +"분" : ""}`
                    return (
                      <option key={i} value={totalMinutes}>
                        {label}
                      </option>
                      // <option key={i} value={minutes}>
                      //   {labelMinutes}
                      // </option>
                    );
                  })}
                  </select>
            </td>
          </tr>

          <tr>
            <th>
              <div className="admin-schedule-info">상영 종료 시간</div>
            </th>
            <td>
              <select
                type="time"
                className="admin-schedule-input"
                value={scheduleTimeEnd}
                onChange={(e) => setScheduleTimeEnd(e.target.value)}>

                  <option value=""></option>
                  {Array.from({ length: 6 * 6 }, (_, i) => {
                    const totalMinutes = (i + 1) * 10;
                    const hours = Math.floor(totalMinutes / 60);
                    const minutes = totalMinutes % 60;
                    const label = `${hours > 0 ? hours + "시간 " : ""}${
                      minutes > 0 ? minutes + "분" : ""
                    }`;
                    return (
                      <option key={i} value={totalMinutes}>
                        {label}
                      </option>
                    );
                  })}
              </select>
            </td>
          </tr>
          <tr>
            <th>
              <div className="admin-schedule-info">상영 시작일</div>
            </th>
            <td>
              <input
                type="date"
                className="admin-schedule-input"
                value={scheduleOpen}
                onChange={(e) => setScheduleOpen(e.target.value)}
              />
            </td>
          </tr>
          <tr>
            <th>
              <div className="admin-schedule-info">상영 종료일</div>
            </th>
            <td>
              <input
                type="date"
                className="admin-schedule-input"
                value={scheduleClose}
                onChange={(e) => setScheduleClose(e.target.value)}
              />
            </td>
          </tr>

          <tr>
            <th>
              <div className="admin-schedule-info">관 선택</div>
            </th>
            <td>
              <Select
                value={screenNo || selectedMovie?.movieType || ""}
                onChange={(e) => setScreenNo(e.target.value)}
                sx={{ width: "200px" }}
                className="admin-schedule-select"
              >
                <MenuItem value="2D">2D</MenuItem>
                <MenuItem value="3D">3D</MenuItem>
                <MenuItem value="4DX">4DX</MenuItem>
              </Select>
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  );
};

export default AdminScheduleRegistFrm;
