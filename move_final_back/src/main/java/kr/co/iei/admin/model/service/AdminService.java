package kr.co.iei.admin.model.service;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import kr.co.iei.admin.model.dao.AdminDao;
import kr.co.iei.admin.model.dto.ScheduleDTO;
import kr.co.iei.member.model.dto.MemberDTO;
import kr.co.iei.movie.model.dto.MovieDTO;
import kr.co.iei.utils.PageInfoUtils;
import kr.co.iei.utils.PageInfo;

@Service
public class AdminService {
    @Autowired
    private AdminDao adminDao;
    @Autowired
    private PageInfoUtils pageInfoUtil;
    
	/********************* 회원 관리 **********************/
	/*관리자 - 회원 리스트 및 검색한 회원 아이디 리스트*/
    public Map<String, Object> adminMemberList(int reqPage, String memberId) {
        int numPerPage = 10;
        int totalCount = adminDao.totalMemberCount(memberId);
        int start = (reqPage - 1) * numPerPage + 1;
        int end = reqPage * numPerPage;

        Map<String, Object> param = new HashMap<>();
        param.put("start", start);
        param.put("end", end);
        param.put("memberId", memberId);

        List<MemberDTO> memberList = adminDao.adminMemberList(param);

        int totalPage = (int) Math.ceil((double) totalCount / numPerPage);

        Map<String, Object> map = new HashMap<>();
        map.put("memberList", memberList);
        map.put("totalCount", totalCount);
        map.put("totalPage", totalPage);
        map.put("reqPage", reqPage);
        return map;
    }


    
    

    /* 영화 목록 */
    public Map<String, Object> adminMovieList(int reqPage, String movieTitle, Integer movieStatus) {
        Map<String, Object> param = new HashMap<>();
        param.put("movieTitle", movieTitle);
        param.put("movieStatus", movieStatus);

        int totalCount = adminDao.totalCount(param);
        List<MovieDTO> list = adminDao.adminMovieList(param);

        Map<String, Object> map = new HashMap<>();
        map.put("movieList", list);
        map.put("totalCount", totalCount);
        return map;
    }

    @Transactional
    public int insertMovieInfo(MovieDTO movie) {
        int movieNo = adminDao.getMovieNo();
        movie.setMovieNo(movieNo);
        return adminDao.insertMovieInfo(movie);
    }

    public MovieDTO selectOneMovie(int movieNo) {
        return adminDao.selectOneMovie(movieNo);
    }

    public int updateMovieStatus(int movieNo, int movieStatus) {
        return adminDao.updateMovieStatus(movieNo, movieStatus);
    }

    public boolean isTimeConflict(ScheduleDTO schedule) {
        int count = adminDao.checkTimeConflict(schedule);
        return count > 0;
    }

    @Transactional
    public ScheduleDTO insertSchedule(ScheduleDTO schedule) {
        if (isTimeConflict(schedule)) {
            System.out.println("상영 시간 중복 감지");
            return null;
        }

        int result = adminDao.insertSchedule(schedule);
        return result > 0 ? schedule : null;
    }



    public List<MovieDTO> getRunningMovies() {
        return adminDao.getRunningMovies();
    }

    /**************** 스케줄 ****************/
    /*스케줄 조회*/
    public List<ScheduleDTO> scheduleList() {
        return adminDao.scheduleList();
    }

    public int updateSchedule(ScheduleDTO schedule) {
        return adminDao.updateSchedule(schedule);
    }

    public int deleteSchedule(int scheduleNo) {
        return adminDao.deleteSchedule(scheduleNo);
    }

    /*등록된 스케줄 시간 조회 */
    public List<Map<String, String>> getOccupiedTimes(int screenNo, String scheduleOpen) {
        Map<String, Object> param = new HashMap<>();
        param.put("screenNo", screenNo);
        param.put("scheduleOpen", scheduleOpen);
        return adminDao.getOccupiedTimes(param);
    }
    /*등록된 스케줄 날짜 조회*/
	public List<ScheduleDTO> getWeeklySchedule(String startDate) {
		  Map<String, Object> param = new HashMap<>();
		    param.put("startDate", startDate);
		    return adminDao.getWeeklySchedule(param);
	}


	

}
