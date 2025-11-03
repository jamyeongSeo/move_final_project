package kr.co.iei.movie.model.dto;

import java.sql.Date;
import java.util.List;

import org.apache.ibatis.type.Alias;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Alias(value="movie")
public class MovieDTO {
	private int movieNo;
	private int movieType;
	private String movieTitle;
	private int movieStatus;
	private String movieContent;
	private String movieThumb;
	private int movieGenre;
	private int movieGrade;
	private int movieRuntime;
	private String movieDirector;
	private String movieActor;
	private Date movieRelease;
	private boolean like;
	private List likeCount;
	
	private int galleryCount; 
}
