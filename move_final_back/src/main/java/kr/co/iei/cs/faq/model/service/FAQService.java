package kr.co.iei.cs.faq.model.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kr.co.iei.cs.faq.model.dao.FAQDao;
import kr.co.iei.cs.faq.model.dto.FAQDTO;
import kr.co.iei.utils.PageInfo;
import kr.co.iei.utils.PageInfoUtils;

@Service
public class FAQService {
	@Autowired
	private FAQDao faqDao;
	@Autowired PageInfoUtils piu;

	public Map selectFaqList(int reqPage, String faqQuestion) {
		int numPerPage = 10;
		int pageNaviSize = 5;
		
		int totalCount = (faqQuestion==null && faqQuestion.isEmpty()) 
			?faqDao.selectAllFaqCount()
			:faqDao.selectSearchedFaqCount(faqQuestion);

		
		PageInfo pi = piu.getPageInfo(reqPage, numPerPage, pageNaviSize, pageNaviSize);
		
		int start = pi.getStart();
		int end = pi.getEnd();
		
		Map<String, Object> countMap = new HashMap<>();
		
		countMap.put("start", start);
		countMap.put("end", end);
		countMap.put("faqQuestion", faqQuestion);
		
		List faqList = (faqQuestion==null && faqQuestion.isEmpty())
			?faqDao.selectAllFaqList(countMap)
			:faqDao.selectSearchedFaqList(countMap);

		
		Map<String, Object> listMap = new HashMap<>();
		
		listMap.put("faqList", faqList);
		listMap.put("pi", pi);
		listMap.put("totalCount", totalCount);
		
		return listMap;
	}
	@Transactional
	public int insertFAQ(FAQDTO faq) {
		int faqNo = faqDao.getFaqNo();
		faq.setFaqNo(faqNo);
		int result =  faqDao.insertFAQ(faq);
		return result;
	}
	public int deleteFAQ(int faqNo) {
		int result = faqDao.deleteFAQ(faqNo);
		return result;
	}
}
