package kr.co.iei.cs.notice.model.dto;

import org.apache.ibatis.type.Alias;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Alias(value="notice")
public class NoticeDTO {
	private int noticeNo;
	private String memberId;
	private String noticeTitle;
	private String noticeContent;
	private String noticeFilename;
	private String noticeFilepath;
	private String noticeDate;
}
