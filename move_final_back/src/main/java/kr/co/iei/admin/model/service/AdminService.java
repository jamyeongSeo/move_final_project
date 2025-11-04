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

    // 신고된 회원 목록 조회
    public List<Map<String, Object>> getReportedMembers() {
        return adminDao.getReportedMembers();
    }

    //회원 댓글 제재 등록
    public int insertSuspend(Map<String, Object> suspendData) {
        // 1. 프론트에서 넘어오는 JSON key: MEMBER_NO / suspendDays / suspendReason
        int memberNo = ((Number) suspendData.get("MEMBER_NO")).intValue(); 
        int suspendDays = Integer.parseInt(suspendData.get("suspendDays").toString());
        String suspendReason = suspendData.get("suspendReason").toString();

        Map<String, Object> param = new HashMap<>();
        param.put("memberNo", memberNo);
        param.put("suspendDays", suspendDays);
        param.put("suspendReason", suspendReason);

        // 3. 중복 제재 방지 (이미 정지 상태면 insert 안함)
        int already = adminDao.checkAlreadySuspended(memberNo);
        if (already > 0) {
            return 0; // 이미 정지된 회원이면 처리 안 함
        }
        // 4. 정지 등록
        return adminDao.insertSuspend(param);
    }
    
//    // 특정 회원의 현재 유효한 정지 정보 조회 (새로 추가)
//    public Map<String, Object> getMemberRestrictionInfo(int memberNo) {
//        // 현재 유효한 정지 정보 (SUSPENDED_UNTIL이 SYSDATE보다 큰 것)를 가져옴
//        // 만약 여러 건이면 가장 최근에 적용된 정지를 가져오도록 DAO에서 처리
//        return adminDao.getValidSuspensionInfo(memberNo);
//    }
    
    /**********************영화***********************/
    

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

    /*단일 스케줄 조회*/
    public ScheduleDTO getScheduleDetail(int scheduleNo) {
        return adminDao.getScheduleDetail(scheduleNo);
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
