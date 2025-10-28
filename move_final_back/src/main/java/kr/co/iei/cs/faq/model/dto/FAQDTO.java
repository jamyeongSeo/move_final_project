package kr.co.iei.cs.faq.model.dto;

import org.apache.ibatis.type.Alias;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Alias(value="faq")
public class FAQDTO {
	private int faqNo;
	private String faqQuestion;
	private String faqAnswer;
}
