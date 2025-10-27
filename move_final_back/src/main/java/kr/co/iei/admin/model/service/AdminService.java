package kr.co.iei.admin.model.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import kr.co.iei.admin.model.dao.AdminDao;
import kr.co.iei.admin.model.dto.ScheduleDTO;
import kr.co.iei.movie.model.dto.MovieDTO;
import kr.co.iei.utils.PageInfoUtils;
import kr.co.iei.utils.PageInfo;

@Service
public class AdminService {
    @Autowired
    private AdminDao adminDao;
    @Autowired
    private PageInfoUtils pageInfoUtil;

    // 영화 목록 (검색어 + 상태 필터)
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

    // (선택) 영화 제목 검색용 유틸이 필요하면 아래처럼 Map 기반으로 변경해서 사용
    public Map<String, Object> searchTitleList(String titleKeyword, int reqPage) {
        Map<String, Object> param = new HashMap<>();
        param.put("movieTitle", titleKeyword);
        param.put("movieStatus", null);

        int totalCount = adminDao.totalCount(param);
        // 페이징 처리 필요하면 PageInfoUtils 사용하여 PageInfo 생성 후 dao에 전달
        PageInfo pi = pageInfoUtil.getPageInfo(reqPage, 16, 5, totalCount);
        // 만약 DAO 쪽에 페이징을 반영한 별도 메서드가 있다면 그걸 호출
        List<MovieDTO> list = adminDao.getMovieTitle(pi);

        Map<String, Object> map = new HashMap<>();
        map.put("movieList", list);
        map.put("pi", pi);
        return map;
    }

    @Transactional
    public int insertMovieInfo(MovieDTO movie) {
        int movieNo = adminDao.getMovieNo();
        movie.setMovieNo(movieNo);
        int result = adminDao.insertMovieInfo(movie);
        return result;
    }

    public int insertMovieInfo(MovieDTO movie, MultipartFile movieThumbImg) {
        int movieNo = adminDao.getMovieNo();
        movie.setMovieNo(movieNo);
        int result = adminDao.insertMovieInfo(movie);
        return result;
    }

    public MovieDTO selectOneMovie(int movieNo) {
        return adminDao.selectOneMovie(movieNo);
    }

    public int updateMovieStatus(int movieNo, int movieStatus) {
        return adminDao.updateMovieStatus(movieNo, movieStatus);
    }

    public ScheduleDTO insertSchedule(ScheduleDTO schedule) {
        int result = adminDao.insertSchedule(schedule);
        if (result > 0) return schedule;
        return null;
    }

    public List<MovieDTO> getRunningMovies() {
        return adminDao.getRunningMovies();
    }

    public List<ScheduleDTO> scheduleList() {
        return adminDao.scheduleList();
    }

    public int updateSchedule(ScheduleDTO schedule) {
        return adminDao.updateSchedule(schedule);
    }

    public int deleteSchedule(int scheduleNo) {
        return adminDao.deleteSchedule(scheduleNo);
    }

}
