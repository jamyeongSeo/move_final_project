package kr.co.iei.admin.model.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import kr.co.iei.movie.model.dto.MovieDTO;
import kr.co.iei.admin.model.dto.ScheduleDTO;
import kr.co.iei.utils.PageInfo;

@Mapper
public interface AdminDao {
	

	/*스케줄*/
	//스케줄 목록
	List<ScheduleDTO> scheduleList();
	
	//스케줄 등록
	int insertSchedule(ScheduleDTO schedule);
	
	//스케줄 정보 수정
	int updateSchedule(ScheduleDTO schedule);
	//스케줄 삭제
	int deleteSchedule(int scheduleNo);

	
	
	/*영화*/
	//상영중인 영화 목록
	List<MovieDTO> getRunningMovies();
	
	//총 개수
	int totalCount();
	//영화 정보 등록
	int insertMovieInfo(MovieDTO movie);
	//영화 목록
	List<MovieDTO> adminMovieList(PageInfo pi);

	//영화 번호 받기
	int getMovieNo();


	//영화 상세정보
	MovieDTO selectOneMovie(int movieNo);
	//상영 상태 수정
	int updateMovieStatus(int movieNo, int movieStatus);
	//영화 제목 
	List<MovieDTO> getMovieTitle(PageInfo pi);

	




}
