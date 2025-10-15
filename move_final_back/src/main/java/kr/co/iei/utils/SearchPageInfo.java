package kr.co.iei.utils;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class SearchPageInfo {
	private int start;
	private int end;
	private int pageNo;
	private int totalPage;
	private int pageNaviSize;
	private String noticeTitle;
}
