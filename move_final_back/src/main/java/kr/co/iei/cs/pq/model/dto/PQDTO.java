package kr.co.iei.cs.pq.model.dto;

import org.apache.ibatis.type.Alias;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Alias(value="pq")
public class PQDTO {
	private int pqNo;
	private String memberId;
	private String pqTitle;
	private String pqContent;
	private String pqAnswer;
	private String pqCategory;
	private String pqDate;
}
