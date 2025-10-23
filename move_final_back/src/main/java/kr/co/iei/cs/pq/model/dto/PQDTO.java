package kr.co.iei.cs.pq.model.dto;

import java.util.List;

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
	private int pqCategory;
	private String pqDate;
	private List<PQFileDTO>pqFileList;
	private int[] delFileNo;
}
