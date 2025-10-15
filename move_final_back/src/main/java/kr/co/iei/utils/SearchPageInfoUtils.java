package kr.co.iei.utils;

import org.springframework.stereotype.Component;

@Component
public class SearchPageInfoUtils {
	public SearchPageInfo getSearchPageInfo(int reqPage, int numPerPage, int pageNaviSize, int totalCount, String noticeTitle) {
		int end = reqPage * numPerPage;
		int start = end - numPerPage + 1;
		int totalPage = (totalCount % numPerPage == 0 ? totalCount / numPerPage : totalCount / numPerPage +1);
		int pageNo = ((reqPage - 1) / pageNaviSize) * pageNaviSize + 1;
		SearchPageInfo spi = new SearchPageInfo(start, end, pageNo, totalPage, pageNaviSize, noticeTitle);
		return spi;
	}
}
