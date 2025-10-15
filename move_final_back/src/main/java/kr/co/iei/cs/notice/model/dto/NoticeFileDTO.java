package kr.co.iei.cs.notice.model.dto;

import org.apache.ibatis.type.Alias;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Alias(value="noticeFile")
public class NoticeFileDTO {
	private int noticeFileNo;
	private int noticeNo;
	private String filename;
	private String filepath;
}
