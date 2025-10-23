package kr.co.iei.admin.model.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import kr.co.iei.movie.model.dto.MovieDTO;
import kr.co.iei.admin.model.dto.ScheduleDTO;
import kr.co.iei.utils.PageInfo;

@Mapper
public interface AdminDao {

	int totalSearchTitle();

	int totalCount();

	int insertMovieInfo(MovieDTO movie);

	List<MovieDTO> adminMovieList(PageInfo pi);

//	List<MovieDTO> searchMovieTitle(int reqPage);

	int getMovieNo();


	int insertSchedule(ScheduleDTO schedule);

	MovieDTO selectOneMovie(int movieNo);

	int updateMovieStatus(int movieNo, int movieStatus);

	List<MovieDTO> getMovieTitle(PageInfo pi);



}
