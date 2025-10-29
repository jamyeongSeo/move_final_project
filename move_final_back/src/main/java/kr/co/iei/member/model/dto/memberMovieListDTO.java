package kr.co.iei.member.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class memberMovieListDTO {
	private int payNo;
	private String movieTitle;
	private int movieGrade;
	private String movieDate;
	private String movieTime;
	private String movieScreen;
	private String count;
	private String comment;
	private String movieThumb;
}
