package kr.co.iei.cs.faq.model.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import kr.co.iei.cs.faq.model.dto.FAQDTO;

@Mapper
public interface FAQDao {

	int selectAllFaqCount();

	int selectSearchedFaqCount(String faqQuestion);

	List selectAllFaqList(Map<String, Object> countMap);

	List selectSearchedFaqList(Map<String, Object> countMap);

	int getFaqNo();

	int insertFAQ(FAQDTO faq);

	int deleteFAQ(int faqNo);

}
