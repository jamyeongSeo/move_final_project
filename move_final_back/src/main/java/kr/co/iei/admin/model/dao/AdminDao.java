package kr.co.iei.admin.model.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import kr.co.iei.movie.model.dto.MovieDTO;
import kr.co.iei.admin.model.dto.ScheduleDTO;
import kr.co.iei.member.model.dto.MemberDTO;
import kr.co.iei.utils.PageInfo;

@Mapper
public interface AdminDao {
	
	/*------------- 스케줄 관리 ---------------*/
    /* 스케줄 목록*/
    List<ScheduleDTO> scheduleList();
    
    /*스케줄 등록*/
    int insertSchedule(ScheduleDTO schedule);
    
    //단일 스케줄 조회
    ScheduleDTO getScheduleDetail(int scheduleNo);

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

    /* 스케줄 중복 방지용 */
    List<Map<String, String>> getOccupiedTimes(Map<String, Object> param);
    int checkTimeConflict(ScheduleDTO schedule);
	List<ScheduleDTO> getWeeklySchedule(Map<String, Object> param);
	
	
	/*---------- 회원 관리 ----------*/
	int totalMemberCount(String memberId);
	List<MemberDTO> adminMemberList(Map<String, Object> param);

	// 정지회원 중복 방지
	int checkAlreadySuspended(int memberNo);

	// 정지 회원 등록
	int insertSuspend(Map<String, Object> suspendData);

	// 신고된 회원 목록
	List<Map<String, Object>> getReportedMembers();

//	// 유효한 정지 정보 조회
//	Map<String, Object> getValidSuspensionInfo(int memberNo);
	 

}
