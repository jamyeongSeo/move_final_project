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

	@GetMapping(value="/movie")
	public ResponseEntity<Map> adminMovieList(@RequestParam int reqPage){
		Map map = adminService.adminMovieList(reqPage);
		return ResponseEntity.ok(map);
	}
	
	@PostMapping(value="/image")
	public ResponseEntity<String> editorImageUpload(@ModelAttribute MultipartFile image){
		String savepath = root + "/editor/";
		String filepath = fileUtil.upload(savepath, image);
		return ResponseEntity.ok(filepath);			
	}
	
	@PostMapping()
	public ResponseEntity<Integer> insertMoive(@ModelAttribute MovieDTO movie,
												@ModelAttribute MultipartFile movieThumb){
		List<MovieDTO> movieInfoList = new ArrayList<MovieDTO>();
		String savepath = root +"/thumb/";
		String filepath = fileUtil.upload(savepath, movieThumb);
		String filename = movieThumb.getOriginalFilename();
		
			
		}
		
	
	
	
	
	
}