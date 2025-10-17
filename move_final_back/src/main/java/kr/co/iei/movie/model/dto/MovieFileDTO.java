package kr.co.iei.movie.model.dto;

import org.apache.ibatis.type.Alias;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Alias(value="movieFile")
public class MovieFileDTO {
	private int movieFileNo;
	private int movieNo;
	private String fileName;
	private String filePath;
}
