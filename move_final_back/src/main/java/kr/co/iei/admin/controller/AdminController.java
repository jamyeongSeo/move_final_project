package kr.co.iei.admin.controller;

import java.io.File;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import kr.co.iei.admin.model.service.AdminService;
import kr.co.iei.movie.model.dto.MovieDTO;
import kr.co.iei.movie.model.dto.MovieFileDTO;
import kr.co.iei.utils.FileUtil;

@CrossOrigin("*")
@RestController
@RequestMapping(value ="/admin")
public class AdminController {
	@Autowired
	private AdminService adminService;
	@Autowired
	private FileUtil fileUtil;
	@Value("${file.root}")
	private String root;

	/*영화 목록*/
	@GetMapping(value="/movie")
	public ResponseEntity<Map> adminMovieList(@RequestParam int reqPage, @RequestParam String movieTitle){
		Map map = adminService.adminMovieList(reqPage, movieTitle);
		return ResponseEntity.ok(map);
	}
	
	
	
	
	@PostMapping
	public ResponseEntity<Integer> insertMoiveInfo(@ModelAttribute MovieDTO movie,
												@ModelAttribute MultipartFile movieThumbImg){		
			String savepath = root + "/thumb/";
			String filepath = fileUtil.upload(savepath, movieThumbImg);
			movie.setMovieThumb(filepath);
			int result = adminService.insertMovieInfo(movie, movieThumbImg);
			
			return ResponseEntity.ok(result);
			
		}

	
}