package kr.co.iei.admin.model.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import kr.co.iei.admin.model.dao.AdminDao;
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
	public Map adminMovieList(int reqPage, String movieTitle) {
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
	
	//영화 제목 검색
	public Map searchMovieTitle(int reqPage) {
		int numPerPAge = 15;
		int pageNaviSize = 5;
		int totalSearchTitle = adminDao.totalSearchTitle();
		PageInfo pi = pageInfoUtil.getPageInfo(reqPage, numPerPAge, pageNaviSize, totalSearchTitle);
		List<MovieDTO> searchMovieTitle = adminDao.searchMovieTitle(reqPage);
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("movieList", searchMovieTitle);
		map.put("pi", pi);
		return map;
	}

	public int insertMovieInfo(MovieDTO movie, MultipartFile movieThumbImg) {
			int movieNo = adminDao.getMovieNo();
			movie.setMovieNo(movieNo);
			int result = adminDao.insertMovieInfo(movie);
			return result;
	}
	

}
