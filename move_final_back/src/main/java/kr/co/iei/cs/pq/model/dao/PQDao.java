package kr.co.iei.cs.pq.model.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import kr.co.iei.utils.PageInfo;


@Mapper
public interface PQDao {

	int totalCount();

	int searchTotalCount(int reqPage);

	List selectPQList(PageInfo pi);

	List searchPQList(PageInfo pi);
	
}
