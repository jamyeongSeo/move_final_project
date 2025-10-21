import { MenuItem, Select } from "@mui/material";


const AdminScheduleRegistFrm = (props) =>{
    const movieList = props.movieList;
    const movieTitle = props.movieTitle;
    const setMovieTitle = props.setMovieTitle;
    const scheduleTimeStart = props.scheduleTimeStart;
    const setScheduleTimeStart = props.setScheduleTimeStart;
    const scheduleTimeEnd = props.scheduleTimeEnd;
    const setScheduleTimeEnd = props.setScheduleTimeEnd;
    const scheduleOpen = props.scheduleOpen;
    const setScheduleOpen = props.setScheduleOpen;
    const scheduleClose = props.scheduleClose;
    const setScheuduleClose = props.setScheuduleClose;
    const screenNo = props.screenNo;
    const setScreenNo = props.setScreenNo;

    return(
    <section className="admin-schedule-registFrm-wrap">
    <table>
    <tbody>
    <tr>
        <th>
            <div className="admin-schedule-info">영화 선택</div>
        </th>
        <td>
        <Select
            value={movieTitle}
            onChange={(e) => setMovieTitle(e.target.value)}
            sx={{ width: "180px" }}
        >
            {movieList.map((movie) => (
            <MenuItem key={movie.movieNo} value={movie.movieTitle}>
                {movie.movieTitle}
            </MenuItem>
            ))}
        </Select>
        </td>
    </tr>
    <tr>
        <th>
            <div className="admin-schedule-info">상영 시작 시간</div>
        </th>
        <td>
            <input
            type="time"
            id="scheduleTimeStart"
            value={scheduleTimeStart}
            onChange={(e) => setScheduleTimeStart(e.target.value)}
            />
        </td>
    </tr>

    <tr>
        <th>
            <div className="admin-schedule-info">상영 종료 시간</div>
        </th>
        <td>
            <input
            type="time"
            id="scheduleTimeEnd"
            value={scheduleTimeEnd}
            onChange={(e) => setScheduleTimeEnd(e.target.value)}
            />
        </td>
    </tr>

    <tr>
        <th>
            <div className="admin-schedule-info">상영 시작일</div>
        </th>
    <td>
        <input
            type="date"
            id="scheduleOpen"
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
            id="scheduleClose"
            value={scheduleClose}
            onChange={(e) => setScheuduleClose(e.target.value)}
            />
        </td>
    </tr>

    <tr>
        <th>
            <div className="admin-schedule-info">관 선택</div>
        </th>
        <td>
        <Select
            value={screenNo}
            onChange={(e) => setScreenNo(e.target.value)}
            sx={{ width: "180px" }}
            >
            <MenuItem value={1}>2D</MenuItem>
            <MenuItem value={2}>3D</MenuItem>
            <MenuItem value={3}>4DX</MenuItem>
        </Select>
        </td>
    </tr>
    </tbody>
    </table>
    </section>
    )
}

export default AdminScheduleRegistFrm;