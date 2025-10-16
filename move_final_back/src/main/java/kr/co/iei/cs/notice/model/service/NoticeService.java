package kr.co.iei.cs.notice.model.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import kr.co.iei.cs.notice.model.dao.NoticeDao;
import kr.co.iei.cs.notice.model.dto.NoticeDTO;
import kr.co.iei.cs.notice.model.dto.NoticeFileDTO;
import kr.co.iei.utils.PageInfo;
import kr.co.iei.utils.PageInfoUtils;
import kr.co.iei.utils.SearchPageInfo;
import kr.co.iei.utils.SearchPageInfoUtils;

@Service
public class NoticeService {
	@Autowired
	private NoticeDao noticeDao;
	@Autowired
	private PageInfoUtils pageInfoUtil;
	@Autowired
	private SearchPageInfoUtils searchPageInfoUtil;

	public Map selectNoticeList(int reqPage, String noticeTitle) {

		int numPerPage = 10; 
		int pageNaviSize = 5; 
		
		int totalCount = (noticeTitle==null||noticeTitle.isEmpty())
							?noticeDao.totalCount()
							:noticeDao.searchTotalCount(noticeTitle);
		
		PageInfo pi = pageInfoUtil.getPageInfo(reqPage, numPerPage, pageNaviSize, totalCount);
		SearchPageInfo spi = searchPageInfoUtil.getSearchPageInfo(reqPage, numPerPage, pageNaviSize, totalCount, noticeTitle);
		
		List noticeList = (noticeTitle==null||noticeTitle.isEmpty())
							?noticeDao.selectNoticeList(pi)
							:noticeDao.searchNoticeList(spi);
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("noticeList", noticeList);
		map.put("pi", pi);
		map.put("totalCount", totalCount);
		return map;
	}
	@Transactional
	public int insertNotice(NoticeDTO notice, List<NoticeFileDTO> noticeFileList) {
		int noticeNo = noticeDao.getNoticeNo();
		notice.setNoticeNo(noticeNo);
		int result = noticeDao.insertNotice(notice);
		for(NoticeFileDTO noticeFile : noticeFileList) {
			noticeFile.setNoticeNo(noticeNo);
			result += noticeDao.insertNoticeFile(noticeFile);
		}
		return result;
	}
	public NoticeDTO selectOneNotice(int noticeNo) {
		NoticeDTO notice = noticeDao.selectOneNotice(noticeNo);
		List<NoticeFileDTO> fileList = noticeDao.selectNoticeFileList(noticeNo);
		notice.setNoticeFileList(fileList);
		return notice;
	}

}
