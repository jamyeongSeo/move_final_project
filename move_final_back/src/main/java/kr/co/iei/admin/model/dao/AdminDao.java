package kr.co.iei.admin.model.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import kr.co.iei.movie.model.dto.MovieDTO;
import kr.co.iei.admin.model.dto.ScheduleDTO;
import kr.co.iei.utils.PageInfo;

@Mapper
public interface AdminDao {

    /* 스케줄 */
    List<ScheduleDTO> scheduleList();
    int insertSchedule(ScheduleDTO schedule);
    int updateSchedule(ScheduleDTO schedule);
    int deleteSchedule(int scheduleNo);

    /* 영화 */
    List<MovieDTO> getRunningMovies();

    int totalCount(Map<String, Object> param);
    List<MovieDTO> adminMovieList(Map<String, Object> param);

    int insertMovieInfo(MovieDTO movie);
    int getMovieNo();
    MovieDTO selectOneMovie(int movieNo);
    int updateMovieStatus(int movieNo, int movieStatus);
    List<MovieDTO> getMovieTitle(PageInfo pi);
}
