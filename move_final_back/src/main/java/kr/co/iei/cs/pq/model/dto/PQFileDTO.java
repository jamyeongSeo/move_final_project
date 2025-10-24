package kr.co.iei.cs.pq.model.dto;

import org.apache.ibatis.type.Alias;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Alias(value="pqFile")
public class PQFileDTO {
	private int pqFileNo;
	private int pqNo;
	private String filename;
	private String filepath;
}
