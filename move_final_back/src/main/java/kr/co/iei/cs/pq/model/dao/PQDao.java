package kr.co.iei.cs.pq.model.dao;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import kr.co.iei.cs.pq.model.dto.PQDTO;
import kr.co.iei.cs.pq.model.dto.PQFileDTO;
import kr.co.iei.utils.PageInfo;


@Mapper
public interface PQDao {

	int totalCount(HashMap<String, Object> pqListSet);

	//int searchTotalCount(String pqTitle);

	List selectPQList(Map map);

	int getPqNo();

	int insertPQ(PQDTO pq);

	int insertPQFile(PQFileDTO pqFile);

	PQDTO selectOnePQ(int pqNo);

	List<PQFileDTO> selectPqFileList(int pqNo);

	int updatePQAnswer(PQDTO pq);

	//List searchPQList(Map map);

	//List selectMyPQList(HashMap<String, Object> pqListSet);

	//List searchMyPQList(HashMap<String, Object> pqListSet);
	
}
