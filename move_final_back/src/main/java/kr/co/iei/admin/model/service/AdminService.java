package kr.co.iei.admin.model.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.co.iei.admin.model.dao.AdminDao;
import kr.co.iei.movie.model.dto.MovieDTO;
import kr.co.iei.utils.PageInfoUtils;
import kr.co.iei.utils.PageInfo;

@Service
public class AdminService {
	@Autowired
	private AdminDao adminDao;
	@Autowired
	private PageInfoUtils pageInfoUtil;

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

}
