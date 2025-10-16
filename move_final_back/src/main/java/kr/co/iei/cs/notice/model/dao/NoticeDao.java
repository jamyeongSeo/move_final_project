package kr.co.iei.cs.notice.model.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.web.multipart.MultipartFile;

import kr.co.iei.cs.notice.model.dto.NoticeDTO;
import kr.co.iei.cs.notice.model.dto.NoticeFileDTO;
import kr.co.iei.utils.PageInfo;
import kr.co.iei.utils.SearchPageInfo;

@Mapper
public interface NoticeDao {

	int totalCount();

	List selectNoticeList(PageInfo pi);

	int searchTotalCount(String noticeTitle);

	List searchNoticeList(SearchPageInfo spi);

	int insertNotice(NoticeDTO notice);

	int getNoticeNo();

	int insertNoticeFile(NoticeFileDTO noticeFile);

	NoticeDTO selectOneNotice(int noticeNo);

	List<NoticeFileDTO> selectNoticeFileList(int noticeNo);


}
