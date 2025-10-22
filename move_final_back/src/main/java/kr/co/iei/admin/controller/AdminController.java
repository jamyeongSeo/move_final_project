package kr.co.iei.admin.controller;

import java.io.File;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
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
import kr.co.iei.admin.model.dto.ScheduleDTO;

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
	public ResponseEntity<Map> adminMovieList(@RequestParam int reqPage){
		Map map = adminService.adminMovieList(reqPage);
		return ResponseEntity.ok(map);
	}
	
	/*영화 제목 검색*/
//	@GetMapping(value="/movie/{movieTitle}")
//	public ResponseEntity<Map> searchTitleList(@RequestParam MovieDTO movieTitle, @RequestParam int reqPage){
//		MovieDTO m = adminService.searchTitleList(movieTitle);
//		return ResponseEntity.ok(m);
//	}
	
	/*리스트에서 영화 상태 변경*/
	@PatchMapping(value="/movie/{movieNo}")
	public ResponseEntity<Integer> updateMovieStatus(@PathVariable int movieNo,
													@RequestBody MovieDTO movie){
		int result = adminService.updateMovieStatus(movieNo, movie.getMovieStatus());
		return ResponseEntity.ok(result);
	}
	
	/*영화 등록*/
	@PostMapping(value="/movie")
	public ResponseEntity<Integer> insertMovieInfo(
	        @ModelAttribute MovieDTO movie,
	        @RequestParam("movieThumb") MultipartFile movieThumb) {		
	    try {
	        if (!movieThumb.isEmpty()) {
	            String savepath = root + "/thumb/";
	            String filepath = fileUtil.upload(savepath, movieThumb);
	            movie.setMovieThumb(filepath);
	        }
	        int result = adminService.insertMovieInfo(movie);
	        return ResponseEntity.ok(result);
	    } catch (Exception e) {
	        e.printStackTrace();
	        return ResponseEntity.status(500).build();
	    }
	}
	
	/*영화 정보 상세페이지*/
	@GetMapping(value="/{movieNo}")
	public ResponseEntity<MovieDTO> selectOneMovie(@PathVariable int movieNo){
		MovieDTO movie = adminService.selectOneMovie(movieNo);
		return ResponseEntity.ok(movie);
	}
	
	/*영화 정보 수정*/
//	@PatchMapping
//	public MovieDTO updateMovieInfo(@ModelAttribute MovieDTO movie,
//									@ModelAttribute MultipartFile movieThumb) {
//		if(movieThumb != null) {
//			String savepath = root+"/movie"
//		}
//	}
	
	

//	
//	@PatchMapping
//	public ResponseEntity<Integer> updateMovieInfo(@ModelAttribute MovieDTO movie,
//													@ModelAttribute MultipartFile movieThumb){
//		MovieDTO m = adminService.updateMovie(movie, movieThumb);
//		
//	}
//	
	/*스케줄 등록*/
	@PostMapping(value="/schedule")
	public ResponseEntity<ScheduleDTO> insertMovieSchedule(@RequestBody ScheduleDTO schedule) {
		ScheduleDTO s = adminService.insertSchedule(schedule);
		if(s != null) {
			return ResponseEntity.ok(s);
		}else {
			return ResponseEntity.status(404).build();
		}
	}
	
	
}