package kr.co.iei.movie.model.dto;

import org.apache.ibatis.type.Alias;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Alias(value="movieComment")
public class MovieCommentDTO {
	private int movieCommentNo;
	private int movieNo;
	private int movieScore;
	private String commentContent;
	private int memberNo;
	private String commentDate;
	private int memberGender;
	private String memberId;
}
