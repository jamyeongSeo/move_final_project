package kr.co.iei.cs.faq.model.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface FAQDao {

	int selectAllFaqCount();

	int selectSearchedFaqCount(String faqQuestion);

	List selectAllFaqList(Map<String, Object> countMap);

	List selectSearchedFaqList(Map<String, Object> countMap);

}
