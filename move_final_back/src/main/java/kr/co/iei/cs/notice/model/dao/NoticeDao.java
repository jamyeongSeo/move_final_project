package kr.co.iei.cs.notice.model.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import kr.co.iei.utils.PageInfo;

@Mapper
public interface NoticeDao {

	int totalCount();

	List selectBoardList(PageInfo pi);

}
