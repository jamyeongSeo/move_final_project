package kr.co.iei.cs.notice.model.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.co.iei.cs.notice.model.dao.NoticeDao;
import kr.co.iei.utils.PageInfo;
import kr.co.iei.utils.PageInfoUtils;

@Service
public class NoticeService {
	@Autowired
	private NoticeDao noticeDao;
	@Autowired
	private PageInfoUtils pageInfoUtil;

	public Map selectNoticeList(int reqPage) {

		// 게시물 조회, 페이징 작업에 필요한 데이터를 모두 취합해서 되돌려 줌
		int numPerPage = 10; // 한 페이지당 게시물 수
		int pageNaviSize = 5; // 페이지 네비 길이
		int totalCount = noticeDao.totalCount();
		PageInfo pi = pageInfoUtil.getPageInfo(reqPage, numPerPage, pageNaviSize, totalCount);
		List noticeList = noticeDao.selectBoardList(pi);
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("noticeList", noticeList);
		map.put("pi", pi);
		map.put("totalCount", totalCount);
		return map;
	}

}
