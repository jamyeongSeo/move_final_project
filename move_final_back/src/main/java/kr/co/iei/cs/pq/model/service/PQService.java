package kr.co.iei.cs.pq.model.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.co.iei.cs.pq.model.dao.PQDao;
import kr.co.iei.cs.pq.model.dto.PQDTO;
import kr.co.iei.utils.PageInfo;
import kr.co.iei.utils.PageInfoUtils;


@Service
public class PQService {
	@Autowired
	private PQDao pqDao;
	@Autowired
	private PageInfoUtils piu;


	public Map PQList(int reqPage, String pqTitle) {
		int numPerPage = 10; //한 페이지 당 게시물 수
		int pageNaviSize=5;	// 페이지 네비게이션 크기
		int totalCount = (pqTitle==null||pqTitle.isEmpty())//pqTitle = 검색창에 검색한 값
							?pqDao.totalCount()
							:pqDao.searchTotalCount(reqPage);
		
		PageInfo pi = piu.getPageInfo(reqPage, numPerPage, pageNaviSize, totalCount);//전체 게시물 정보

		
		List pqList = (pqTitle==null||pqTitle.isEmpty())?pqDao.selectPQList(pi):pqDao.searchPQList(pi);
		Map<String, Object> map = new HashMap<>();
		map.put("pqList", pqList);
		map.put("totalCount", totalCount);
		map.put("pi", pi);
		
		return map;
	}
}
