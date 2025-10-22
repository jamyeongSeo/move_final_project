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


	public Map PQList(int reqPage, String pqTitle, String memberId, int memberLevel, int category) {
		int numPerPage = 10;
		int pageNaviSize=5;	
		HashMap<String, Object> pqListSet = new HashMap<>();

		pqListSet.put("pqTitle", pqTitle);
		pqListSet.put("memberId", memberId);
		pqListSet.put("memberLevel", memberLevel);
		int totalCount = pqDao.totalCount(pqListSet);
		
		if (category != 0) { 
		    pqListSet.put("category", category);
		}
		
		PageInfo pi = piu.getPageInfo(reqPage, numPerPage, pageNaviSize, totalCount);
		
		int start = pi.getStart();
		int end = pi.getEnd();
		
		pqListSet.put("start", start);
		pqListSet.put("end", end);
		List pqList = pqDao.selectPQList(pqListSet);

		Map<String, Object> map = new HashMap<>();
		map.put("pqList", pqList);
		map.put("totalCount", totalCount);
		map.put("pi", pi);
		return map;
		/*
		 	}else{
			List myPqList = (pqTitle==null||pqTitle.isEmpty())?pqDao.selectMyPQList(pqListSet):pqDao.searchMyPQList(pqListSet);
			Map<String, Object> myMap = new HashMap<>();
			myMap.put("pqList", myPqList);
			myMap.put("totalCount", totalCount);
			myMap.put("pi", pi);
			return myMap;
		}
		*/
	}
}
