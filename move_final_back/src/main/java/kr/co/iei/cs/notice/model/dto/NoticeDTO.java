package kr.co.iei.cs.notice.model.dto;

import java.util.List;

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
	private String noticeDate;
	private List<NoticeFileDTO> noticeFileList;
}
