package kr.co.iei.admin.model.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import kr.co.iei.admin.model.dao.AdminDao;
import kr.co.iei.admin.model.dto.ScheduleDTO;
import kr.co.iei.movie.model.dao.MovieDao;
import kr.co.iei.movie.model.dto.MovieDTO;
import kr.co.iei.utils.PageInfoUtils;
import kr.co.iei.utils.PageInfo;

@Service
public class AdminService {
	@Autowired
	private AdminDao adminDao;
	@Autowired
	private PageInfoUtils pageInfoUtil;
	
	
	//영화 목록
	public Map adminMovieList(int reqPage) {
		int numPerPage = 15;
		int pageNaviSize = 5;
		int totalCount = adminDao.totalCount();
		PageInfo pi = pageInfoUtil.getPageInfo(reqPage, numPerPage, pageNaviSize, totalCount);
	
		List<MovieDTO> adminMovieList= adminDao.adminMovieList(pi);
		Map<String, Object> map = new HashMap<String, Object>();
		
		map.put("movieList", adminMovieList);
		map.put("pi",pi);
		
		return map;
	}
	
	/*영화 제목 검색*/
	public Map searchTitleList(MovieDTO movieTitle, int reqPage) {
		int numPerPage = 16;
		int pageNaviSize = 5;
		int totalCount = adminDao.totalCount();
		PageInfo pi = pageInfoUtil.getPageInfo(reqPage, numPerPage, pageNaviSize, totalCount);
		List<MovieDTO> searchTitleList = adminDao.getMovieTitle(pi);
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("movieTitle", movieTitle);
		map.put("pi", pi);
		
		return map;
		
		
	}
	
	/*영화 등록*/
	@Transactional
	public int insertMovieInfo(MovieDTO movie) {
		int movieNo = adminDao.getMovieNo();		
		movie.setMovieNo(movieNo);
		int result = adminDao.insertMovieInfo(movie);
		
		return result;
	}

	
	//	//영화 제목 검색
//	public Map searchMovieTitle(int reqPage) {
//		int numPerPAge = 15;
//		int pageNaviSize = 5;
//		int totalSearchTitle = adminDao.totalSearchTitle();
//		PageInfo pi = pageInfoUtil.getPageInfo(reqPage, numPerPAge, pageNaviSize, totalSearchTitle);
//		List<MovieDTO> searchMovieTitle = adminDao.searchMovieTitle(reqPage);
//		Map<String, Object> map = new HashMap<String, Object>();
//		map.put("movieList", searchMovieTitle);
//		map.put("pi", pi);
//		return map;
//	}

	public int insertMovieInfo(MovieDTO movie, MultipartFile movieThumbImg) {
			int movieNo = adminDao.getMovieNo();
			movie.setMovieNo(movieNo);
			int result = adminDao.insertMovieInfo(movie);
			return result;
	}

	/*영화 정보 상세페이지*/
	public MovieDTO selectOneMovie(int movieNo) {
		MovieDTO movie = adminDao.selectOneMovie(movieNo);
		return movie;
	}
	
	/*영화 목록에서 상태 바꾸기*/
	public int updateMovieStatus(int movieNo, int movieStatus) {
		return adminDao.updateMovieStatus(movieNo, movieStatus);
	}
	
	//스케줄 등록
	public ScheduleDTO insertSchedule(ScheduleDTO schedule) {
        int result = adminDao.insertSchedule(schedule);
        if (result > 0) {
            return schedule;
        } else {
            return null;
        }
    }
	

	/*스케줄 등록 시 상영 중인 영화만 빼오기*/
	public List<MovieDTO> getRunningMovies() {
	    return adminDao.getRunningMovies(); 
	}

	/*스케줄 목록*/
	public List<ScheduleDTO> scheduleList() {
		return adminDao.scheduleList();
	}
	
	/*스케줄 정보 업뎃*/
	public int updateSchedule(ScheduleDTO schedule) {
		return adminDao.updateSchedule(schedule);
	
	}

	/*스케줄 정보 삭제*/
	public int deleteSchedule(int scheduleNo) {
		return adminDao.deleteSchedule(scheduleNo);
	}
	/*스케줄 목록*/
	
	

	
	
	//영화 정보 수정
//	@Transactional
//	public MovieDTO updateMovie(MovieDTO movie, MultipartFile movieThumb) {
//		MovieDTO m = adminDao.selectOneMovie(movie.getMovieNo());
//		int result = adminDao.updateMovie(movie);
//		
//		return null;
//	}
	

}
